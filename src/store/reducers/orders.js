import {
    ADD_TO_ORDER, CHANGE_INPUT_ITEM, REMOVE_NOTE_ITEM, REMOVE_ORDER_ITEM, SHOW_INPUT_ITEM
} from './../actions/action';


const inititalState = {
    data: [],
    isLoadingSubmited: false,
    errorSubmited: null
}

const orders = (state = inititalState, action) => {
    let getItem = null;
    let copyAllData = null;

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

        case REMOVE_NOTE_ITEM:
            copyAllData = [ ...state.data ];
            getItem =  copyAllData[action.index];
            getItem['notes'] = '';
            copyAllData[action.index] = getItem;

            return {
                ...state,
                data: copyAllData
            }

        case SHOW_INPUT_ITEM:
            copyAllData = [ ...state.data ];
            getItem = copyAllData[action.index];
            getItem['showInput'] = !getItem.showInput;
            copyAllData[action.index] = getItem;
            return {
                ...state,
                data: copyAllData
            }

        case CHANGE_INPUT_ITEM:
            copyAllData = [ ...state.data ];
            getItem = copyAllData[action.index];
            getItem['notes'] = action.value;
            copyAllData[action.index] = getItem
            return {
                ...state,
                data: copyAllData
            }

        default:
            return state;
    }
}

export default orders;

