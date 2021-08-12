import {
    LOAD_TRX_START,
    LOAD_TRX_SUCCESS,
    LOAD_TRX_FAILED,
    CREATE_TRX_SUCCESS
} from './../actions/action';

const initialState = {
    data: [],
    pagination: null,
    isLoading: false,
    error: null
}

const transaction = (state = initialState, action ) => {

    switch(action.type)
    {
        case CREATE_TRX_SUCCESS:
            return {
                ...state,
                data: [ action.payload, ...state.data]
            }   

        case LOAD_TRX_START:
            return {
                ...state,
                isLoading: true,
                error: null 
            }

        case LOAD_TRX_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload.data,
                pagination: action.payload
            }

        case LOAD_TRX_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        default:
            return state;
    }
}


export default transaction