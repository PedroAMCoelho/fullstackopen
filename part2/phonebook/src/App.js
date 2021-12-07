import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonsDataTable from './components/PersonsDataTable';
import Notification from './components/Notification';
import NotificationTypeEnum from './enums/NotificationTypeEnum';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => personService.getAll().then(response => setPersons(response)), [])

  const handleFilterChange = (event) => setFilter(event.target.value.toLowerCase());

  const handlePersonSubmit = (newPerson) => {
    if (isExistingPerson(newPerson.name) && hasConfirmedNumberUpdate(newPerson.name)) {
      let person = persons.find(p => p.name === newPerson.name);
      let personToUpdate = { ...person, number: newPerson.phone };
      updatePerson(personToUpdate);
    } else {
      createPerson(newPerson);
    }
  };

  const createPerson = (newPerson) => {
    personService.create(newPerson).then((response) => {
      setPersons(persons.concat(response));
      showPersonNotification(NotificationTypeEnum.Success, `Added ${response.name}`);
    });
  }

  const updatePerson = (personToUpdate) => {
    personService
      .update(personToUpdate.id, personToUpdate)
      .then((updatedPerson) => {
        let updatedPersonList = persons.map(p => p.id === updatedPerson.id ? updatedPerson : p);
        setPersons(updatedPersonList);
        showPersonNotification(NotificationTypeEnum.Success, `Updated ${updatedPerson.name}`);
      })
      .catch(error => {
        setPersons(persons.filter(p => p.id !== personToUpdate.id));
        showPersonNotification(NotificationTypeEnum.Error, `Person '${personToUpdate.name}' was already removed from server`);
      });
  }

  const deletePerson = (id) => {
    personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(n => n.id !== id));
        });
  }

  const showPersonNotification = (type, message) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const hasConfirmedNumberUpdate = (newPersonName) => window.confirm(`${newPersonName} is already added to phonebook, replace the old number with a new one?`);

  const isExistingPerson = (personName) => persons.some(x => x.name === personName);

  const onDelete = (person) => {
    if(window.confirm(`Delete ${person.name} ?`)){
      deletePerson(person.id);
    }
  } 

  return (
    <>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter 
        title={"filter shown with"} 
        onChange={handleFilterChange} 
      />
      <h2>Add a new</h2>
      <PersonForm onSubmit={handlePersonSubmit} />
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
