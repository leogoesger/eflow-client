import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton, FlatButton } from 'material-ui';
import File from 'material-ui/svg-icons/file/cloud-upload';
import { Colors } from '../../styles';
import Params from './Params';
import { Tooltip } from 'react-tippy';

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput;
  }

  render() {
    const {
      onUpload,
      onSubmit,
      enabled,
      isError,
      userParams,
      setUserParams,
      handleSlider,
      fileName,
    } = this.props;

    if (isError) {
      this.fileInput.value = '';
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'relative',
          margin: 'auto',
          width: '75%',
        }}
      >
        <FlatButton
          containerElement="label"
          label={!fileName ? 'Pick A File' : `File: ${fileName}`}
          icon={
            <File
              style={{ width: '30px', height: '30px' }}
              color={Colors.gold}
            />
          }
          labelColor={Colors.white}
          labelStyle={{
            fontSize: '14px',
            fontWeight: '700',
            // color: 'black !important',
          }}
          style={{ height: '36px' }}
        >
          <input
            onChange={e => onUpload(e.target.files)}
            type="file"
            style={{
              cursor: 'pointer',
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              width: '100%',
              opacity: 0,
            }}
            ref={ref => {
              this.fileInput = ref;
            }}
          />
        </FlatButton>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            float: 'right',
            justifyContent: 'space-around',
            position: 'relative',
            margin: '0px',
          }}
        >
          <Tooltip
            title={'Select a stream class to refine metric results'}
            position="top"
            arrow={true}
          >
            <Params
              userParams={userParams}
              setUserParams={setUserParams}
              handleSlider={handleSlider}
              enabled={enabled}
            />
          </Tooltip>

          <RaisedButton
            label="Upload"
            disabled={!enabled}
            backgroundColor={Colors.gold}
            labelColor={Colors.white}
            labelStyle={{ fontSize: '12px' }}
            onClick={() => onSubmit()}
            style={{ width: '100px', marginLeft: '20px' }}
          />
        </div>
        {/* </div>
         <div
          style={{
            marginLeft: '304px',
            marginTop: '-10px',
          }}
        >
          <span style={{ fontSize: '12px', color: '#d32f2f' }}>
            Optional: Select a hydrologic class to refine metric results
          </span>
        </div> */}
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
  fileName: PropTypes.string,
};

export default Uploader;
