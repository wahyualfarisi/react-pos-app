import {
    ADD_TO_ORDER
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

        default:
            return state;
    }
}

export default orders;

