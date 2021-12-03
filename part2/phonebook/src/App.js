import React, { useState } from "react";
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonsDataTable from './components/PersonsDataTable';

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState(null);
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => setFilter(event.target.value.toLowerCase());

  const handlePhoneNumberChange = (event) => setNewPhoneNumber(event.target.value);

  const handleNameChange = (event) => setNewName(event.target.value);  

  const addPerson = (event) => {
    if (isValidNewPerson(newName))
      setPersons([
        ...persons,
        { id: persons.length + 1, name: newName, number: newPhoneNumber },
      ]);
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
