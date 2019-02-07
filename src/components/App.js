/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Colors } from '../styles';
import withTracker from '../utils/withTracker';
import Construction from '../containers/Construction';
import Home from '../containers/Home';
import Header from '../containers/Header';
import Footer from '../containers/Footer';
import Hydrology from '../containers/Hydrology';
import Morphology from '../containers/Morphology';
// import Ecology from "../containers/Ecology";
import Team from '../containers/Team';
import Paper from '../containers/Paper';
import MetricDetail from '../containers/MetricDetail';
import KnownIssue from '../containers/KnownIssue';
import ReleaseNote from '../containers/ReleaseNote';
import TermCitation from '../containers/TermCitation';
import BugReport from '../containers/BugReport';
import Admin from '../containers/Admin';
import Login from '../containers/Login';
import SignUp from '../containers/SignUp';
import UnknownRoute from './shared/UnknownRoute';
import Profile from '../components/profile/ProfileLayout';
import UploadHydrograph from '../containers/UploadHydrograph';

import UserHOC from '../hoc/UserHOC';

// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

class App extends React.Component {
  render() {
    const muiTheme = getMuiTheme({
      palette: {},
      snackbar: { actionColor: Colors.orange },
    });

    return (
      <div style={{ minWidth: '1300px' }}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div style={{ backgroundColor: '#f5f6f7' }}>
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
                component={withTracker(Morphology)}
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
              <Route exact path="/login" component={withTracker(Login)} />
              <Route exact path="/signup" component={withTracker(SignUp)} />
              <Route exact path="/admin" component={withTracker(Admin)} />
              <Route
                exact
                path="/profile"
                component={withTracker(UserHOC(Profile))}
              />
              <Route
                exact
                path="/uploads/:id"
                component={withTracker(UploadHydrograph)}
              />
              <Route exact path="*" component={withTracker(UnknownRoute)} />
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
