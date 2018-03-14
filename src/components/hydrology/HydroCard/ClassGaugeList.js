import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import {classification, classInfo} from '../../../constants/classification';

export default class ClassGaugeList extends React.Component {
  _renderClassCard(classes) {
    return classes.map((classification, index) => {
      const abbre = classInfo[`class${index + 1}`].abbre;
      const gaugeCount = classInfo[`class${index + 1}`].gaugeCount;
      return (
        <Card key={classification}>
          <CardHeader
            title={`${classification} (${abbre})`}
            subtitle={`Gauge Count: ${gaugeCount}`}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec
            vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
            pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque
            lobortis odio.
          </CardText>
        </Card>
      );
    });
  }
  render() {
    return (
      <div className="helloalsdkfjal" style={styles.container}>
        {this._renderClassCard(classification)}
      </div>
    );
  }
}

ClassGaugeList.propTypes = {};

const styles = {
  container: {
    maxHeight: '650px',
    overflow: 'scroll',
  },
};
