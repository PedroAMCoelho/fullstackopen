import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({course}) => {
    const {name, parts} = course;

  return (
    <>
      <Header course={name} />
      <Content parts={parts} />
      <Total total={parts} />
    </>
  )
}

export default Course;