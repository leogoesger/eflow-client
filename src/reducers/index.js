import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import classification from './classification';
import gauge from './gauge';

const rootReducer = combineReducers({
  routing: routerReducer,
  classification,
  gauge,
});

export default rootReducer;
