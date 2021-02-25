import React from 'react';
import './style.css';
import { FaThLarge, FaGripVertical } from 'react-icons/fa';
import * as imageActions from '../../store/actions/image';
import {useDispatch, useSelector} from 'react-redux';
import {DISPLAY_MODE} from "../../utils/consts";

const ImageConfiguration = props => {
    const dispatch = useDispatch();
    const isHaveImages = useSelector(state => state.image.imageList.length);
    const displayDirection = useSelector(state => state.image.displayDirection);
    const horizontalActiveClass = displayDirection === DISPLAY_MODE.HORIZONTAL ? 'active' : '';
    const verticalActiveClass = displayDirection === DISPLAY_MODE.VERTICAL ? 'active' : '';

    if(!isHaveImages){
        return null;
    }

    const changeDirHandler = (dir) => {
        if(dir !== displayDirection){
            dispatch(imageActions.changeDisplayMode(dir))
        }
    }

    return (
        <div className='image-configuration-container flex-row'>
            <div
                className={'config-icon display-mode-icon ' + horizontalActiveClass}
                onClick={() => changeDirHandler(DISPLAY_MODE.HORIZONTAL)}
            >
                <div className='icon center-it'> <FaThLarge size={15}/> </div>
            </div>

            <div
                className={'config-icon display-mode-icon ' + verticalActiveClass}
                onClick={() => changeDirHandler(DISPLAY_MODE.VERTICAL)}
            >
                <div className='icon center-it'> <FaGripVertical size={15}/> </div>
            </div>
        </div>
    )
}

export default ImageConfiguration;