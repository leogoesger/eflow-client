import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Close from 'material-ui/svg-icons/navigation/close';

import {Colors} from '../../styles';

const MapLegend = props => {
  if (!props.region) {
    return null;
  }
  return (
    <div style={styles.BLcontainer}>
      <FlatButton
        label={props.region}
        style={{width: '100%'}}
        labelStyle={{fontSize: '12px', color: Colors.gold}}
        icon={<Close color={Colors.gold} />}
        onClick={() => props.removeSelection()}
      />
    </div>
  );
};

const styles = {
  BLcontainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: '40px',
    right: '20px',
    width: '240px',
    height: '36px',
    boxShadow: '2px 2px 45px -5px rgba(110,110,110,1)',
    zIndex: '8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

MapLegend.propTypes = {
  region: PropTypes.string,
  removeSelection: PropTypes.func,
};

export default MapLegend;
