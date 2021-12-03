import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    
    if (isValidNewPerson(newName))
      setPersons([...persons, { id: persons.length + 1, name: newName }]);
    else
      invalidPersonAlert(newName);
  };

  const invalidPersonAlert = (newPersonName) => 
    window.alert(`${newPersonName} is already added to phonebook`);

  const isValidNewPerson = (personName) =>
    !(persons.some(x => x.name === personName));

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons && persons.map((x) => <p key={x.id}>{x.name}</p>)}
    </div>
  );
};

export default App;