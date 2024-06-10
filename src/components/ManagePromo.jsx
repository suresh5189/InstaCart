import React from "react";
import { BsExclamationCircleFill } from "react-icons/bs";

const ManagePromo = () => {
  return (
    <>
    <div className="Promo">
      <div className="PromoDiv">
        <div className="PromoDivHead">
          <span className="PromoDivHeading">
            Add a promo code or Instacart gift card
          </span>
          <p className="PromoDivSubHeading">
            Apply Instacart promos or gift cards. Learn more about{" "}
            <span className="PromoDivSubHeadingText">gift cards.</span>
          </p>
          <div className="PromoInputAndButton">
            <input
              type="text"
              className="PromoInput"
              placeholder="Promo code or Instacart gift card"
            />
            <button className="PromoAddButton">Add To Account</button>
          </div>
          <div className="PromoTermButton">
            <span className="PromoTermButtonText">
              Terms & Conditions apply
            </span>
          </div>
        </div>
        <div className="CreditHead">
        <div className="PromoDivHead">
          <span className="PromoDivHeading">
            Instacart+ and gift card credits
          </span>
          <p className="PromoDivSubHeading">
            Your available credits can be applied to your next order.
          </p>
          <div className="Credit">
            <div className="CreditCard">
              <span className="CreditCardPrice">$0.00</span>
              <span className="CreditCardText">Credits available now</span>
            </div>
            <div className="CreditExclaim">
              <span className="CreditExclaimIcon">
                <BsExclamationCircleFill size={20}/>
              </span>
            </div>
          </div>
            <div className="CreditView">
                <span className="CreditViewText">View credit history</span>
            </div>
        </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ManagePromo;
