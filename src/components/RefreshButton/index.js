import React from 'react';
import './style.css';

import * as imageActions from '../../store/actions/image';
import { useDispatch } from 'react-redux';

const RefreshButton = props => {
    const dispatch = useDispatch();
    const refreshHandler = () => dispatch(imageActions.fetchImages());

    return (
        <div className='refresh-btn-container center-it'>
            <div className='btn btn-refresh' onClick={refreshHandler}> Refresh </div>
        </div>
    )
}

export default RefreshButton;