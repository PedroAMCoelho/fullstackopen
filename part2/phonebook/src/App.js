import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonsDataTable from './components/PersonsDataTable';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then(response => setPersons(response));
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value.toLowerCase());

  const handlePhoneNumberChange = (event) => setNewPhoneNumber(event.target.value);

  const handleNameChange = (event) => setNewName(event.target.value);  

  const addPerson = (event) => {
    if (isExistingPerson(newName) && hasConfirmedNumberUpdate(newName)) {
      let person = persons.find(p => p.name === newName);
      let personToUpdate = { ...person, number: newPhoneNumber };
      personService.update(personToUpdate.id, personToUpdate).then((updatedPerson) => {
        let updatedPersonList = persons.map(p => p.id === updatedPerson.id ? updatedPerson : p);
        setPersons(updatedPersonList);
        setNewName("");
        setNewPhoneNumber("");
      });
    } else {
      let newPerson = { name: newName, number: newPhoneNumber };
      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewPhoneNumber("");
      });
    }
  };

  const hasConfirmedNumberUpdate = (newPersonName) => window.confirm(`${newPersonName} is already added to phonebook, replace the old number with a new one?`);

  const isExistingPerson = (personName) => persons.some(x => x.name === personName);

  const onDelete = (person) => {
    if(window.confirm(`Delete ${person.name} ?`)){
      personService
        .remove(person.id)
        .then(response => {
          setPersons(persons.filter(n => n.id !== person.id));
        });
    }
  } 

  return (
    <>
      <h2>Phonebook</h2>
      <Filter 
        title={"filter shown with"} 
        onChange={handleFilterChange} 
      />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhoneNumber={newPhoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
      <h2>Numbers</h2>
      <PersonsDataTable
        persons={persons}
        filter={filter}
        onDelete={onDelete}
      />
    </>
  );
};

export default App;
