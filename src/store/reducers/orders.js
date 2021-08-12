import {
    ADD_TO_ORDER, CHANGE_INPUT_ITEM, CHANGE_QTY_ITEM, CLEAR_ITEM, CREATE_TRX_FAILED, CREATE_TRX_START, CREATE_TRX_SUCCESS, REMOVE_NOTE_ITEM, REMOVE_ORDER_ITEM, SHOW_INPUT_ITEM
} from './../actions/action';


const inititalState = {
    data: [],
    isLoadingSubmited: false,
    errorSubmited: null
}

const orders = (state = inititalState, action) => {
    let getItem = null;
    let copyAllData = null;
    let findIndex = null;

    switch(action.type){

        case ADD_TO_ORDER:
            copyAllData = [ ...state.data ];
            findIndex = copyAllData.findIndex(item => item.id === action.payload.id);

            if(findIndex !== -1) {
                getItem = copyAllData[findIndex];
                getItem['qty'] = getItem['qty'] + action.payload.qty;
                getItem['notes'] = action.payload.notes;
                copyAllData[findIndex] = getItem;
            }else {
                copyAllData = [ ...state.data , action.payload ];
            }

            return {
                ...state,
                data: copyAllData
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

        case CHANGE_QTY_ITEM:
            copyAllData = [ ...state.data ];
            getItem = copyAllData[action.index];
            getItem['qty'] = action.type_of === 'increase' ? getItem.qty += 1 : getItem.qty -= 1;
            copyAllData[action.index] = getItem
            return {
                ...state,
                data: copyAllData
            }

        case CREATE_TRX_START:
            return {
                ...state,
                isLoadingSubmited: true,
                errorSubmited: null
            }
        
        case CREATE_TRX_SUCCESS:
            return {
                ...state,
                isLoadingSubmited: false,
                data: [],
                errorSubmited: null
            }

        case CREATE_TRX_FAILED:
            return {
                ...state,
                isLoadingSubmited: false,
                errorSubmited: action.error
            }

        case CLEAR_ITEM:
            return {
                ...state,
                data: []
            }
        
        default:
            return state;
    }
}

export default orders;

