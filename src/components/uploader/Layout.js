import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';
import { Colors } from '../../styles';
import Params from './Params';

class Uploader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onUpload,
      onSubmit,
      enabled,
      isError,
      userParams,
      setUserParams,
    } = this.props;

    if (isError) {
      this.fileInput.value = '';
    }
    return (
      <div>
        <input
          onChange={e => onUpload(e.target.files)}
          type="file"
          style={{ fontSize: '14px' }}
          ref={ref => (this.fileInput = ref)}
        />

        <Params
          userParams={userParams}
          setUserParams={setUserParams}
          handleSlider={this.props.handleSlider}
        />

        <RaisedButton
          label="Upload"
          disabled={!enabled}
          backgroundColor={Colors.gold}
          labelColor={Colors.white}
          labelStyle={{ fontSize: '12px' }}
          onClick={() => onSubmit()}
          style={{ width: '100px', margin: '20px 10px' }}
        />
        <div
          style={{
            marginLeft: '304px',
            marginTop: '-10px',
          }}
        >
          <span style={{ fontSize: '12px', color: '#d32f2f' }}>
            Optional: Select a hydrologic class to refine metric results
          </span>
        </div>
      </div>
    );
  }
}

Uploader.propTypes = {
  onUpload: PropTypes.func,
  onSubmit: PropTypes.func,
  enabled: PropTypes.bool,
  isError: PropTypes.bool,
  userParams: PropTypes.object,
  setUserParams: PropTypes.func,
  handleSlider: PropTypes.func,
};

export default Uploader;
