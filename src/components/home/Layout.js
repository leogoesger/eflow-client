import React from 'react';

import HydrologyCard from './HydrologyCard';
import MorphologyCard from './MorphologyCard';
import EcologyCard from './EcologyCard';
import Loader from '../shared/loader/Loader';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isTourActive: false,
    };
  }

  updateTourStatus() {
    this.setState({isTourActive: false});
  }

  componentDidMount() {
    this.setState({loading: false});
  }

  render() {
    return (
      <div className="homeContainer">
        <Loader loading={this.state.loading} />
        <div className="animated fadeInUp">
          <HydrologyCard />
          <MorphologyCard />
          <EcologyCard />
        </div>
      </div>
    );
  }
}
