import React from 'react'
import './img.css'

const Img = ({ imgB }) => {

    
    return (
        <div>
            <img src= {imgB.image}
                alt=''
                className='imageStyle'
            />
        </div>
    )
}

export default Img