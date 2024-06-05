import React from "react";
import MarketPlace from "../images/marketplace.png";
import MarketPlaceData from "../data/marketPlace";

const Grocery_MarketPlace = () => {
  return (
    <div className="MarketPlace">
      <h1>The largest online grocery marketplace in North America</h1>
      <div className="MarketPlaceImage">
        <img src={MarketPlace} alt="marketplace" />
      </div>
      <div className="MarketPlaceBox">
        {MarketPlaceData.map(({ id, title, subtitle }) => {
          return (
            <div className="MarketPlaceSubBox" key={id}>
              <div className="MarketPlaceBoxTitle">
                <span>{title}</span>
              </div>
              <div className="MarketPlaceBoxSubTitle">
                <span>{subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Grocery_MarketPlace;
