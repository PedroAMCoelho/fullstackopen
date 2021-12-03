import React from "react";

const PersonsDataTable = ({ persons, filter }) => {
  
  const hasSearchedTerm = (person) => filter ? person.name.toLowerCase().includes(filter) : true;

  return (
    persons &&
    persons.filter(hasSearchedTerm).map((x) => (
      <p key={x.id}>
        {x.name} {x.number}
      </p>
    ))
  );
};

export default PersonsDataTable;
