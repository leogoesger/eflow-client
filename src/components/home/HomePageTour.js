import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tour from 'react-user-tour';

import {Colors} from '../../styles';

export default class HomePageTour extends Component {
  constructor() {
    super();
    this.state = {
      tourStep: 1,
      justChanged: false,
    };
  }

  changeStep(number) {
    if (!this.state.justChanged) {
      this.setState({
        justChanged: true,
        tourStep: this.state.tourStep + number,
      });
    }
    if (this.state.justChanged) {
      this.setState({
        justChanged: false,
      });
    }
  }

  _updateTourStatus() {
    this.props.updateTourStatus();
    this.setState({tourStep: 1});
  }

  render() {
    return (
      <div>
        <Tour
          active={this.props.isTourActive}
          step={this.state.tourStep}
          onNext={() => this.changeStep(1)}
          onBack={() => this.changeStep(-1)}
          onCancel={() => this._updateTourStatus()}
          nextButtonText="Next"
          arrowColor={Colors.gold}
          buttonStyle={{
            fontSize: '16px',
            paddingRight: '12px',
            cursor: 'pointer',
            color: Colors.gold,
          }}
          doneButtonText=""
          steps={[
            {
              step: 1,
              selector: '.tour-logo',
              title: <div style={styles.title}>Home Button</div>,
              body: (
                <div style={styles.body}>
                  Click on the Eflow logo will direct you to home page at any
                  where in the app!
                </div>
              ),
              position: 'bottom',
            },
            {
              step: 2,
              selector: '.tour-hydrology',
              title: <div style={styles.title}>Hydrology Page</div>,
              body: (
                <div style={styles.body}>
                  {"This will direct you to Hydrology's home page!"}
                </div>
              ),
            },
            {
              step: 3,
              selector: '.tour-explore-hydrology',
              title: <div style={styles.title}>Explore Hydrology</div>,
              body: (
                <div style={styles.body}>
                  This is the same as Hydrology tab on Navigation bar!
                </div>
              ),
              position: 'bottom',
            },
            {
              step: 4,
              selector: '.tour-how-hydrology',
              title: <div style={styles.title}>How does it work?</div>,
              body: (
                <div style={styles.body}>
                  This will direct you to metric summary page!
                </div>
              ),
              position: 'bottom',
            },
          ]}
        />
      </div>
    );
  }
}

HomePageTour.propTypes = {
  isTourActive: PropTypes.bool,
  updateTourStatus: PropTypes.func,
};

const styles = {
  title: {
    fontWeight: 700,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  body: {
    fontSize: 12,
    paddingLeft: 10,
  },
};
