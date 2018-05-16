import React from 'react';
import {Colors} from '../../../styles';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';

import Learn from './Learn';
import Connect from './Connect';
import Support from './Support';
import Group from './Group';
import Legal from './Legal';
import {getCurrentMonthYear, copyTextToClipboard} from '../../../utils/helpers';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  getText() {
    const text = `Belize Lane, Noelle Patterson, Leo Qiu, Samuel Sandoval, Sarah Yarnell,
    Robert Lusardi, Julie Zimmerman, Eric Stein, Larry Brown, Theodore
    Grantham, Jeanette Howard. Functional Flows Calculator ${
      this.props.version
    },
    University of California, Davis. Davis CA. ${getCurrentMonthYear()},
    https://eflows.ucdavis.edu (Date Accessed)`;
    copyTextToClipboard(text);
    this.setState({open: true});
  }

  _handleRequestClose() {
    this.setState({open: false});
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.citation} onClick={() => this.getText()}>
          {
            'Click to get the citation needed when using this website and database!'
          }
        </div>
        <div style={styles.general}>
          <Learn />
          <Connect />
          <Support />
          <Group />
        </div>
        <Legal />
        <Snackbar
          bodyStyle={{backgroundColor: Colors.blue}}
          open={this.state.open}
          message={'Citation copied to your clipboard!'}
          autoHideDuration={4000}
          onRequestClose={() => this._handleRequestClose()}
        />
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    color: '#fff',
    marginTop: '50px',
    minHeight: '220px',
    width: '100%',
    backgroundColor: Colors.offBlack,
  },
  general: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  citation: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    height: '30px',
    backgroundColor: Colors.gold,
    fontSize: '16px',
  },
};

Layout.propTypes = {
  version: PropTypes.string,
};
