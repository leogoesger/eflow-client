import React from 'react';
import {Card} from 'material-ui/Card';

import Citation from './Citation';
import Term from './Term';
import {Colors} from '../../styles';

export default class Layout extends React.Component {
  render() {
    return (
      <Card className="col-lg-9 col-md-9 col-xs-12" style={styles.card}>
        <div style={styles.catagory}>Citation</div>
        <Citation />
        <div style={styles.catagory}>Terms of Service</div>
        <Term />
      </Card>
    );
  }
}

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
    margin: '20px 0px ',
  },
};
