import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import classification from './classification';
import gauge from './gauge';
import hydrology from './hydrology';
import member from './member';
import paper from './paper';

const rootReducer = combineReducers({
  routing: routerReducer,
  classification,
  hydrology,
  gauge,
  member,
  paper,
});

export default rootReducer;
