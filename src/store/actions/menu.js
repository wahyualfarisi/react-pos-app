import {
    LOAD_MENU_FAILED,
    LOAD_MENU_START,
    LOAD_MENU_SUCCESS
 } from './action';
import { fetchMenu } from './../../api/menu';

export const getLoadStart = () => ({ type: LOAD_MENU_START });
export const getMenu = query => {
    return dispatch => {
        dispatch( getLoadStart() );
        fetchMenu(query)
        .then(res => {
            dispatch({ type: LOAD_MENU_SUCCESS, payload: res.data.data })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: LOAD_MENU_FAILED, error: err.message })
        })
    }
}