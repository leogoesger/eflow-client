import React from 'react';
import PropTypes from 'prop-types';

export default class Layout extends React.Component {
  render() {
    return <div>{this.props.text}</div>;
  }
}

Layout.propTypes = {
  text: PropTypes.string,
};
