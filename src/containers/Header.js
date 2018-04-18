import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';

import Layout from '../components/shared/header/Layout';
import {fetchGauges} from '../actions/gauge';
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

  render() {
    return (
      <React.Fragment>
        <Layout />
        <Dialog
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={() => this.handleClose()}
        >
          {'Sorry, your browser is not supported!'}
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    gauges: state.gauge.gauges,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGauges: () => dispatch(fetchGauges()),
  };
};

Header.propTypes = {
  fetchGauges: PropTypes.func,
  gauges: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
