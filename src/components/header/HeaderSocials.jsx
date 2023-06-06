import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'
import {BsYoutube} from 'react-icons/bs'

const HeaderSocials = () => {
  return (
    <div className='header__socials'>
        <a href="https://www.linkedin.com/in/isimemen-omoifo-22081a14b/" rel="noreferrer"  target="_blank"><BsLinkedin/></a>
        <a href="https://github.com/Isi-dev" rel="noreferrer"  target="_blank"><FaGithub/></a>
        <a href="https://www.youtube.com/channel/UC2JuxDKaZAWamjW9hrmQjFA" rel="noreferrer"  target="_blank"><BsYoutube/></a>
        
    </div>
  )
}

export default HeaderSocials