import React from "react";
import DeliveryData from "../../data/deliveryGrocery";

const Delivery_Grocery = () => {
  return (
    <div className="Delivery">
      <h1>Grocery delivery you can count on</h1>
      <div className="DeliveryHead">
        {DeliveryData.map(({ id, title, subTitle, groceryImage }) => {
          return (
            <div className="DeliveryBox" key={id}>
              <div className="DeliveryBoxImage">
                <img src={groceryImage} alt={title} />
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
