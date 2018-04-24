import React from 'react';
import Card, {CardText} from 'material-ui/Card';

class MetricGaugeCard extends React.Component {
  render() {
    return (
      <Card
        style={{
          width: '65%',
          height: '600px',
          overflow: 'scroll',
          margin: '0 auto',
        }}
      >
        <CardText>
          {'Page is under construction! Click on Overview to see boxplots!'}
        </CardText>
      </Card>
    );
  }
}

export default MetricGaugeCard;
