import React from 'react'
import { Link } from 'react-router-dom';
import './isiApp.css';

const IsiApp = ({ app }) => {
    return (
        <div>
            <Link to={app.link}>
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