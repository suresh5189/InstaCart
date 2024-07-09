import React from "react";
import InstacartPlusImage from "../images/InstacartPlus.webp";
import InstacartPlusLogo from "../images/InstacartPlusLogo.webp";
import Truck from "../images/Truck.webp";
import Percentage from "../images/Percentage.webp";
import DownArrow from "../images/DownArrow.webp";
import Peacock from "../images/Peacock.webp";
import EmiCard from "../images/EmiCard.webp";
import CostoCard from "../images/costcoCard.webp";
import Paypal from "../images/Paypal.webp";
import MasterCard from "../images/MasterCard.webp";
import PeacockCard from "../images/PeacockCard.webp";
import Chase from "../images/Chase.webp";

const InstacartPlus = () => {
  return (
    <div className="InstaCartPlusContainer">
      <div className="InstaCartBanner">
        <img src={InstacartPlusLogo} alt="" className="InstacartImageLogo" />
        <img src={InstacartPlusImage} alt="" className="InstacartImage" />
      </div>
      <div className="InstaCartPlusCHead">
        <div className="InstaCartPlusCHeadContainer">
          <div className="InstaCartPlusHeading">
            <h1>
              <span>Join Instacart+ for free delivery and more</span>
            </h1>
          </div>
          <div className="InstaCartPlusCHeadList">
            <div className="InstaCartPlusCHeadListFirst">
              <img
                src={Truck}
                alt=""
                className="InstaCartPlusCHeadListFirstImage"
              />
              <div className="InstaCartPlusCHeadListSpan">
                <span className="InstaCartPlusCHeadText1">$0 delivery fee</span>
                <span className="InstaCartPlusCHeadText2">
                  On orders over $35
                </span>
              </div>
            </div>
            <div className="InstaCartPlusCHeadListFirst">
              <img
                src={Percentage}
                alt=""
                className="InstaCartPlusCHeadListFirstImage"
              />
              <div className="InstaCartPlusCHeadListSpan">
                <span className="InstaCartPlusCHeadText1">5% credit back</span>
                <span className="InstaCartPlusCHeadText2">
                  On eligible pickup orders
                </span>
              </div>
            </div>
            <div className="InstaCartPlusCHeadListFirst">
              <img
                src={DownArrow}
                alt=""
                className="InstaCartPlusCHeadListFirstImage"
              />
              <div className="InstaCartPlusCHeadListSpan">
                <span className="InstaCartPlusCHeadText1">
                  Lower service fees
                </span>
                <span className="InstaCartPlusCHeadText2">On all orders</span>
              </div>
            </div>
            <div className="InstaCartPlusCHeadListFirst">
              <img
                src={Peacock}
                alt=""
                className="InstaCartPlusCHeadListFirstImage"
              />
              <div className="InstaCartPlusCHeadListSpan">
                <span className="InstaCartPlusCHeadText1">Peacock</span>
                <span className="InstaCartPlusCHeadText2">
                  Hit movies, TV, live sports, and more ($59.99/yr value)
                </span>
              </div>
            </div>
            <div className="InstaCartPlusCHeadListFirst">
              <img
                src={EmiCard}
                alt=""
                className="InstaCartPlusCHeadListFirstImage"
              />
              <div className="InstaCartPlusCHeadListSpan">
                <span className="InstaCartPlusCHeadText1">
                  $99/yr after trial
                </span>
                <span className="InstaCartPlusCHeadText2">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
        <div className="InstaCartPlusButton">
          <button>start 14-day free trial</button>
        </div>
        <div className="InstaCartPlusButtonBelowText">
          <span>
            By signing up, you agree to the Instacart+ Terms and authorize us to
            charge any active payment method on file after your free trial.
            Cancel any time in Your Account. Other fees, taxes, and or tips may
            apply. Additional Instacart+ benefits are subject to additional
            terms. Instacart may modify or terminate additional benefits at any
            time. Redemption of Peacock benefit may be subject to a daily limit.
          </span>
        </div>
        <div className="InstaCartPromoCodeButton">
          <span>Add promo code</span>
        </div>
      </div>
      <div className="InstaCardPlusDiv">
        <div className="InstaCardPlusHeading">
          <h1>
            <span>Member exclusive offers</span>
          </h1>
        </div>
        <div className="InstaCardPlus">
          <div className="InstaCardPlusInsideDiv">
            <div className="InstaCardPlusImage">
              <img src={Paypal} alt="" />
            </div>
            <div className="InstaCardPlusText">
              <span className="InstaCardPlusText1">
                Get $25 off your first year of Instacart+ with PayPal. Terms
                apply.
              </span>
              <span className="InstaCardPlusText2">Redeem</span>
            </div>
          </div>
          <div className="InstaCardPlusInsideDiv">
            <div className="InstaCardPlusImage">
              <img src={MasterCard} alt="" />
            </div>
            <div className="InstaCardPlusText">
              <span className="InstaCardPlusText1">
                Get 2 free months of Instacart+ with your eligible Mastercard®.
                Terms apply.
              </span>
              <span className="InstaCardPlusText2">Redeem</span>
            </div>
          </div>
          <div className="InstaCardPlusInsideDiv">
            <div className="InstaCardPlusImage">
              <img src={PeacockCard} alt="" />
            </div>
            <div className="InstaCardPlusText">
              <span className="InstaCardPlusText1">
                Join Instacart+ and get Peacock at no extra cost. Terms apply.
              </span>
              <span className="InstaCardPlusText2">Learn more</span>
            </div>
          </div>
          <div className="InstaCardPlusInsideDiv">
            <div className="InstaCardPlusImage">
              <img src={Chase} alt="" />
            </div>
            <div className="InstaCardPlusText">
              <span className="InstaCardPlusText1">
                Get up to 12 months of free delivery with Chase Terms Apply.
              </span>
              <span className="InstaCardPlusText2">Redeem</span>
            </div>
          </div>
          <div className="InstaCardPlusInsideDiv">
            <div className="InstaCardPlusImage">
              <img src={CostoCard} alt="" />
            </div>
            <div className="InstaCardPlusText">
              <span className="InstaCardPlusText1">
                Enjoy $20 off your Instacart+ membership renewal with Costco
              </span>
              <span className="InstaCardPlusText2">Redeem</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstacartPlus;
