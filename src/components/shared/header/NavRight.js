import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import Person from 'material-ui/svg-icons/action/supervisor-account';
import Book from 'material-ui/svg-icons/av/library-books';

import { navigateTo } from '../../../utils/helpers';
import { Colors, Theme } from '../../../styles';

export default class NavRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
  }

  render() {
    return (
      <div style={styles.userDiv}>
        <FlatButton
          className="e2e-header-sign-up-btn"
          label="Paper"
          icon={<Book />}
          style={styles.headerButton}
          labelStyle={styles.headerWhiteButtonLabel}
          onClick={() => navigateTo('/paper')}
        />
        <FlatButton
          label="Team"
          className="e2e-header-login-btn"
          labelPosition="after"
          icon={<Person />}
          style={styles.headerButton}
          labelStyle={styles.headerWhiteButtonLabel}
          onClick={() => navigateTo('/team')}
        />
      </div>
    );
  }
}

const styles = {
  userDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
    lineHeight: '30px',
  },
  headerButton: {
    color: Colors.white,
    height: '36px',
    borderRadius: Theme.buttonBorderRadius,
  },
  headerWhiteButtonLabel: {
    marginLeft: '2px',
    marginRight: '5px',
    textTransform: 'none',
    fontSize: Theme.buttonLabelSmall,
    padding: '5px 0px',
    color: Colors.white,
  },
};

NavRight.propTypes = {};
