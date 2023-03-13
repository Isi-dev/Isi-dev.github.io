import React from 'react'
import './header.css'
import CTA from './CTA'
import ME from '../../assets/meS.png'
import HeaderSocials from './HeaderSocials'

const Header = () => {
  return (
    <header id="head">
      <div className="centerVertically">
        <div className=".container header__container">
          <h5>Hello I'm</h5>
          <h1>Isi Omoifo Jnr</h1>
          <h5 className="text-light">Engineer Artist Writer</h5>
        </div>
        <CTA />
        <HeaderSocials />

        <div className="me">
          <img src={ME} alt="me" />
        </div>

        <a href="#contact" className='scroll__down'>Scroll Down</a>

      </div>
    </header>
  )
}

export default Header