import { ADD_TO_ORDER, REMOVE_ORDER_ITEM } from './action';

export const addToOrder = ( items ) => {
    return (dispatch) => {
        dispatch({
            type: ADD_TO_ORDER,
            payload: items
        })
    }
}


export const removeItemOrder = index => {
    return dispatch => {
        dispatch({
            type: REMOVE_ORDER_ITEM,
            index
        })
    }
}