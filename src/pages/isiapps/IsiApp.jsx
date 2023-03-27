import React from 'react'
import { HashLink as Link } from 'react-router-hash-link';
import './isiApp.css';

const IsiApp = ({ app }) => {
    return (
        <div className='appLink'>
            <Link to={app.link} style={{color:'white'}}>
                <div>
                    <img src={app.image}
                        alt=''
                        className='imageStyle'
                    />
                </div>
                <div className="flexing">
                    <div className="genre">
                        {app.genre}
                    </div>
                    <div className="plat">
                        {app.platform}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default IsiApp