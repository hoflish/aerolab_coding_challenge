import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const DropErrorDescription = ({dropErrorIcon, errorDescription}) => {
  return (
    <div className="dropError-desc">
      <div className="dropError-title">
        {dropErrorIcon ? <span className={`dropError-icon icon-${dropErrorIcon}`} /> : null}
        { _.isObject(errorDescription) ?
          (<h1>{errorDescription.phrase}</h1>) : errorDescription }
      </div>
      {errorDescription.hint ? <div className="dropError-hint"><p>{errorDescription.hint}</p></div> : null}
    </div>
  )
};

DropErrorDescription.propTypes = {
  dropErrorIcon: PropTypes.string,
  errorDescription: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default DropErrorDescription;
