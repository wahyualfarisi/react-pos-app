import { combineReducers } from 'redux';
import menuReducers from './menu';
import orderReducers from './orders';
import transactionReducers from './transaction';

const rootReducers = combineReducers({
    menu: menuReducers ,
    orders: orderReducers,
    transaction: transactionReducers
})

export default rootReducers;