import React from "react";
import DeliveryData from "../data/delivery_grocery";

const Delivery_Grocery = () => {
  return (
    <div className="Delivery">
      <h1>Grocery delivery you can count on</h1>
      <div className="DeliveryHead">
        {DeliveryData.map(({ title, subTitle, img }) => {
          return (
            <div className="DeliveryBox">
              <div className="DeliveryBoxImage">
                <img src={img} alt="image" />
              </div>
              <div className="DeliveryText">
                <div className="DeliveryTextTitle">
                  <span>{title}</span>
                </div>
                <div className="DeliveryTextSubTitle">
                  <span>{subTitle}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Delivery_Grocery;
