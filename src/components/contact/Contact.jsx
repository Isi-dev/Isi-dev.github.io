import React from 'react'
import './contact.css'
import { MdOutlineEmail } from 'react-icons/md'
import { BsWhatsapp } from 'react-icons/bs'

const Contact = () => {
  
  return (
    <section id='contact'>
      <h2>Contact Me</h2>
      <div className="contact__options">
        <article className="contact__option">
          <MdOutlineEmail className='contact__option-icon' />
          <h3>Email</h3>
          <h4>isijomo@yahoo.com</h4>
          <a href="mailto:isijomo@yahoo.com" target="_blank">Send a message</a>
        </article>
        <article className="contact__option">
          <BsWhatsapp className='contact__option-icon' />
          <h3>WhatsApp</h3>
          <h4>+2348032917268</h4>
          <a href="https://wa.me/2348032917268" target="_blank">Send a message</a>
        </article>
      </div>


    </section>
  )
}

export default Contact