import { combineReducers } from 'redux';
import menuReducers from './menu';
import orderReducers from './orders';

const rootReducers = combineReducers({
    menu: menuReducers ,
    orders: orderReducers
})

export default rootReducers;