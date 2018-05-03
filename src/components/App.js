/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {Colors} from '../styles';
import withTracker from '../utils/withTracker';
import Construction from '../containers/Construction';
import Home from '../containers/Home';
import Header from '../containers/Header';
import Footer from '../containers/Footer';
import Hydrology from '../containers/Hydrology';
// import Morphology from '../containers/Morphology';
// import Ecology from '../containers/Ecology';
import Team from '../containers/Team';
import Paper from '../containers/Paper';
import MetricDetail from '../containers/MetricDetail';
import KnownIssue from '../containers/KnownIssue';
import ReleaseNote from '../containers/ReleaseNote';
import TermCitation from '../containers/TermCitation';
import BugReport from '../containers/BugReport';

class App extends React.Component {
  render() {
    const muiTheme = getMuiTheme({
      palette: {},
      snackbar: {actionColor: Colors.orange},
    });

    return (
      <div style={{minWidth: '1300px'}}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div style={{backgroundColor: '#f5f6f7'}}>
            <Header />
            <Switch>
              <Route exact path="/" component={withTracker(Home)} />
              <Route
                exact
                path="/hydrology"
                component={withTracker(Hydrology)}
              />
              <Route
                exact
                path="/morphology"
                component={withTracker(Construction)}
              />
              <Route
                exact
                path="/ecology"
                component={withTracker(Construction)}
              />
              <Route exact path="/team" component={withTracker(Team)} />
              <Route exact path="/papers" component={withTracker(Paper)} />
              <Route
                exact
                path="/metricDetail"
                component={withTracker(MetricDetail)}
              />
              <Route exact path="/issues" component={withTracker(KnownIssue)} />
              <Route
                exact
                path="/releases"
                component={withTracker(ReleaseNote)}
              />
              <Route
                exact
                path="/terms"
                component={withTracker(TermCitation)}
              />
              <Route
                exact
                path="/bugReport"
                component={withTracker(BugReport)}
              />
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
  location: PropTypes.object,
};

export default App;
