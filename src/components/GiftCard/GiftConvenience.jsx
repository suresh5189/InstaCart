import React from "react";
import Shop from "../../images/Shop.svg";
import Clock from "../../images/Clock.svg";
import Email from "../../images/Email.svg";

const GiftConvenience = () => {
  return (
    <div className="GiftConvenience">
      <div className="GiftConvenienceHeading">Give the gift of convenience</div>
      <div className="GiftConvenienceContainer">
        <div className="GiftConvenienceImageContainer">
          <div>
            <img src={Shop} alt="" className="GiftConvenienceImage" />
          </div>
          <div className="GiftConvenienceImageContainerText">
            <h2 className="GiftConvenienceText">Shop local stores</h2>
            <span className="GiftConvenienceSubText">
              From groceries to electronics and household items, Instacart
              connects you to hundreds of local stores.
            </span>
          </div>
        </div>
        <div className="GiftConvenienceImageContainer">
          <div>
            <img src={Clock} alt="" className="GiftConvenienceImage" />
          </div>
          <div className="GiftConvenienceImageContainerText">
            <h2 className="GiftConvenienceText">Save time</h2>
            <span className="GiftConvenienceSubText">
              Instacart spares you time spent in a store and gives you access to
              things you need easily and safely with same-day delivery and pick
              up.
            </span>
          </div>
        </div>
        <div className="GiftConvenienceImageContainer">
          <div>
            <img src={Email} alt="" className="GiftConvenienceImage" />
          </div>
          <div className="GiftConvenienceImageContainerText">
            <h2 className="GiftConvenienceText">Send instantly</h2>
            <span className="GiftConvenienceSubText">
              Once you purchase a gift card, the recipient will receive it in
              their email in seconds. The best part is, gift cards never expire,
              so they can take their time browsing their favorite stores.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftConvenience;
