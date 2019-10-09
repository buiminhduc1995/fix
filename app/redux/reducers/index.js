import {combineReducers} from 'redux';
import authentication from './authentication';
const AppReducer = combineReducers({
  authentication,
});
export default AppReducer;
