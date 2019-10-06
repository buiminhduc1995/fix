import {createStore} from 'redux';
import AppReducer from '../reducers/index';
const store = createStore(AppReducer);
export default store;
