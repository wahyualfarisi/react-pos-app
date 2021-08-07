import { ADD_TO_ORDER, CHANGE_INPUT_ITEM, REMOVE_NOTE_ITEM, REMOVE_ORDER_ITEM, SHOW_INPUT_ITEM } from './action';

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

export const removeNoteItem = index => {
    return dispatch => {
        dispatch({
            type: REMOVE_NOTE_ITEM,
            index
        })
    }
}

export const showInputItem = index => {
    return dispatch => {
        dispatch({
            type: SHOW_INPUT_ITEM,
            index
        })
    }
}

export const changeInput = (index, value) => {
    return dispatch => {
        dispatch({
            type: CHANGE_INPUT_ITEM,
            index,
            value
        })
    }
}