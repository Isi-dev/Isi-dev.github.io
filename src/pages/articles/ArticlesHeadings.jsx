import React from 'react'
import './articles.css'


const ArticlesHeadings = ({articleData}) => {
    const idi = '#' +  articleData.id;
  return (
    <div className='articleHeading'>
        <a href = {idi}>{articleData.title}</a>
    </div>
  )
}

export default ArticlesHeadings