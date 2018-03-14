import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import classification from './classification';
import gauge from './gauge';
import shared from './shared';

const rootReducer = combineReducers({
  routing: routerReducer,
  classification,
  shared,
  gauge,
});

export default rootReducer;
