import { ADD_TO_ORDER } from './action';

export const addToOrder = ( items ) => {
    return (dispatch) => {
        dispatch({
            type: ADD_TO_ORDER,
            payload: items
        })
    }
}
