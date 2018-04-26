import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class MetricGaugeDrawer extends React.Component {
  render() {
    return (
      <Drawer
        containerStyle={styles.container}
        docked={false}
        width={300}
        overlayStyle={styles.overlay}
        openSecondary={true}
        open={this.props.isDrawerOpen}
        onRequestChange={() => this.props.toggleMetricGaugeDrawer(false)}
      >
        <MenuItem onClick={() => this.props.toggleMetricGaugeDrawer(false)}>
          Menu Item
        </MenuItem>
        <MenuItem onClick={() => this.props.toggleMetricGaugeDrawer(false)}>
          Menu Item 2
        </MenuItem>
      </Drawer>
    );
  }
}

MetricGaugeDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool,
  toggleMetricGaugeDrawer: PropTypes.func,
};

const styles = {
  container: {
    top: '60px',
    zIndex: '10',
    height: '94%',
  },
  overlay: {
    top: '60px',
    zIndex: '10',
  },
};

export default MetricGaugeDrawer;
