/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Colors } from '../styles';
import Home from '../containers/Home';
import Hydrology from '../containers/Hydrology';
import Header from '../containers/Header';

class App extends React.Component {
  render() {
    const muiTheme = getMuiTheme({
      palette: {},
      snackbar: { actionColor: Colors.orange },
    });
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/hydrolgy" component={Hydrology} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

export default App;
