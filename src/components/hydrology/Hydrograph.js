import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import {LinePlot} from '../shared/plots';

class Hydrograph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: 400,
    };
  }

  componentDidMount() {
    this._setContainerWidth();
    window.addEventListener('resize', () => this._setContainerWidth());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this._setContainerWidth());
  }

  _setContainerWidth() {
    this.setState({containerWidth: window.innerWidth / 2.7});
  }

  render() {
    return (
      <Paper style={styles.graph}>
        <LinePlot
          x={this.state.containerWidth / 10}
          y={20}
          width={this.state.containerWidth}
          height={400}
          data={this.props.DRHdata}
          xValue={value => value.date}
          yValue={value => value.flow}
        />
      </Paper>
    );
  }
}

const styles = {
  graph: {
    height: '800px',
    width: '100%',
    marginBottom: '20px',
  },
};

Hydrograph.propTypes = {
  DRHdata: PropTypes.array.isRequired,
};

export default Hydrograph;
