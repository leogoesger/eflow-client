import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui/Slider';

import Card, {CardText} from 'material-ui/Card';

class MetricGaugeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: this.props.annualFlowData.Years.year[0],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.annualFlowData.Years.gaugeId !==
      this.props.annualFlowData.Years.gaugeId
    ) {
      this.setState({currentYear: nextProps.annualFlowData.Years.year[0]});
    }
  }

  async _handleSlider(e, v) {
    await this.setState({currentYear: v});
    this.props.fetchAnnualFlowData({
      gaugeId: this.props.annualFlowData.Years.gaugeId,
      year: this.state.currentYear,
    });
  }

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
        <CardText style={{width: '90%', overflow: 'hidden'}}>
          {JSON.stringify(this.props.annualFlowData)}
        </CardText>

        <Slider
          min={this.props.annualFlowData.Years.year[0]}
          max={
            this.props.annualFlowData.Years.year[
              this.props.annualFlowData.Years.year.length - 1
            ]
          }
          step={1}
          style={{width: '600px', margin: '0 auto'}}
          value={this.state.currentYear}
          onChange={(e, v) => this._handleSlider(e, v)}
        />
      </Card>
    );
  }
}

MetricGaugeCard.propTypes = {
  annualFlowData: PropTypes.object,
  fetchAnnualFlowData: PropTypes.func,
};

export default MetricGaugeCard;
