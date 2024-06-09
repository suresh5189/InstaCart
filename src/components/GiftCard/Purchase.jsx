import React from "react";
import PurchaseImage from "../../images/Purchase.webp";

const Purchase = () => {
  return (
    <div className="Purchase">
      <div className="PurchaseImageContainer">
        <img src={PurchaseImage} alt="" />
      </div>
      <div className="PurchaseContainer">
        <span className="PurchaseContainerHeading">Spread the love</span>
        <span className="PurchaseContainerSubHeading">
          Purchase gift cards in bulk or in the form of Instacart+ Memberships
          for your employees, community, or most loyal customers.
        </span>
        <span className="PurchaseButton">
          <button>Purchase in bulk</button>
        </span>
      </div>
    </div>
  );
};

export default Purchase;
