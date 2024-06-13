import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { FaAddressCard } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import { BsFillClockFill } from "react-icons/bs";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";
import { IoGiftSharp } from "react-icons/io5";
import { SiInstacart } from "react-icons/si";

const Checkout = () => {
  return (
    <>
      <div className="CheckOutside">
        <div className="Checkout">
          <div className="CheckoutDiv">
            <div className="CheckoutAddressDiv">
              <fieldset className="CheckoutAddressFieldSet">
                <legend className="CheckoutAddressLegend">
                  <div className="CheckoutAddressLegendDiv">
                    <div className="CheckoutAddressLegendIconDiv">
                      <span className="CheckoutAddressLegendIcon">
                        <FaLocationDot size={22} />
                      </span>
                    </div>
                    <div className="CheckoutAddressLegendTextDiv">
                      <h2 className="CheckoutAddressLegendText">
                        Delivery Address
                      </h2>
                    </div>
                  </div>
                </legend>
                <div className="CheckoutAddressButtonDiv">
                  <button className="CheckoutAddressButton">
                    <span className="CheckoutAddressButtonText">
                      Add a delivery Address
                    </span>
                    <span className="CheckoutAddressButtonIcon">
                      <FiSearch size={18} />
                    </span>
                  </button>
                </div>
              </fieldset>
            </div>
            <div className="CheckoutAddressDiv">
              <fieldset className="CheckoutAddressFieldSet">
                <legend className="CheckoutAddressLegend">
                  <div className="CheckoutAddressLegendDiv">
                    <div className="CheckoutAddressLegendIconDiv">
                      <span className="CheckoutAddressLegendIcon">
                        <FaAddressCard size={26} />
                      </span>
                    </div>
                    <div className="CheckoutAddressLegendTextDiv">
                      <h2 className="CheckoutAddressLegendText">
                        Age Verification
                      </h2>
                    </div>
                  </div>
                </legend>
              </fieldset>
            </div>
            <div className="CheckoutAddressDiv">
              <fieldset className="CheckoutAddressFieldSet">
                <legend className="CheckoutAddressLegend">
                  <div className="CheckoutAddressLegendDiv">
                    <div className="CheckoutAddressLegendIconDiv">
                      <span className="CheckoutAddressLegendIcon">
                        <FaCar size={26} />
                      </span>
                    </div>
                    <div className="CheckoutAddressLegendTextDiv">
                      <h2 className="CheckoutAddressLegendText">
                        Delivery Instructions
                      </h2>
                    </div>
                  </div>
                </legend>
              </fieldset>
            </div>
            <div className="CheckoutAddressDiv">
              <fieldset className="CheckoutAddressFieldSet">
                <legend className="CheckoutAddressLegend">
                  <div className="CheckoutAddressLegendDiv">
                    <div className="CheckoutAddressLegendIconDiv">
                      <span className="CheckoutAddressLegendIcon">
                        <BsFillClockFill size={26} />
                      </span>
                    </div>
                    <div className="CheckoutAddressLegendTextDiv">
                      <h2 className="CheckoutAddressLegendText">
                        Delivery time
                      </h2>
                    </div>
                  </div>
                </legend>
              </fieldset>
            </div>
            <div className="CheckoutAddressDiv">
              <fieldset className="CheckoutAddressFieldSet">
                <legend className="CheckoutAddressLegend">
                  <div className="CheckoutAddressLegendDiv">
                    <div className="CheckoutAddressLegendIconDiv">
                      <span className="CheckoutAddressLegendIcon">
                        <BsFillTelephoneOutboundFill size={26} />
                      </span>
                    </div>
                    <div className="CheckoutAddressLegendTextDiv">
                      <h2 className="CheckoutAddressLegendText">
                        Mobile Number
                      </h2>
                    </div>
                  </div>
                </legend>
              </fieldset>
            </div>
            <div className="CheckoutAddressDiv">
              <fieldset className="CheckoutAddressFieldSet">
                <legend className="CheckoutAddressLegend">
                  <div className="CheckoutAddressLegendDiv">
                    <div className="CheckoutAddressLegendIconDiv">
                      <span className="CheckoutAddressLegendIcon">
                        <FaCreditCard size={26} />
                      </span>
                    </div>
                    <div className="CheckoutAddressLegendTextDiv">
                      <h2 className="CheckoutAddressLegendText">Pay with</h2>
                    </div>
                  </div>
                </legend>
              </fieldset>
            </div>
            <div className="CheckoutAddressDiv">
              <fieldset className="CheckoutAddressFieldSet">
                <legend className="CheckoutAddressLegend">
                  <div className="CheckoutAddressLegendDiv">
                    <div className="CheckoutAddressLegendIconDiv">
                      <span className="CheckoutAddressLegendIcon">
                        <IoGiftSharp size={26} />
                      </span>
                    </div>
                    <div className="CheckoutAddressLegendTextDiv">
                      <h2 className="CheckoutAddressLegendText">
                        Make it a gift
                      </h2>
                    </div>
                  </div>
                </legend>
              </fieldset>
            </div>
            <div className="CheckoutAddressDiv">
              <fieldset className="CheckoutAddressFieldSet">
                <legend className="CheckoutAddressLegend">
                  <div className="CheckoutAddressLegendDiv">
                    <div className="CheckoutAddressLegendIconDiv">
                      <span className="CheckoutAddressLegendIcon">
                        <SiInstacart size={26} />
                      </span>
                    </div>
                    <div className="CheckoutAddressLegendTextDiv">
                      <h2 className="CheckoutAddressLegendText">Instacart+</h2>
                    </div>
                  </div>
                </legend>
              </fieldset>
            </div>
            <div className="CheckoutContinueButtonDiv">
              <button className="CheckoutContinueButton" disabled>
                Continue
              </button>
            </div>
          </div>
          <div className="CheckoutContinueButtonOutsideDiv">
            <button className="CheckoutContinueButton" disabled>
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
