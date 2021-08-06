import { 
    CLEAR_DATA_MENU,
    LOAD_MENU_FAILED,
    LOAD_MENU_START, 
    LOAD_MENU_SUCCESS
} from './../actions/action';

const initialState = {
    data: [],
    page: null,
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
                data: [ ...state.data, ...action.payload.data],
                page: {...action.payload}
            }

        case LOAD_MENU_FAILED:
            return {
                ...state,
                isLoading: false,
                data: null,
                error: action.error,
            }

        case CLEAR_DATA_MENU:
        return {
            ...state,
            data: []
        }

        default:
            return state;
    }
}

export default menu;