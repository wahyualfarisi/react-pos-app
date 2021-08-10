import {
    CREATE_TRX_START,
    CREATE_TRX_SUCCESS,
    CREATE_TRX_FAILED
} from './action.js';
import {
    create
} from './../../api/transaction';

export const createTransaction = (data, callback) => {
    return dispatch => {
        dispatch({
            type: CREATE_TRX_START
        })
        create(data)
            .then(res => {
                callback({
                    status: res.data.status
                })
                console.log(res);
                dispatch({
                    type: CREATE_TRX_SUCCESS
                })
            })
            .catch(err => {
                dispatch({
                    type: CREATE_TRX_FAILED
                })
            })
    }
}