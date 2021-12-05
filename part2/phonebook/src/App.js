import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonsDataTable from './components/PersonsDataTable';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3002/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value.toLowerCase());

  const handlePhoneNumberChange = (event) => setNewPhoneNumber(event.target.value);

  const handleNameChange = (event) => setNewName(event.target.value);  

  const addPerson = (event) => {
    if (isValidNewPerson(newName))
      {
        let newPerson = { name: newName, number: newPhoneNumber };

        axios
        .post('http://localhost:3002/persons', newPerson)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewPhoneNumber('');
        });
      }
    else invalidPersonAlert(newName);
  };

  const invalidPersonAlert = (newPersonName) => window.alert(`${newPersonName} is already added to phonebook`);

  const isValidNewPerson = (personName) => !persons.some(x => x.name === personName);

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
      />
    </>
  );
};

export default App;
