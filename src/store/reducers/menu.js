import { 
    LOAD_MENU_FAILED,
    LOAD_MENU_START, 
    LOAD_MENU_SUCCESS
} from './../actions/action';

const initialState = {
    data: null,
    isLoading: false,
    error: null
}


const menu = (state = initialState, action) => {
    switch(action.type){

        case LOAD_MENU_START:
            return {
                ...state,
                isLoading: true
            }

        case LOAD_MENU_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload
            }

        case LOAD_MENU_FAILED:
            return {
                ...state,
                isLoading: false,
                data: null,
                error: action.error,
            }

        default:
            return state;
    }
}

export default menu;