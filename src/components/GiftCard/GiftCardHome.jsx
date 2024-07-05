import React from "react";
import GiftCardImage from "../../images/giftCard.png";

const GiftCardHome = () => {
  return (
    <>
      <div className="GiftCard">
        <div className="GiftCardFirst">
          <div className="GiftCardInside">
            <div className="GiftCardHeading">
              <h1 className="GiftCardHeadingText">
                There’s something for everyone with Instacart gift
                <br />
                cards
              </h1>
            </div>
            <div className="GiftCardSubHeading">
              <span className="GiftCardSubHeadingText">
                Instantly send an Instacart gift card to someone special, so
                they can get groceries, household items, and more delivered from
                their favorite local stores.
              </span>
            </div>
            <div className="GiftCardButton">
              <button>Send gift card</button>
            </div>
            <div className="GiftCardSub">
              <span className="GiftCardSubText">
                Already have a gift card?{" "}
                <span className="GiftCardSubTextStyle">Log in and Redeem</span>
              </span>
            </div>
          </div>
          <div className="GiftCardImageContainer">
            <img src={GiftCardImage} alt="GiftCard" className="GiftCardImage" />
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftCardHome;
