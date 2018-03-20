import React from 'react';
import PropTypes from 'prop-types';

export default class Member extends React.Component {
  render() {
    if (!this.props.member) {
      return null;
    }
    return <div>{JSON.stringify(this.props.member)}</div>;
  }
}

Member.propTypes = {
  member: PropTypes.object,
};
