import React, {useState} from "react";

const PersonForm = ({ onSubmit }) => {
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState(""); 

  const handlePhoneNumberChange = (event) => setNewPhoneNumber(event.target.value);
  const handleNameChange = (event) => setNewName(event.target.value);

  const onPersonFormSubmit = (event) => {
      event.preventDefault();
      onSubmit({ name: newName, number: newPhoneNumber });
      resetFormFields();
  };

  const resetFormFields = () => {
    setNewName("");
    setNewPhoneNumber("");
  }

  return (
    <form onSubmit={onPersonFormSubmit}>
      <div>
        name: <input type="text" value={newName} onChange={handleNameChange} required />
      </div>
      <div>
        number: <input type="text" value={newPhoneNumber} onChange={handlePhoneNumberChange} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
