import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {text: 'If it hurts, do it more often', votes: 0},
    {text: 'Adding manpower to a late software project makes it later!', votes: 0},
    {text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
    {text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
    {text: 'Premature optimization is the root of all evil.', votes: 0},
    {text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
    {text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients', votes: 0}
  ]);
   
  const [selected, setSelected] = useState(0);
  const currentAnecdote = anecdotes[selected];

  const getMostVotedAnecdote = () => anecdotes.reduce((max, cur)=>(max.votes > cur.votes ? max:cur));

  const onVote = () => {
    let newAnecdote = {...currentAnecdote, votes: currentAnecdote.votes + 1};
    let newAnecdotes = [
      ...anecdotes.slice(0, selected), 
      newAnecdote, 
      ...anecdotes.slice(selected + 1)
    ];
    setAnecdotes(newAnecdotes);

    // The code below did not work as expected:
    // let newAnecdote = {...currentAnecdote, votes: currentAnecdote.votes + 1};
    // Object.assign(anecdotes[selected], newAnecdote);
    // setAnecdotes(anecdotes);
  }

  const onClick = () => setSelected(getRandomInt(0, anecdotes.length));  

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return (    
    <div>
      <h2>Anecdote of the day</h2>
      <p>{currentAnecdote.text}</p>
      <p>has {currentAnecdote.votes} votes</p>
      <Button text="vote" handleClick={onVote} />
      <Button text="next anecdote" handleClick={onClick} />
      <h2>Anecdote with most votes</h2>
      <p>{getMostVotedAnecdote().text}</p>
      <p>has {getMostVotedAnecdote().votes} votes</p>
    </div>
  )
}

export default App
