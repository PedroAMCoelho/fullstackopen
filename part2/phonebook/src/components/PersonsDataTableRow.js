import React from "react";

const PersonsDataTableRow = ({ person, onDelete }) => {
  return (
    <p>
      {person.name} {person.number} {<button onClick={() => onDelete(person)}>delete</button>}
    </p>
  );
};

export default PersonsDataTableRow;
