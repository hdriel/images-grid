import React from 'react';
import './style.css';
import { FaHeart } from 'react-icons/fa';


const ImageCard = props => {
    const { src, description, likes } = props;

    return (
        <div className='image-card'>
            <div className='image-url'>
                <img src={src} alt={src}/>
            </div>
            <div className='image-description'>
                <span>{description}</span>
            </div>
            <div className='image-likes'>
               <FaHeart /> <span> {likes} </span>
            </div>
        </div>
    )
}

export default ImageCard;