import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import image from './reducers/image';

const rootReducer = combineReducers({ image });

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));