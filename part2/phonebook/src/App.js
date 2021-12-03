import React, { useState } from "react";

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (isValidNewPerson(newName))
      setPersons([
        ...persons,
        { id: persons.length + 1, name: newName, number: newPhoneNumber },
      ]);
    else invalidPersonAlert(newName);
  };

  const invalidPersonAlert = (newPersonName) =>
    window.alert(`${newPersonName} is already added to phonebook`);

  const isValidNewPerson = (personName) =>
    !persons.some((x) => x.name === personName);

  const hasSearchedTerm = (person) => 
    filter ? person.name.toLowerCase().includes(filter) : true;    

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{" "}
          <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons &&
        persons.filter(hasSearchedTerm).map((x) => (
          <p key={x.id}>
            {x.name} {x.number}
          </p>
        ))}
    </div>
  );
};

export default App;
