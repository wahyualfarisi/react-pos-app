import { combineReducers } from 'redux';
import menuReducers from './menu';

const rootReducers = combineReducers({
    menu: menuReducers 
})

export default rootReducers;