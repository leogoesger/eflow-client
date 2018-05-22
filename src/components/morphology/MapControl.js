import React from 'react';
import Toggle from 'material-ui/Toggle';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';

import {Colors} from '../../styles';
import {morphologyRegions} from '../../constants/classification';

export default class MapControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hydroMap: true,
      sites: true,
      klamath: true,
      sacramento: true,
      southCoast: true,
      southCentralCoast: true,
      northCentralCoast: true,
      northCoast: true,
      southForkEel: true,
    };
  }

  handleToggle(property) {
    const status = this.state[property] ? 'none' : 'visible';
    let keys;
    if (property === 'hydroMap') {
      keys = ['class', 'sm-'];
    } else {
      keys = [property];
    }
    this.props.toggleLayer(keys, status);
    this.setState({[property]: !this.state[property]});
  }

  render() {
    return (
      <div style={styles.BLcontainer}>
        {Object.keys(morphologyRegions).map(key => {
          return (
            <Toggle
              key={key}
              label={morphologyRegions[key].displayName}
              labelStyle={styles.labelStyle}
              value={'empty'}
              onClick={() => this.handleToggle(key)}
              toggled={this.state[key]}
              thumbSwitchedStyle={
                morphologyRegions[key].colors
                  ? {
                      size: '1',
                      backgroundColor: morphologyRegions[key].colors[0],
                    }
                  : null
              }
              trackSwitchedStyle={
                morphologyRegions[key].colors
                  ? {
                      backgroundColor: morphologyRegions[key].colors[1],
                    }
                  : null
              }
            />
          );
        })}
        <Divider
          style={{marginTop: '4px', marginBottom: '4px', height: '2px'}}
        />
        <Toggle
          label={'Hydrology Map'}
          labelStyle={styles.labelStyle}
          value={'empty'}
          onClick={() => this.handleToggle('hydroMap')}
          toggled={this.state.hydroMap}
        />
        <Toggle
          label={'Geomorphology Sites'}
          labelStyle={styles.labelStyle}
          value={'empty'}
          onClick={() => this.handleToggle('sites')}
          toggled={this.state.sites}
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
    width: '170px',
    height: '226px',
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
