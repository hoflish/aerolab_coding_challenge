import React from 'react';
import {number, string, bool} from 'prop-types';
import capitalize from 'lodash/capitalize';
import './Spinner.css';

export default function Spinner({size, hasText, btnSpinner, className}) {
  return (
    <div className={`${btnSpinner ? "btn-spinner" : (className ? className : "spinner-wrapper")}`}>
      <svg className="spinner" width={size} height={size} viewBox="0 0 44 44">
        <circle
          className="spinner-stroke"
          cx="22"
          cy="22"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
      {hasText && hasText.length > 0 ? <span className="spinner-text">{`${capitalize(hasText)}...`}</span> : null}
    </div>
  );
}

Spinner.propTypes = {
  size: number,
  hasText: string,
  btnSpinner: bool,
};

Spinner.defaultProps = {
  size: 24,
  hasText: "loading",
};
