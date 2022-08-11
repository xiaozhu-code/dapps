import {combineReducers} from "redux";
import systemReducer from './reducers/systemReducer';
export default combineReducers({
  system:systemReducer
})