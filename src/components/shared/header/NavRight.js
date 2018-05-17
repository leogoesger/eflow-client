import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import Person from 'material-ui/svg-icons/action/supervisor-account';
import Book from 'material-ui/svg-icons/av/library-books';

import {navigateTo} from '../../../utils/helpers';
import {Colors, Theme} from '../../../styles';

export default class NavRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menuOpen: false};
  }

  render() {
    return (
      <div style={styles.userDiv}>
        <FlatButton
          className="tour-paper"
          label="Papers"
          icon={<Book />}
          style={styles.headerButton}
          labelStyle={styles.headerWhiteButtonLabel}
          hoverColor={'white'}
          onClick={() => navigateTo('/papers')}
        />
        <FlatButton
          label="Team"
          className="tour-team"
          labelPosition="after"
          icon={<Person />}
          hoverColor={'white'}
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
    height: '36px',
    color: Colors.grey,
    borderRadius: Theme.buttonBorderRadius,
  },
  headerWhiteButtonLabel: {
    marginLeft: '2px',
    marginRight: '5px',
    textTransform: 'none',
    color: Colors.grey,
    fontSize: Theme.buttonLabelSmall,
    padding: '5px 0px',
  },
};

NavRight.propTypes = {};
