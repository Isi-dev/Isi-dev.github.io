import React from 'react'
import './jokes.css';

const Joke = ({ jokeData }) => {

    return (
        <div className="jokesStyle">
            <div className='jokeTitle'>
                <h2>{jokeData.title}</h2>
            </div>
            <div className='jokeBody'>
                {jokeData.body_1 !== "" && <h3>{jokeData.body_1}</h3>}
                {jokeData.body_2 !== "" && <h3>{jokeData.body_2}</h3>}
                {jokeData.body_3 !== "" && <h3>{jokeData.body_3}</h3>}
                {jokeData.body_4 !== "" && <h3>{jokeData.body_4}</h3>}
                {jokeData.body_5 !== "" && <h3>{jokeData.body_5}</h3>}
                {jokeData.body_6 !== "" && <h3>{jokeData.body_6}</h3>}
                {jokeData.body_7 !== "" && <h3>{jokeData.body_7}</h3>}
                {jokeData.body_8 !== "" && <h3>{jokeData.body_8}</h3>}
                {jokeData.body_9 !== "" && <h3>{jokeData.body_9}</h3>}
                {jokeData.body_10 !== "" && <h3>{jokeData.body_10}</h3>}
            </div>
        </div>
    )
}

export default Joke