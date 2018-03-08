import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';

import {
  classificationShort,
  classificationColor,
} from '../../constants/classification.js';
import {Colors} from '../../styles';

export default class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class1: true,
      class2: true,
      class3: true,
      class4: true,
      class5: true,
      class6: true,
      class7: true,
      class8: true,
      class9: true,
    };
  }

  handleToggle(classNumber) {
    this.setState({[classNumber]: !this.state[classNumber]}, () =>
      this.props.hideLayer(classNumber, this.state[classNumber])
    );
  }

  _renderControllers() {
    return classificationShort.map((classInfo, index) => {
      return (
        <Toggle
          key={index}
          label={classInfo}
          labelStyle={styles.labelStyle}
          value={'empty'}
          thumbSwitchedStyle={{backgroundColor: classificationColor[index][0]}}
          trackSwitchedStyle={{backgroundColor: classificationColor[index][1]}}
          onClick={() => this.handleToggle(`class${index + 1}`)}
          toggled={this.state[`class${index + 1}`]}
        />
      );
    });
  }

  render() {
    return <div style={styles.container}>{this._renderControllers()}</div>;
  }
}

Control.propTypes = {
  classifications: PropTypes.array,
  hideLayer: PropTypes.func,
};

const styles = {
  container: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: '40px',
    left: '20px',
    width: '140px',
    height: '220px',
    padding: '20px',
    boxShadow: '2px 2px 45px -5px rgba(110,110,110,1)',
  },
  labelStyle: {
    color: Colors.grey,
    fontSize: '12px',
  },
};
