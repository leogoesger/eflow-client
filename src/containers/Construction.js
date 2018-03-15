import React from 'react';
import Paper from 'material-ui/Paper';

import Warning from 'material-ui/svg-icons/alert/warning';

class Construction extends React.Component {
  render() {
    return (
      <div
        className="col-lg-11 col-md-11 col-sm-11 col-xs-12"
        style={styles.container}
      >
        <div style={styles.banner} />
        <Paper style={styles.paperStyle}>
          <div>
            <div
              className="animated bounce"
              style={{display: 'flex', justifyContent: 'center'}}
            >
              <Warning style={styles.warningIcon} />
            </div>
            <div style={{color: '#616161'}}>
              {'This page is under construction!'}
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Construction;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    margin: '150px auto',
    height: '100%',
  },
  banner: {
    backgroundColor: '#424242',
    position: 'absolute',
    top: '0px',
    left: '0px',
    right: '0px',
    height: '220px',
    zIndex: '0',
  },
  paperStyle: {
    height: '600px',
    margin: '0 auto',
    width: '90%',
    top: '120px',
    zIndex: '2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningIcon: {color: '#616161', height: '60px', width: '60px'},
};
