import React from 'react';
import {Card} from 'material-ui/Card';
import {BoxPlot} from '../shared/plots';

export default class Layout extends React.Component {
  render() {
    return (
      <Card
        className="col-lg-9 col-md-9 col-xs-12 animated zoomIn"
        style={styles.card}
      >
        <BoxPlot width={900} height={400} x={0} y={20} />
      </Card>
    );
  }
}

const styles = {
  card: {
    margin: '0 auto',
    marginTop: '120px',
    borderRadius: '2px',
    minHeight: '500px',
  },
};
