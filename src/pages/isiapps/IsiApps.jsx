import React from 'react'
import { HashLink as Link } from 'react-router-hash-link';
import IsiApp from './IsiApp'
import { MyApps } from '../../assets/myAppsData';
import './isiApp.css';

const IsiApps = () => {



  return (
    <>
      <div id='home' className="linkS">
        <Link to="/#about">Home</Link>
      </div>
      <div  className="imgS">
        {
          MyApps.map((a) =>(
            <IsiApp key={a.id} app={a} />
          ))
        }
      </div>
    </>
  )
}

export default IsiApps