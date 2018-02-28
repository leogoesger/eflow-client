/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Colors } from '../styles';
import Home from '../containers/Home';
import Header from '../containers/Header';
import Footer from '../containers/Footer';
import Hydrology from '../containers/Hydrology';
import Morphology from '../containers/Morphology';
import Function from '../containers/Function';
import Team from '../containers/Team';
import Paper from '../containers/Paper';

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
              <Route exact path="/hydrology" component={Hydrology} />
              <Route exact path="/morphology" component={Morphology} />
              <Route exact path="/function" component={Function} />
              <Route exact path="/team" component={Team} />
              <Route exact path="/paper" component={Paper} />
            </Switch>
            <Footer />
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
