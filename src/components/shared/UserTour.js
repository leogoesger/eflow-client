import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Tour from 'react-user-tour';
import SvgIcon from 'material-ui/SvgIcon';
import scrollTo from 'scroll-to';

import {QuestionIcon} from '../shared/QuestionIcon';
import {Colors} from '../../styles';

export default class UserTour extends Component {
  constructor() {
    super();
    this.state = {
      tourStep: 1,
      justChanged: false,
      isTourActive: false,
    };
  }

  updateTourStatus() {
    this.setState({tourStep: 1, isTourActive: false});
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

  changeTourStatus() {
    scrollTo(0, 0, {
      ease: 'linear',
      duration: 200,
    });
    setTimeout(
      () => this.setState({isTourActive: !this.state.isTourActive}),
      300
    );
  }

  render() {
    return (
      <div>
        <div style={styles.actionBtn}>
          <FloatingActionButton
            backgroundColor={Colors.gold}
            onClick={() => this.changeTourStatus()}
            mini={true}
          >
            <SvgIcon>
              <QuestionIcon
                style={{fill: 'white', height: '30px', width: '30px'}}
              />
            </SvgIcon>
          </FloatingActionButton>
        </div>
        <Tour
          active={this.state.isTourActive}
          step={this.state.tourStep}
          onNext={() => this.changeStep(1)}
          onBack={() => this.changeStep(-1)}
          onCancel={() => this.updateTourStatus()}
          nextButtonText="Next"
          arrowColor={Colors.blue}
          buttonStyle={{
            fontSize: '16px',
            paddingRight: '12px',
            cursor: 'pointer',
            color: Colors.blue,
          }}
          doneButtonText=""
          steps={this.props.tourSteps}
        />
      </div>
    );
  }
}

UserTour.propTypes = {
  tourSteps: PropTypes.array,
};

const styles = {
  actionBtn: {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    zIndex: 4,
  },
};
