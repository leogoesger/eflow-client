import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';

import {classInfo} from '../../constants/classification.js';
import {Colors} from '../../styles';

export default class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class1: true,
      class2: true,
      class3: true,
      class4: true,
      class5: true,
      class6: true,
      class7: true,
      class8: true,
      class9: true,
      cities: false,
      gauges: true,
    };
  }

  handleToggle(layerId) {
    this.setState({[layerId]: !this.state[layerId]}, () =>
      this.props.hideLayer(layerId, this.state[layerId])
    );
  }

  _renderClassControllers() {
    return Object.keys(classInfo).map((key, index) => {
      const currentClass = classInfo[key];
      return (
        <Toggle
          key={index}
          className={`tour-map-toggle-${index}`}
          label={classInfo[key].abbre}
          labelStyle={styles.labelStyle}
          value={'empty'}
          thumbSwitchedStyle={{
            size: '1',
            backgroundColor: currentClass.colors[0],
          }}
          trackSwitchedStyle={{backgroundColor: currentClass.colors[1]}}
          onClick={() => this.handleToggle(`class${index + 1}`)}
          toggled={this.state[`class${index + 1}`]}
        />
      );
    });
  }

  render() {
    return (
      <div style={styles.BLcontainer}>
        {this._renderClassControllers()}
        <Divider style={{marginTop: '2px', height: '2px'}} />
        <Toggle
          style={{marginTop: '5px'}}
          label={'Gauge'}
          labelStyle={styles.labelStyle}
          value={'empty'}
          onClick={() => this.handleToggle('gauges')}
          toggled={this.state.gauges}
        />
        <Toggle
          label={'City'}
          labelStyle={styles.labelStyle}
          value={'empty'}
          onClick={() => this.handleToggle('cities')}
          toggled={this.state.cities}
        />
      </div>
    );
  }
}

Control.propTypes = {
  classifications: PropTypes.array,
  hideLayer: PropTypes.func,
};

const styles = {
  BLcontainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: '40px',
    left: '20px',
    width: '140px',
    height: '270px',
    padding: '20px',
    boxShadow: '2px 2px 45px -5px rgba(110,110,110,1)',
    zIndex: '10',
  },
  labelStyle: {
    color: Colors.grey,
    fontSize: '12px',
  },
};
