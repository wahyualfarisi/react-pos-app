import {
    CREATE_TRX_START,
    CREATE_TRX_SUCCESS,
    CREATE_TRX_FAILED,
    LOAD_TRX_START,
    LOAD_TRX_SUCCESS,
    LOAD_TRX_FAILED,
    DETAIL_TRX_START,
    DETAIL_TRX_SUCCESS,
    DETAIL_TRX_FAILED
} from './action.js';
import {
    create,
    fetchTransaction,
    detailTransaction
} from './../../api/transaction';

export const createTransaction = (data, callback) => {
    return dispatch => {
        dispatch({
            type: CREATE_TRX_START
        })
        create(data)
            .then(res => {
                dispatch({
                    type: CREATE_TRX_SUCCESS,
                    payload: res.data.results
                })
                callback({
                    status: res.data.status
                })
                
            })
            .catch(err => {
                dispatch({
                    type: CREATE_TRX_FAILED
                })
            })
    }
}

export const getTransaction = ( query ) => {
    return dispatch => {
        dispatch({
            type: LOAD_TRX_START
        })
        fetchTransaction(query)
            .then(res => {
                dispatch({
                    type: LOAD_TRX_SUCCESS,
                    payload: res.data.results
                })
            })
            .catch(err => {
                dispatch({
                    type: LOAD_TRX_FAILED,
                    error: err.message
                })
            })
    }
}

export const getDetail = (id) => {
    return dispatch => {
        dispatch({
            type: DETAIL_TRX_START
        })
        detailTransaction(id)
        .then(res => {
            console.log(res);
            dispatch({
                type: DETAIL_TRX_SUCCESS
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: DETAIL_TRX_FAILED,
                error: err.message
            })
        })
    }
}