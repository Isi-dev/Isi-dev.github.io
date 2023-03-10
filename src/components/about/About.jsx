import React from 'react'
import './about.css'
import { MdOutlineArticle } from 'react-icons/md'
import { GiGamepad } from 'react-icons/gi'
import { RiBook3Fill } from 'react-icons/ri'
import { FaLaughSquint } from 'react-icons/fa'
import { AiFillPicture } from 'react-icons/ai'
import { MdVideoLibrary } from 'react-icons/md'
import { HashLink as Link } from 'react-router-hash-link';


const About = () => {
  return (
    <section id='about'>
      <div className="centerVertically">
        <div className='padDown'>
          <h2>Portfolio</h2>
        </div>
        <div className="about__container">

          <div className="about__content">
            <div className="about__cards">
              <Link to="/isiapps#home">
                <div className='about__card'>
                  <GiGamepad className='about__icon' />
                  <h5>Apps</h5>
                </div>
              </Link>
              <Link to="/videos">
                <div className='about__card'>
                  <MdVideoLibrary className='about__icon' />
                  <h5>Videos</h5>
                </div>
              </Link>
              <Link to="/art#home">
                <div className='about__card'>
                  <AiFillPicture className='about__icon' />
                  <h5>Art</h5>
                </div>
              </Link>
              <Link to="/articles#home">
                <div className='about__card'>
                  <MdOutlineArticle className='about__icon' />
                  <h5>Writings</h5>
                </div>
              </Link>
              <Link to="/books">
                <div className='about__card'>
                  <RiBook3Fill className='about__icon' />
                  <h5>Books</h5>
                </div>
              </Link>
              <Link to="/jokes#home">
                <div className='about__card'>
                  <FaLaughSquint className='about__icon' />
                  <h5>Jokes</h5>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About