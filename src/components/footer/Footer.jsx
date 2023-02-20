import React from 'react'
import './footer.css'
import {RiLinkedinFill} from 'react-icons/ri'
import {FaYoutubeSquare} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
      <a href="#" className='footer__logo'>IOJ</a>
      <ul className='permalinks'>
        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="footer__socials">
        <a href="https://www.linkedin.com/in/isimemen-omoifo-22081a14b/"><RiLinkedinFill /></a>
        <a href="https://www.youtube.com/channel/UC2JuxDKaZAWamjW9hrmQjFA"><FaYoutubeSquare /></a>
      </div>

      <div className="footer__copyright">
        <small>&copy; IOJ Works. All rights reserved</small>
      </div>
    </footer>
  )
}

export default Footer