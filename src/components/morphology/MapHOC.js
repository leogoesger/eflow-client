import React from 'react';

export const MapHOC = (WrappedMap, mapStyle) => {
  return <WrappedMap mapStyle={mapStyle} {...this.props} />;
};
