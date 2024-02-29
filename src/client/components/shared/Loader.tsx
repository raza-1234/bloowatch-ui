import '../../css/Loader.css';
import React from 'react';

const Loader = () => {
  return (
    <div data-testid = "loaderContainer"  className="bloowatch-loader__container">
      <div data-testid = "loader" className="bloowatch-loader"></div>
    </div>
  );
};

export default Loader;
