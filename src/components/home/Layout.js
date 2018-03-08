import React from 'react';

import HydrologyCard from './HydrologyCard';
import MorphologyCard from './MorphologyCard';
import FunctionCard from './FunctionCard';

import Loader from '../shared/loader/Loader';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({loading: false}), 500);
  }

  render() {
    return (
      <div>
        <Loader loading={this.state.loading} />
        <div className="animated fadeInUp">
          <HydrologyCard />
          <MorphologyCard />
          <FunctionCard />
        </div>
      </div>
    );
  }
}
