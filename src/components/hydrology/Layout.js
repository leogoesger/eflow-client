import React from 'react';
import PropTypes from 'prop-types';

import Map from './Map';
import HydroTabs from './HydroTabs';

export default class Layout extends React.Component {
  render() {
    const DRHdata = [
      {date: '1', flow: 180},
      {date: '2', flow: 250},
      {date: '3', flow: 150},
      {date: '4', flow: 696},
      {date: '5', flow: 140},
      {date: '6', flow: 200},
      {date: '7', flow: 100},
      {date: '8', flow: 0},
    ];

    return (
      <div
        className="col-lg-11 col-md-11 col-sm-11 col-xs-12"
        style={styles.container}
      >
        <div style={styles.banner} />
        <Map
          className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
          gauges={this.props.gauges}
          classifications={this.props.classifications}
          fetchClassification={classId =>
            this.props.fetchClassification(classId)
          }
        />
        <div
          className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
          style={{zIndex: '2'}}
        >
          <HydroTabs
            DRHdata={DRHdata}
            classifications={this.props.classifications}
          />
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  gauges: PropTypes.array,
  classifications: PropTypes.object,
  fetchClassification: PropTypes.func,
};

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
};
