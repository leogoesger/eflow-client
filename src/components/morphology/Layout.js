import React from 'react';
import PropTypes from 'prop-types';

import Map from './Map';
const MapHoC = require('./MapHoC').MapHoC;

const NewMap = MapHoC(Map);

const Layout = props => {
  return (
    <div style={styles.container}>
      <NewMap geoSites={props.geoSites} />
      <div style={{zIndex: '2', minWidth: '650px', marginLeft: '30px'}} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '-60px auto 100px auto',
    height: '100%',
    width: '1300px',
  },
};

Layout.propTypes = {
  geoSites: PropTypes.array,
};

export default Layout;
