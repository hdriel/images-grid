import React from 'react';
import './style.css';
import ImageCard from "../ImageCard";
import { useSelector } from 'react-redux';
import DelayedComponent from '../DelayedComponent';
import {DISPLAY_MODE} from "../../utils/consts";
import RefreshButton from "../RefreshButton";

const ImageGallery = props => {
    let direction = useSelector(state => state.image.displayDirection);
    const imageList = useSelector(state => state.image.imageList);

    let displayModeClass;
    let loadComponentInsideGallery;

    switch (direction){
        case DISPLAY_MODE.VERTICAL:
            displayModeClass = 'vertical-mode';
            loadComponentInsideGallery = true;
            break;

        case DISPLAY_MODE.HORIZONTAL:
            displayModeClass = 'horizontal-mode';
            loadComponentInsideGallery = false;
            break;

        default:
            loadComponentInsideGallery = false;
            displayModeClass = 'horizontal-mode';
            direction = DISPLAY_MODE.HORIZONTAL;
    }

    return (
        <div className='flex-col'>
            <div className={'image-gallery-container ' + displayModeClass}>
                { imageList.map((image, k) => (<ImageCard key={k} {...image} />)) }
                { !imageList.length && (
                    <DelayedComponent waitBeforeShow={1500}>
                        <div className='image-not-found-message'>No images to display yet, please try again later...</div>
                    </DelayedComponent>
                )}

                { loadComponentInsideGallery && <RefreshButton /> }
            </div>
            { !loadComponentInsideGallery && <RefreshButton /> }
        </div>

    )
}

export default ImageGallery;