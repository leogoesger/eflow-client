import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'material-ui/Card';

import Map from '../../containers/Map';
import Overview from './Overview';

const Layout = props => {
  return (
    <div style={styles.container}>
      <Map path="/morphology" />
      <Card
        style={{
          zIndex: '2',
          width: '650px',
          marginLeft: '30px',
          height: '800px',
          overflow: 'scroll',
        }}
      >
        <Overview geoRegions={props.geoRegions} />
      </Card>
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
  geoRegions: PropTypes.array,
};

export default Layout;
