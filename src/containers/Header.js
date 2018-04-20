import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Layout from '../components/shared/header/Layout';
import {isBrowserNotSupported} from '../utils/helpers';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
    };
  }

  componentDidMount() {
    isBrowserNotSupported() ? this.setState({dialogOpen: true}) : null;
  }

  handleClose() {
    this.setState({dialogOpen: false});
  }

  getVersion() {
    if (this.props.releaseNotes) {
      return this.props.releaseNotes[0].version;
    }
    return null;
  }
  render() {
    return (
      <React.Fragment>
        <Layout releaseNoteVersion={this.getVersion()} />
        <Dialog
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={() => this.handleClose()}
        >
          <div>
            {
              'Sorry, your browser may not be fully supported! We recommend Chrome v51+, Firefox v51+ or Edge v12+.'
            }
          </div>

          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <FlatButton
              label="Continue"
              primary={true}
              onClick={() => this.handleClose()}
            />
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    releaseNotes: state.releaseNote.releaseNotes,
  };
};

Header.propTypes = {
  releaseNotes: PropTypes.array,
};

export default connect(mapStateToProps, null)(Header);
