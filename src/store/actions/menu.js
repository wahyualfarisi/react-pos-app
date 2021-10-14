import {
    BACK_STATE,
    CLEAR_DATA_MENU,
    LOAD_MENU_FAILED,
    LOAD_MENU_START,
    LOAD_MENU_SUCCESS,
    LOAD_MORE,
    SEARCH_MENU,
    SET_ACTIVE_MENU
 } from './action';
import { fetchMenu } from './../../api/menu';

export const getLoadStart = () => ({ type: LOAD_MENU_START });

export const getMenu = query => {
    return dispatch => {
        dispatch( getLoadStart() );
        fetchMenu(query)
        .then(res => {
            dispatch({ type: LOAD_MENU_SUCCESS, payload: res.data.results })
        })
        .catch(err => {
            dispatch({ type: LOAD_MENU_FAILED, error: err.message })
        })
    }
}

export const clearMenu = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_DATA_MENU
        })
    }
}


export const setActiveMenu = (menuName) => {
    return dispatch => {
        dispatch({
            type: SET_ACTIVE_MENU,
            payload: menuName
        })
    }
}

export const loadMoreMenu = () => {
    return dispatch => {
        dispatch({
            type: LOAD_MORE
        })
    }
}

export const searchMenu = ( value ) => {
    return dispatch => {
        dispatch({
            type: SEARCH_MENU,
            payload: value
        })
    }
}

export const backState = () => {
    return dispatch => {
        dispatch({
            type: BACK_STATE
        })
    }
}