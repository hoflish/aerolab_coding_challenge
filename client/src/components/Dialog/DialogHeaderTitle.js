import React from 'react';
import PropTypes from 'prop-types';
import { HEADER_TITLE, HEADER_TITLE_WRAPPER } from './CONSTANTS';

const DialogHeaderTitle = ({ title }) => (
  <div className={HEADER_TITLE_WRAPPER}>
    <h3 title={title} className={HEADER_TITLE}>
      {title}
    </h3>
  </div>
);

DialogHeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DialogHeaderTitle;
