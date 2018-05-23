import React from 'react';
import Layout from '../components/ecology/Layout';

export class Function extends React.Component {
  componentDidMount() {
    document.title = 'Eflows | Ecology';
  }

  render() {
    return <Layout />;
  }
}

Function.propTypes = {};

export default Function;
