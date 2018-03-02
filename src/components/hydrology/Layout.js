import React from 'react';
import Paper from 'material-ui/Paper';

import Map from './Map';

export default class Layout extends React.Component {
  render() {
    return (
      <div
        className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
        style={styles.container}
      >
        <Map />
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <Paper style={styles.graph}>{'DH'}</Paper>
          <Paper style={styles.graph}>{'Hello World'}</Paper>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    margin: '120px auto',
    minHeight: '800px',
  },
  graph: {
    height: '380px',
    width: '100%',
    marginLeft: '-10px',
    marginBottom: '20px',
  },
};
