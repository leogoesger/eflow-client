import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import Citation from './Citation';
import Term from './Term';
import {Colors} from '../../styles';

export default class Layout extends React.Component {
  render() {
    return (
      <Card className="col-lg-9 col-md-9 col-xs-12" style={styles.card}>
        <div style={styles.catagory}>Citation</div>
        <Citation version={this.props.version} />
        <Divider />
        <div style={styles.catagory}>Terms of Service</div>
        <Term />
      </Card>
    );
  }
}

Layout.propTypes = {
  version: PropTypes.string,
};

const styles = {
  card: {
    padding: '20px',
    borderRadius: '2px',
    height: '600px',
    margin: '-60px auto 100px auto',
    width: '80%',
    overflow: 'scroll',
  },
  catagory: {
    color: Colors.grey,
    fontSize: '20px',
    margin: '20px 0px',
  },
};
