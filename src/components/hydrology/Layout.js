import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import Map from './Map';

export default class Layout extends React.Component {
  render() {
    return (
      <div
        className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
        style={styles.container}
      >
        <Map
          className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
          classifictions={this.props.classifictions}
        />
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <Paper style={styles.graph}>{'DH'}</Paper>
          <Paper style={styles.graph}>{'Hello World'}</Paper>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  classifictions: PropTypes.array,
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    margin: '120px auto',
    height: '100%',
  },
  graph: {
    height: '348px',
    width: '100%',
    marginBottom: '20px',
  },
};
