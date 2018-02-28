import React from 'react';

import HydrologyCard from './HydrologyCard';
import MorphologyCard from './MorphologyCard';
import FunctionCard from './FunctionCard';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <HydrologyCard />
        <MorphologyCard />
        <FunctionCard />
      </div>
    );
  }
}
