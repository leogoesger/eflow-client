import React from 'react';
import Toggle from 'material-ui/Toggle';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';

import {Colors} from '../../styles';

export default class MapControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: true,
      SFE: true,
      WS: true,
      PGR: true,
      RGW: true,
      region: true,
    };
  }

  handleToggle(property) {
    const status = this.state[property] ? 'none' : 'visible';
    this.props.toggleLayer(property, status);
    this.setState({[property]: !this.state[property]});
  }

  render() {
    return (
      <div style={styles.BLcontainer}>
        {[
          {
            name: 'SFE',
            display: 'South Fork Eel',
            colors: ['#fdd835', '#ffee58'],
          },
          {
            name: 'WS',
            display: 'Sacramento WS',
            colors: ['#ff6f00', '#ffcc80'],
          },
          {
            name: 'PGR',
            display: 'Sacramento PGR',
            colors: ['#087f23', '#a5d6a7'],
          },
          {
            name: 'RGW',
            display: 'Sacramento RGW',
            colors: ['#7E57C2', '#e1bee7'],
          },
        ].map(geoClass => {
          return (
            <Toggle
              key={geoClass.name}
              label={geoClass.display}
              labelStyle={styles.labelStyle}
              value={'empty'}
              onClick={() => this.handleToggle(geoClass.name)}
              toggled={this.state[geoClass.name]}
              thumbSwitchedStyle={{backgroundColor: geoClass.colors[0]}}
              trackSwitchedStyle={{backgroundColor: geoClass.colors[1]}}
            />
          );
        })}
        <Divider
          style={{marginTop: '4px', marginBottom: '4px', height: '2px'}}
        />
        <Toggle
          label={'Hydrologic Classifications'}
          labelStyle={styles.labelStyle}
          value={'empty'}
          onClick={() => this.handleToggle('class')}
          toggled={this.state.class}
        />
      </div>
    );
  }
}

const styles = {
  BLcontainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: '40px',
    left: '20px',
    width: '190px',
    height: '124px',
    padding: '20px',
    boxShadow: '2px 2px 45px -5px rgba(110,110,110,1)',
    zIndex: '8',
  },
  labelStyle: {
    color: Colors.grey,
    fontSize: '12px',
  },
};

MapControl.propTypes = {
  toggleLayer: PropTypes.func,
};
