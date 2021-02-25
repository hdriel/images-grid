import React, { useEffect } from 'react';
import ImageGallery from "../components/ImageGallery";
import ImageConfiguration from "../components/ImageConfiguration";
import * as imageActions from '../store/actions/image';
import { useDispatch } from 'react-redux';

const ImageScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(imageActions.fetchImages());
    }, [dispatch]);

    return (
        <div className='center-it flex-col'>
            <ImageConfiguration />
            <ImageGallery />
        </div>
    )
}

export default ImageScreen;