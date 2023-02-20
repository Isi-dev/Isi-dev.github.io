import React from 'react'
import { HashLink as Link } from 'react-router-hash-link';
import Img from '../../components/img/Img';
import { BiroArt } from "../../assets/artData";
import './art.css';


const Art = () => {
  return (
    <div>
      <div id="home" className="linkS">
        <Link to="/#about" ><h2>Home</h2></Link>
      </div>
      <div className="imgS">
        {BiroArt.map((u) => (
          <Img key={u.id} imgB={u} />
        ))}
      </div>
    </div>
  )
}

export default Art