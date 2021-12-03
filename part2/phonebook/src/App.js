import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas", number: "39-44-5323523" }]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState(null);

  const handlePhoneNumberChange = (event) => {
    console.log(event.target.value);
    setNewPhoneNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (isValidNewPerson(newName))
      setPersons([...persons, { id: persons.length + 1, name: newName, number: newPhoneNumber }]);
    else invalidPersonAlert(newName);
  };

  const invalidPersonAlert = (newPersonName) =>
    window.alert(`${newPersonName} is already added to phonebook`);

  const isValidNewPerson = (personName) =>
    !persons.some((x) => x.name === personName);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons && persons.map((x) => <p key={x.id}>{x.name} {x.number}</p>)}
    </div>
  );
};

export default App;
