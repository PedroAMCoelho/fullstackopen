import React from 'react';

const Filter = ({title, onChange}) => {
    return <div> {title}: <input onChange={onChange} /> </div>
  }

  export default Filter;