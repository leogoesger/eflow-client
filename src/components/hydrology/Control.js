import React from 'react';
import PropTypes from 'prop-types';
import { Divider, IconMenu, FlatButton, MenuItem, Toggle } from 'material-ui';
import FileDownload from 'material-ui/svg-icons/file/file-download';

import { classInfo } from '../../constants/classification.js';
import { Colors } from '../../styles';

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
    this.setState({ [layerId]: !this.state[layerId] }, () =>
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
          trackSwitchedStyle={{ backgroundColor: currentClass.colors[1] }}
          onClick={() => this.handleToggle(`class${index + 1}`)}
          toggled={this.state[`class${index + 1}`]}
        />
      );
    });
  }

  _renderDownloadBtns() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          margin: '4px auto',
        }}
      >
        <IconMenu
          iconButtonElement={
            <FlatButton
              className="tour-metricDetail-download"
              label="Download"
              labelStyle={{ fontSize: '12px', color: Colors.gold }}
              icon={<FileDownload color={Colors.gold} />}
            />
          }
        >
          <MenuItem
            primaryText="Geodatabase"
            onClick={() =>
              window.open(
                'https://s3-us-west-1.amazonaws.com/funcflow/resources/eflow_geodatabase.zip'
              )
            }
          />
        </IconMenu>
      </div>
    );
  }

  render() {
    return (
      <div style={styles.BLcontainer}>
        {this._renderClassControllers()}
        <Divider style={{ marginTop: '2px', height: '2px' }} />
        <Toggle
          style={{ marginTop: '5px' }}
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
        <Divider style={{ marginTop: '2px', height: '2px' }} />
        {this._renderDownloadBtns()}
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
    bottom: '60px',
    left: '20px',
    width: '140px',
    height: '304px',
    padding: '20px',
    boxShadow: '2px 2px 45px -5px rgba(110,110,110,1)',
    zIndex: '8',
  },
  labelStyle: {
    color: Colors.grey,
    fontSize: '12px',
  },
};
