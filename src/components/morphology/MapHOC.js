import React from 'react';

import {classification} from '../../constants/classification';

export const MapHoC = WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hoveredFeature: null,
        x: null,
        y: null,
      };
    }

    hoverFeature(event) {
      if (event.features.length === 0) {
        return null;
      }
      const {features, srcEvent: {offsetX, offsetY}} = event,
        hoveredFeature = features[0].properties.CLASS
          ? classification[features[0].properties.CLASS - 1]
          : features[0].properties.Region;
      this.setState({hoveredFeature, x: offsetX, y: offsetY});
    }

    render() {
      return (
        <WrappedComponent
          hoverFeature={e => this.hoverFeature(e)}
          {...this.props}
          hoveredFeature={this.state.hoverFeature}
          x={this.state.x}
          y={this.state.y}
        />
      );
    }
  };
};
