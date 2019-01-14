import dishReducer from './DishReducer';
import { combineReducers } from 'redux';
import securityReducer from './SecurityReducer';

export default combineReducers({
    dishes: dishReducer,
    security: securityReducer,
});