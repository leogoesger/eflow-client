import React from 'react';
import PropTypes from 'prop-types';

import {getCurrentMonthYear} from '../../utils/helpers';

const Citation = props => {
  return (
    <div
      style={{
        width: '96%',
        margin: '0px auto 20px auto',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#757575',
      }}
    >
      <p style={{paddingTop: '10px'}}>
        Belize Lane, Noelle Patterson, Leo Qiu, Samuel Sandoval, Sarah Yarnell,
        Robert Lusardi, Julie Zimmerman, Eric Stein, Larry Brown, Theodore
        Grantham, Jeanette Howard. Functional Flows Calculator {props.version},
        University of California, Davis. Davis CA. {getCurrentMonthYear()},
        https://eflows.ucdavis.edu (Date Accessed)
      </p>
    </div>
  );
};

Citation.propTypes = {
  version: PropTypes.string,
};

export default Citation;
