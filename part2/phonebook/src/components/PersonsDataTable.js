import React from "react";
import PersonsDataTableRow from "./PersonsDataTableRow";

const PersonsDataTable = ({ persons, filter, onDelete }) => {
  const hasSearchedTerm = (person) =>
    filter ? person.name.toLowerCase().includes(filter) : true;

  return (
    persons &&
    persons
      .filter(hasSearchedTerm)
      .map((p) => <PersonsDataTableRow key={p.id} person={p} onDelete={onDelete} />)
  );
};

export default PersonsDataTable;
