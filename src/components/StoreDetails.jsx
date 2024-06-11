import React from "react";
import { AiOutlineDollar } from "react-icons/ai";

function StoreDetails() {
  return (
    <>
    <div className="Overlay"></div>
    <div className="StoreDetailSecondContainer">
      <div className="StoreDetailSecondImageContainer">
        <img src="" alt="" className="StoreDetailSecondImage" />
      </div>
      <div className="StoreDetailSecondImageContainerTitle">
        <span className="StoreDetailSecondImageContainerText">Walgreeens</span>
      </div>
      <div className="StoreDetailSecondImageContainerSubTitle">
        <span className="StoreDetailSecondImageContainerSubText">
          Health And Wellness
        </span>
      </div>
      <div
        style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
      ></div>
      <div className="StoreDetailSecondButton">
        <span className="StoreDetailSecondButtonInfo">Info</span>
        <span className="StoreDetailSecondButtonDelivery">Delivery times</span>
      </div>
      <div
        style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
      ></div>
      <div className="StoreDetailSecondPriceInfo">
        <div className="StoreDetailSecondPrice">Pricing</div>
        <div className="StoreDetailSecondPriceLogoAndDetail">
            <span className="StoreDetailSecondIcon"><AiOutlineDollar /></span>
            <span className="StoreDetailSecondDetail">Everyday store prices</span>
        </div>
      </div>
    </div>
    </>
  );
}

export default StoreDetails;
