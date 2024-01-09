import React from 'react';
import '../../css/Loader.css';

const Loader = () => {
  return (
    <div className="bloowatch-loader__container">
      <div className="bloowatch-loader"></div>
      <h2>{`Sending Verification Code To Entered Email ...`}</h2>
    </div>
  );
};

export default Loader;
