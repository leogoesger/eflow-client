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
    this.setState({loading: false});
  }

  render() {
    return (
      <div style={styles.container}>
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

const styles = {
  container: {
    background: 'url("../constants/backslant-head.svg") 160px 60px no-repeat',
    backgroundPosition: 'right 0px top 10px',
    backgroundColor: '#f5f6f7',
    paddingTop: '130px',
  },
};
