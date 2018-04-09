import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import classification from './classification';
import gauge from './gauge';
import hydrology from './hydrology';
import member from './member';
import paper from './paper';
import fall from './fall';
import spring from './spring';
import summer from './summer';

const rootReducer = combineReducers({
  routing: routerReducer,
  classification,
  hydrology,
  gauge,
  member,
  paper,
  fall,
  spring,
  summer,
});

export default rootReducer;
