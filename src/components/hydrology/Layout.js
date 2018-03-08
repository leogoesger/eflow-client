import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import Map from './Map';

export default class Layout extends React.Component {
  render() {
    return (
      <div
        className="col-lg-11 col-md-11 col-sm-11 col-xs-12"
        style={styles.container}
      >
        <Map
          className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
          gauges={this.props.gauges}
        />
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <Paper style={styles.graph} />
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  gauges: PropTypes.array,
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
    height: '800px',
    width: '100%',
    marginBottom: '20px',
  },
};
