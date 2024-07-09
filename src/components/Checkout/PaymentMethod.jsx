import React, { useState } from "react";
import '../../components/css/PaymentMethod.css'
import { IoMdClose } from "react-icons/io";
import GooglePay from "../../images/Payment/GooglePay.webp";
import PaymentMethodData from "../../data/paymentMethod";

const PaymentMethod = ({ onClose, onSelectedPaymentMethod }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("Overlay")) {
      onClose();
    }
  };

  const handlePaymentMethodClick = (index) => setSelectedMethod(index);

  const handleConfirmPaymentMethod = () => {
    if (selectedMethod !== null) {
      onSelectedPaymentMethod({
        image: PaymentMethodData[selectedMethod].image,
        title: PaymentMethodData[selectedMethod].title,
      });
    }
    onClose();
  };

  return (
    <>
      <div className="Overlay" onClick={handleOverlayClick}></div>
      <div className="PaymentMethod">
        <div className="PaymentMethodHeader">
          <span className="PaymentMethodHeaderIcon" onClick={onClose}>
            <IoMdClose size={20} />
          </span>
          <span className="PaymentMethodHeaderTitle">Payment Method</span>
        </div>
        <div className="PaymentMethodSaved">
          <div className="PaymentMethodSavedDiv">
            <span className="PaymentMethodSavedText">
              Saved payment methods
            </span>
          </div>
          <div className="PaymentMethodGoogle">
            <span className="PaymentMethodGoogleImageDiv">
              <img
                src={GooglePay}
                alt="Google Pay"
                className="PaymentMethodGoogleImage"
              />
            </span>
            <span className="PaymentMethodGoogleTitle">Google Pay</span>
          </div>
        </div>
        <div className="PaymentMethodSaved">
          <div className="PaymentMethodSavedDiv">
            <span className="PaymentMethodSavedText">Add payment method</span>
          </div>
          <div>
            {PaymentMethodData.map((data, index) => (
              <div
                key={index}
                className={`PaymentMethodGoogle ${
                  selectedMethod === index ? "Selected" : ""
                }`}
                onClick={() => handlePaymentMethodClick(index)}
              >
                <span className="PaymentMethodGoogleImageDiv">
                  <img
                    src={data.image}
                    alt="Google Pay"
                    className="PaymentMethodGoogleImage"
                  />
                </span>
                <span className="PaymentMethodGoogleTitle">{data.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="PaymentMethodButtonDiv">
          <button
            className="PaymentMethodButton"
            onClick={handleConfirmPaymentMethod}
          >
            Confirm Payment Method
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
