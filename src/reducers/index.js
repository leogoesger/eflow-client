import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import classification from './classification';
import gauge from './gauge';
import hydrology from './hydrology';

const rootReducer = combineReducers({
  routing: routerReducer,
  classification,
  hydrology,
  gauge,
});

export default rootReducer;
