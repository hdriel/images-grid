import moment from 'moment';
import { CHANGE_DISPLAY_DIR, FETCH_IMAGES, UPDATE_CACHE} from '../actions/image';
import {IMAGE_CACHE_EXPIRED_ABOUT, DISPLAY_MODE} from "../../utils/consts";

const initialState = {
    imageList: [],
    displayDirection: DISPLAY_MODE.HORIZONTAL,
    imageListCache: {
        timestamp: 0,
        imageList: []
    }
}


export default function imageReducer(state = initialState, action){

    switch (action.type){
        case CHANGE_DISPLAY_DIR:
            return {
                ...state,
                displayDirection: action.dir,
            };

        case FETCH_IMAGES:
            return {
                ...state,
                imageList: action.imageList,
            };

        case UPDATE_CACHE:
            const [fullMatch, amount, unit] = /^(\d+) *?(s|m|h|d|sec|min|minutes|hours?|days?)$/i.exec(IMAGE_CACHE_EXPIRED_ABOUT) || [];
            if(!fullMatch){
                console.warn(`${IMAGE_CACHE_EXPIRED_ABOUT} Is not valid expired cache format, cache data is not will updating`);
                return state;
            }

            const timestamp = moment(Date.now()).add(+amount, unit).valueOf();

            const imageListCache = {
                timestamp,
                imageList: action.imageList
            }

            return {
                ...state,
                imageListCache,
            };

        default:
            return state;
    }

}
