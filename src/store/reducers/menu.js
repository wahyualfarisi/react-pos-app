import { 
    BACK_STATE,
    CLEAR_DATA_MENU,
    DETAIL_TRX_START,
    LOAD_MENU_FAILED,
    LOAD_MENU_START, 
    LOAD_MENU_SUCCESS,
    LOAD_MORE,
    SEARCH_MENU,
    SET_ACTIVE_MENU
} from './../actions/action';

const initialState = {
    data: [],
    page: null,
    isLoading: false,
    error: null,

    query: {
        category: [ 
            { name: 'All' }, 
            { name: 'Makanan' }, 
            { name: 'Minuman' } 
        ],
        isActiveCategory: 'All',
        searchText: null,
        page: 1
    }
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

        case BACK_STATE:
            return {
                ...state,
                data: [],
                page: null,
                query: {
                    ...state.query,
                    page: 1
                }
            }

        case SET_ACTIVE_MENU:
            return {
                ...state,
                query: {
                    ...state.query,
                    isActiveCategory: action.payload,
                    page: 1
                }
            }

        case LOAD_MORE:
            return {
                ...state,
                query: {
                    ...state.query,
                    page: state.query.page + 1
                }
            }

        case SEARCH_MENU:
            return {
                ...state,
                query: {
                    ...state.query,
                    searchText: action.payload,
                    page: 1,
                    isActiveCategory: 'All'
                }
            }


        case DETAIL_TRX_START:
            return {
                ...state,
                data: [],
                page: null,
                query: {
                    ...state.query,
                    page: 1
                }
            }

       

        default:
            return state;
    }
}

export default menu;