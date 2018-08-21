import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchMembers} from '../actions/member';

import Layout from '../components/team/Layout';

class Team extends React.Component {
  componentDidMount() {
    document.title = 'eFlows | Team';
    this.props.fetchMembers();
  }

  render() {
    return <Layout members={this.props.members} />;
  }
}

Team.propTypes = {
  members: PropTypes.array,
  fetchMembers: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    members: state.member.members,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMembers: () => dispatch(fetchMembers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);
