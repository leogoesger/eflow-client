import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

export default class Loader extends React.Component {
  render() {
    if (this.props.loading) {
      return (
        <div style={styles.container}>
          <div style={styles.content}>
            <div>
              <CircularProgress size={70} thickness={5} color={'#1e88e5'} />
              <br />
              <p style={styles.loadText}>Loading...</p>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const styles = {
  container: {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    backgroundColor: `rgba(238, 238, 238, 0.9)`,
  },
  content: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loadText: {paddingTop: '30px', color: '#ff8f00', fontSize: '16px'},
};

Loader.propTypes = {
  loading: PropTypes.bool,
};
