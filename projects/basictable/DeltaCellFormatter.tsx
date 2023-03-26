import React from 'react';
import PropTypes from 'prop-types';

const DeltaCellFormatter = ({ value, onChange }) => {
  const handleClick = () => {
    onChange();
  };

  let backgroundColor = '';
  switch (value) {
    case -1:
      backgroundColor = '#ffc7ce';
      break;
    case 1:
      backgroundColor = '#c6efce';
      break;
    default:
      backgroundColor = '#fff';
      break;
  }

  return (
    <div
      style={{
        backgroundColor,
        padding: '5px',
        borderRadius: '5px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      {value}
    </div>
  );
};

DeltaCellFormatter.propTypes = {
  value: PropTypes.oneOf([-1, 0, 1]),
  onChange: PropTypes.func.isRequired,
};

export default DeltaCellFormatter;