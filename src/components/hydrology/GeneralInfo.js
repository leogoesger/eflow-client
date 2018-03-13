import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

class GeneralInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Paper style={styles.graph}>{'Hello World'}</Paper>;
  }
}

GeneralInfo.propTypes = {};

const styles = {
  graph: {
    height: '750px',
    width: '100%',
    marginBottom: '20px',
    borderRadius: '0px',
  },
};

export default GeneralInfo;
