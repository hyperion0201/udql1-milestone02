import {createStore} from 'redux'
import reducers from './Reducers/combineReducer';

const store = createStore(reducers);
export default store;