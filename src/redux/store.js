import {createStore} from 'redux';
import combineReducers from './reducers';

let store = createStore(combineReducers);

export default store;