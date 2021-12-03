import React from "react";

const PersonForm = ({ onSubmit, newName, handleNameChange, newPhoneNumber, handlePhoneNumberChange }) => {

    const onPersonFormSubmit = (event) => {
        event.preventDefault();
        onSubmit(event);
    };

  return (
    <form onSubmit={onPersonFormSubmit}>
      <div>
        name: <input type="text" value={newName ?? ""} onChange={handleNameChange} />
      </div>
      <div>
        number: <input type="text" value={newPhoneNumber ?? ""} onChange={handlePhoneNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
