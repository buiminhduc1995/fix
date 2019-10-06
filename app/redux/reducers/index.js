import {combineReducers} from 'redux';
import authentication from './authentication';
import phone from './phone';
const AppReducer = combineReducers({
  authentication,
  phone,
});
export default AppReducer;
