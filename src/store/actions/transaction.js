import {
    CREATE_TRX_START,
    CREATE_TRX_SUCCESS,
    CREATE_TRX_FAILED
} from './action.js';
import {
    create
} from './../../api/transaction';

export const createTransaction = (data) => {
    return dispatch => {
        dispatch({
            type: CREATE_TRX_START
        })
        create(data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }
}