import { combineReducers } from 'redux';
import swapiState from './swapiReducer';


const rootReducer = combineReducers({
    swapiState
});

export default rootReducer;
