import React from 'react';
import { Toggle, Checkbox } from 'material-ui';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';
import Divider from 'material-ui/Divider';
import { Tooltip } from 'react-tippy';
import { geoClasses } from '../../constants/geoClasses';
import Expand from 'material-ui/svg-icons/image/navigate-next';
import Collaps from 'material-ui/svg-icons/image/navigate-before';

import { Colors } from '../../styles';

const regions = [
  {
    name: 'SFE',
    display: 'South Fork Eel',
    colors: ['#fdd835', '#ffee58'],
  },
  {
    name: 'SAC',
    display: 'Sacramento',
    colors: ['#ff6f00', '#ffcc80'],
  },
  // {
  //   name: 'WS',
  //   display: 'Sacramento WS',
  //   colors: ['#ff6f00', '#ffcc80'],
  // },
  // {
  //   name: 'PGR',
  //   display: 'Sacramento PGR',
  //   colors: ['#087f23', '#a5d6a7'],
  // },
  // {
  //   name: 'RGW',
  //   display: 'Sacramento RGW',
  //   colors: ['#7E57C2', '#e1bee7'],
  // },
];

export default class MapControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: false,
      satellite: false,
      SFE: true,
      SAC: true,
      WS: true,
      PGR: true,
      RGW: true,
      region: true,
      expanded: { SFE: false, SAC: false },
    };
  }

  handleToggle(property) {
    const status = this.state[property] ? 'none' : 'visible';
    this.props.toggleLayer(property, status);
    this.setState({ [property]: !this.state[property] });
  }

  renderClass(region, indx) {
    const { checkedClasses, handleCheckedBox } = this.props;
    return (
      <div
        key={indx}
        style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}
      >
        {this.state[region] && this.state.expanded[region] ? (
          geoClasses
            .filter(c => c.name.includes(region))
            .map((cls, indx) => {
              return (
                <Tooltip
                  key={indx}
                  title={cls.description}
                  position={'top'}
                  arrow={true}
                >
                  <Checkbox
                    checked={
                      checkedClasses[region][Number(cls.name.split('-')[1])]
                    }
                    onClick={() => {
                      handleCheckedBox(region, Number(cls.name.split('-')[1]));
                    }}
                    iconStyle={{
                      width: '20px',
                      marginRight: '0px',
                      fill: cls.fillColor,
                    }}
                  />
                </Tooltip>
              );
            })
        ) : (
          <div style={{ height: '24px' }} />
        )}
      </div>
    );
  }

  renderClassControls() {
    //const { checkedClasses, handleCheckedBox } = this.props;
    return (
      <div style={styles.TLcontainer}>
        {regions.map((region, indx) => {
          return this.renderClass(region.name, indx);
        })}
      </div>
    );
  }

  renderExtendedController() {
    return (
      <div style={{ position: 'absolute', bottom: '50px', left: '205px' }}>
        {Object.keys(this.state.expanded).map((region, indx) => {
          return (
            <React.Fragment key={indx}>
              {this.state[region] ? (
                <div key={indx}>
                  {!this.state.expanded[region] ? (
                    <Expand
                      onClick={() => this.handleExpandController(region)}
                      style={{ color: 'rgb(189,189,189)', marginBottom: '5px' }}
                    />
                  ) : (
                    <Collaps
                      onClick={() => this.handleExpandController(region)}
                      style={{ color: 'rgb(189,189,189)', marginBottom: '5px' }}
                    />
                  )}
                </div>
              ) : (
                <div key={indx} style={{ height: '32px' }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  handleExpandController(region) {
    const tmpExpanded = cloneDeep(this.state.expanded);
    tmpExpanded[region] = !this.state.expanded[region];
    this.setState({ expanded: tmpExpanded });
  }

  render() {
    return (
      <React.Fragment>
        {this.renderClassControls()}
        <div style={styles.BLcontainer}>
          {regions.map(geoClass => {
            return (
              <Toggle
                key={geoClass.name}
                label={geoClass.display}
                // label={
                //   <div
                //     style={{ display: 'flex', justifyContent: 'space-between' }}
                //   >
                //     <div style={{ fontSize: '15px', fontWeight: 700 }}>
                //       {geoClass.display}
                //     </div>
                //     {this.state[geoClass.name] &&
                //       this.renderExtendedController(geoClass.name)}
                //   </div>
                // }
                labelStyle={styles.labelStyle}
                value={'empty'}
                onClick={() => this.handleToggle(geoClass.name)}
                labelPosition="right"
                toggled={this.state[geoClass.name]}
                thumbSwitchedStyle={{ backgroundColor: geoClass.colors[0] }}
                trackSwitchedStyle={{ backgroundColor: geoClass.colors[1] }}
                style={{ marginBottom: '5px' }}
              />
            );
          })}
          <Divider
            style={{
              height: '2px',
            }}
          />
          {/* <Toggle
            label={'Hydrologic Classifications'}
            labelStyle={styles.labelStyle}
            value={'empty'}
            onClick={() => this.handleToggle('class')}
            toggled={this.state.class}
            style={{ marginTop: '5px' }}
          /> */}
          <Toggle
            label={'Satellite View'}
            labelStyle={styles.labelStyle}
            value={'empty'}
            onClick={() => this.handleToggle('satellite')}
            toggled={this.state.satellite}
            style={{ marginTop: '5px' }}
          />
          {this.renderExtendedController()}
        </div>
      </React.Fragment>
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
    // height: '124px',
    padding: '20px',
    boxShadow: '2px 2px 45px -5px rgba(110,110,110,1)',
    zIndex: '8',
  },

  TLcontainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    bottom: '86px',
    left: '243px',
    width: '87%',
    padding: '10px',
    // boxShadow: '2px 2px 45px -5px rgba(110,110,110,1)',
    // zIndex: '8',
  },
  labelStyle: {
    color: Colors.grey,
    fontSize: '12px',
  },
};

MapControl.propTypes = {
  toggleLayer: PropTypes.func,
  handleCheckedBox: PropTypes.func,
  checkedClasses: PropTypes.object,
};
