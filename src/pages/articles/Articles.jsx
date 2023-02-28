import React from 'react'
import { HashLink as Link } from 'react-router-hash-link';
import { ArticlesData } from '../../assets/articlesData';
import Article from './Article';
import './articles.css'
import ArticlesHeadings from './ArticlesHeadings';

const Articles = () => {
  return (
    <>
      <div id='home' className="linkS">
        <Link to="/#about" ><h2>Home</h2></Link>
      </div>
      <div className="articlesH">
        {
          ArticlesData.map((u) => (
            <ArticlesHeadings key = {u.id} articleData = {u} />
          ))
        }
      </div>
      <div className="articles">
        {
          ArticlesData.map((u) => (
            <Article key={u.id} article={u} />
          ))
        }
      </div> 
      <a href="#home" className='scroll__up'>Scroll Up</a>
    </>
  )
}

export default Articles