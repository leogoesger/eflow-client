import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import classification from './classification';

const rootReducer = combineReducers({
  routing: routerReducer,
  classification,
});

export default rootReducer;
