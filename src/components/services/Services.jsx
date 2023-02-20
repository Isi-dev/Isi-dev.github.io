import React from 'react'
import './services.css'
import { BiCheck } from 'react-icons/bi'

const Services = () => {
  return (
    <section id='services'>
     
      <h2>Services</h2>

      <div className="container services__container">
        <article className="service">
          <ul className='service__list'>
            <li>
              <BiCheck className='service__list-icon' />
              <h4>Web Development (Full Stack)</h4>
            </li>
            <li>
              <BiCheck className='service__list-icon' />
              <h4>App Development (Android)</h4>
            </li>
            <li>
              <BiCheck className='service__list-icon' />
              <h4>Graphics Design</h4>
            </li>
            <li>
              <BiCheck className='service__list-icon' />
              <h4>Video Production & Editing</h4>
            </li>
            <li>
              <BiCheck className='service__list-icon' />
              <h4>3D Animation (Blender)</h4>
            </li>
          </ul>
        </article>

      </div>
    </section>
  )
}

export default Services