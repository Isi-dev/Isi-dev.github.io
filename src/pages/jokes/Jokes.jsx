import React from 'react'
import { HashLink as Link } from 'react-router-hash-link';
import { JokesHere } from '../../assets/jokesData'
import Joke from './Joke';
import './jokes.css';

const Jokes = () => {
  return (
    <>
      
      <div id='home' className="linkS">
        <Link to="/#about" ><h2>Home</h2></Link>
      </div>
      <div className='laugh'><h1>It's time to laugh!</h1></div>
      <div className="jokes">
        {JokesHere.map((u) => (
          <Joke key = {u.id} jokeData = {u}/>
        ))}
      </div>
    </>
  )
}

export default Jokes