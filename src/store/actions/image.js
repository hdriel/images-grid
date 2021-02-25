import {IMAGE_API, IMAGE_API_KEY, IMAGE_LIST_COUNT} from "../../utils/consts";
import Image from "../../models/image";
import _ from 'lodash';
import moment from "moment";

export const FETCH_IMAGES = 'FETCH_IMAGES';
export const CHANGE_DISPLAY_DIR = 'CHANGE_DISPLAY_DIR';
export const UPDATE_CACHE = 'UPDATE_CACHE';

const fetchImagesFromAPI = async (url = IMAGE_API, headers = { "x-api-key": IMAGE_API_KEY }) => {
    const imageListData = await fetch(url, {
        method: "get",
        ...({headers}),
    })
    .then(res => res.json())
    .catch(console.error);

    if(imageListData){
        return imageListData.map(({url: src, description, likes}) =>
            new Image(src, description, likes)
        );
    }

    return [];
};

const getRandomImages = (imageList, amount) => _.sampleSize(imageList, amount);

const cacheDataIsUpToDate = (imageListCache) => moment(imageListCache.timestamp).isAfter(Date.now());

export const fetchImages = () => {
    return async (dispatch, getState) => {
        const imageListCache = getState().image.imageListCache;
        const isCacheExpired = !cacheDataIsUpToDate(imageListCache);

        let fullImageList = imageListCache.imageList;

        if(isCacheExpired){
            fullImageList = await fetchImagesFromAPI()
            .catch(error => {
                console.error(`Failed to loaded images with error: ${error}`);
            });

            dispatch({
                type: UPDATE_CACHE,
                imageList: fullImageList || []
            })
        }

        const imageList = getRandomImages(fullImageList, IMAGE_LIST_COUNT);

        return dispatch({
            type: FETCH_IMAGES,
            imageList
        });
    }
}

export const changeDisplayMode = (dir) => {
    return {
        type: CHANGE_DISPLAY_DIR,
        dir
    }
}