import React from 'react';
import PropTypes from 'prop-types';

import Map from './Map';
import Hydrograph from './Hydrograph';

export default class Layout extends React.Component {
  render() {
    const DRHdata = [
      {date: '1', flow: 180},
      {date: '2', flow: 250},
      {date: '3', flow: 150},
      {date: '4', flow: 496},
      {date: '5', flow: 140},
      {date: '6', flow: 380},
      {date: '7', flow: 100},
      {date: '8', flow: 150},
    ];

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
          <Hydrograph DRHdata={DRHdata} />
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
};
