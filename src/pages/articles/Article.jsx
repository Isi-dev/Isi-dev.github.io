import React from 'react'
import './articles.css'

const Article = ({ article }) => {
    return (
        <div id={article.id} className="articlesStyle">
            <div className='articleTitle'>
                <h2>{article.title}</h2>
                <h4>{article.date_s} - {article.date_e}</h4>
            </div>
            <div className='articleBody'>
                {article.body_1 !== "" && <h3>{article.body_1}</h3>}
                {article.body_2 !== "" && <h3>{article.body_2}</h3>}
                {article.body_3 !== "" && <h3>{article.body_3}</h3>}
                {article.body_4 !== "" && <h3>{article.body_4}</h3>}
                {article.body_5 !== "" && <h3>{article.body_5}</h3>}
                {article.body_6 !== "" && <h3>{article.body_6}</h3>}
                {article.body_7 !== "" && <h3>{article.body_7}</h3>}
                {article.body_8 !== "" && <h3>{article.body_8}</h3>}
                {article.body_9 !== "" && <h3>{article.body_9}</h3>}
                {article.body_10 !== "" && <h3>{article.body_10}</h3>}
            </div>
        </div>
    )
}

export default Article