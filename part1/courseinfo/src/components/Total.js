import React from 'react';

const Total = ({total}) => {
    return (<b>total of {total.reduce((acc, curr) => acc + curr.exercises, 0)} exercises</b>)
  }

  export default Total;