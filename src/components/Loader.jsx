import React from "react";
import '../components/css/Loader.css';

const Loader = () => {
  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loader;
