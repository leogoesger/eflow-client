import React from 'react';

export default class Legal extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <span style={{ paddingLeft: '40px' }}>{'Terms | Privacy'}</span>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    position: 'absolute',
    bottom: '0px',
    color: '#fff',
    width: '100%',
    height: '30px',
    backgroundColor: '#313C42',
  },
};
