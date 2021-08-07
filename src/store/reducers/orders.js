import {
    ADD_TO_ORDER, REMOVE_ORDER_ITEM
} from './../actions/action';


const inititalState = {
    data: [],
    isLoadingSubmited: false,
    errorSubmited: null
}

const orders = (state = inititalState, action) => {
    switch(action.type){

        case ADD_TO_ORDER:
            return {
                ...state,
                data: [ ...state.data, action.payload ]
            }

        case REMOVE_ORDER_ITEM:
            return {
                ...state,
                data: state.data.filter((item, i) => i !== action.index)
            }

        default:
            return state;
    }
}

export default orders;

