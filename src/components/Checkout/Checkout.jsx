import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { FaCar } from "react-icons/fa6";
import { BsFillClockFill } from "react-icons/bs";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";
import { IoGiftSharp } from "react-icons/io5";
import { SiInstacart } from "react-icons/si";
import { BsExclamationCircleFill } from "react-icons/bs";
import AddressModal from "./AddressModal";
import PaymentMethod from "./PaymentMethod";
import DebitCard from "../../images/Payment/DebitCard.webp";
import Select from "react-select";
import GiftCardImage from "../../data/giftCardImage";
import { useSelector } from "react-redux";
import { addAddress } from "../../apiServices";

const Checkout = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [showDeliveryInstructions, setShowDeliveryInstructions] =
    useState(false);
  const [leaveAtDoor, setLeaveAtDoor] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isPhoneNumberVisible, setIsPhoneNumberVisible] = useState(false);
  const [makeAGift, setMakeAGift] = useState(false);

  const handleSaveAddress = (address) => {
    setDeliveryAddress(address);
    setIsAddressModalOpen(false);
    // setShowDeliveryInstructions(true);
  };

  const toggleAddressModal = () => setIsAddressModalOpen(!isAddressModalOpen);
  const handleEditAddress = () => setIsAddressModalOpen(true);
  const handleAddressCloseModal = () => setIsAddressModalOpen(false);
  const tooglePaymentModal = () => setIsPaymentModalOpen(!isPaymentModalOpen);
  const handlePaymentCloseModal = () => setIsPaymentModalOpen(false);

  const price = useSelector((state) => state.cart.totalPrice);

  const totalPrice = price + 1.99 + 3.0 + 0.24;
  // console.log(totalPrice.toFixed(2));

  const handleDeliveryInstructionsClick = (deliveryAddress) => {
    if (deliveryAddress) {
      setShowDeliveryInstructions(true);
    }
  };

  const countryOptions = [
    { value: "+91", label: "+91 - India" },
    { value: "+1", label: "+1 - United States" },
    { value: "+44", label: "+44 - United Kingdom" },
    { value: "+86", label: "+86 - China" },
    { value: "+81", label: "+81 - Japan" },
    { value: "+49", label: "+49 - Germany" },
    { value: "+7", label: "+7 - Russia" },
  ];

  const handleSaveAndContinue = () => setShowDeliveryInstructions(false);

  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = e.target.value.replace(/\D/g, "");
    setPhoneNumber(formattedPhoneNumber);
    if (formattedPhoneNumber.length === 10) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  };

  const togglePhoneNumberInput = () =>
    setIsPhoneNumberVisible(!isPhoneNumberVisible);

  const handleSaveAndContinuePhone = () => setIsPhoneNumberVisible(false);

  const toggleMakeAGift = () => setMakeAGift(!makeAGift);

  const handleSaveMakeAGift = () => setMakeAGift(false);

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
                <>
                  {deliveryAddress === null ? (
                    <div className="CheckoutAddressButtonDiv">
                      <button
                        className="CheckoutAddressButton"
                        onClick={toggleAddressModal}
                      >
                        <span className="CheckoutAddressButtonText">
                          Add a delivery Address
                        </span>
                        <span className="CheckoutAddressButtonIcon">
                          <FiSearch size={18} />
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="CheckoutDeliveryAddress">
                      <div className="CheckoutDeliveryAddressText">
                        <span>
                          Street Address: {deliveryAddress.streetAddress}
                        </span>
                        <span>
                          Floor Address: {deliveryAddress.floorAddress}
                        </span>
                        <span>ZipCode: {deliveryAddress.zipCode}</span>
                      </div>
                      <div
                        className="CheckoutDeliveryAddressEditButtonDiv"
                        onClick={handleEditAddress}
                      >
                        <span className="CheckoutDeliveryAddressEditButton">
                          Edit
                        </span>
                      </div>
                    </div>
                  )}
                </>
                <div>
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    Add Address
                  </span>
                </div>
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
                {deliveryAddress && (
                  <div className="DeliveryInstructionsArea">
                    {!showDeliveryInstructions ? (
                      <div className="DeliveryInstructionsClosed">
                        <button
                          className="DeliveryInstructionsButton"
                          onClick={handleDeliveryInstructionsClick}
                        >
                          Add Delivery Instructions
                        </button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <textarea
                            name="deliveryInstruction"
                            id="deliveryInstruction"
                            placeholder="Add access code, best, entrance, etc."
                            className="DeliveryTextArea"
                          ></textarea>
                        </div>
                        <div className="DeliveryInstructionsOpen">
                          <span>
                            <input
                              type="checkbox"
                              checked={leaveAtDoor}
                              onChange={(e) => setLeaveAtDoor(e.target.checked)}
                              className="DeliveryCheckBox"
                            />
                          </span>
                          <span>Leave at door</span>
                        </div>
                        <div className="DeliveryTextInstruction">
                          <span>
                            By selecting this option you accept full
                            responsibility for your order after it has been
                            delivered unattended, including any loss due to
                            theft or damage due to temperature sensitivity
                          </span>
                        </div>
                        <div className="SaveAndContinueButtonDiv">
                          <button
                            className="SaveAndContinueButton"
                            onClick={handleSaveAndContinue}
                          >
                            Save & Continue
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
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
                <legend
                  className="CheckoutAddressLegend"
                  onClick={togglePhoneNumberInput}
                >
                  <div className="CheckoutAddressLegendDiv">
                    <div className="CheckoutAddressLegendIconDiv">
                      <span className="CheckoutAddressLegendIcon">
                        <BsFillTelephoneOutboundFill size={26} />
                      </span>
                    </div>
                    <div className="CheckoutAddressLegendTextDiv">
                      <h2 className="CheckoutAddressLegendText">
                        Phone Number
                      </h2>
                    </div>
                  </div>
                </legend>
                {isPhoneNumberVisible && (
                  <>
                    <div className="PhoneNumberContainer">
                      <Select
                        value={selectedCountry}
                        onChange={setSelectedCountry}
                        options={countryOptions}
                        placeholder="Select Country Code"
                        className="CountryCodeField"
                      />
                      <input
                        type="tel"
                        className="PhoneNumberInput"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                      />
                    </div>
                    <div
                      className="CheckoutContinueButtonDiv"
                      onClick={handleSaveAndContinuePhone}
                    >
                      <button
                        className={`AddressButton ${
                          isSaveDisabled ? "disabledSaveButton" : "SaveButton"
                        }`}
                        disabled={isSaveDisabled}
                      >
                        Save & Continue
                      </button>
                    </div>
                  </>
                )}
                {phoneNumber && !isPhoneNumberVisible && (
                  <div className="SavedPhoneNumber">
                    <span className="SavedPhoneNumberLabel">Phone Number:</span>{" "}
                    {selectedCountry && `${selectedCountry.value} `}
                    {phoneNumber}
                  </div>
                )}
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
                  <div
                    className="CheckoutAddressLegendDebit"
                    onClick={tooglePaymentModal}
                  >
                    <span className="CheckoutAddressLegendDebitCardImageDiv">
                      <img
                        src={DebitCard}
                        alt="Debit Card"
                        className="CheckoutAddressLegendDebitCardImage"
                      />
                    </span>
                    <span className="CheckoutAddressLegendDebitCardText">
                      Choose a payment method
                    </span>
                  </div>
                </legend>
              </fieldset>
            </div>
            <div className="CheckoutAddressDiv">
              <fieldset className="CheckoutAddressFieldSet">
                <legend
                  className="CheckoutAddressLegend"
                  onClick={toggleMakeAGift}
                >
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
                {makeAGift && (
                  <>
                    <div className="MakeAGiftDivHead">
                      <div className="MakeAGiftToHeading">
                        <span className="MakeAGiftToText">To</span>
                      </div>
                      <div className="MakeAGiftInputHead">
                        <input
                          type="text"
                          className="MakeAGiftInputRecipient"
                          placeholder="Recipient Name"
                          value={phoneNumber}
                        />
                      </div>
                      <div className="MakeAGiftContainer">
                        <Select
                          value={selectedCountry}
                          onChange={setSelectedCountry}
                          options={countryOptions}
                          placeholder="Select Country Code"
                          className="CountryCodeField"
                        />
                        <input
                          type="tel"
                          className="MakeAGiftInput"
                          placeholder="Recipient Phone Number"
                          value={phoneNumber}
                          maxLength={10}
                          onChange={handlePhoneNumberChange}
                        />
                      </div>
                    </div>
                    <div className="MakeAGiftRecipientSpanDiv">
                      <span className="MakeAGiftRecipientSpanText1">
                        Your recipient can schedule delivery
                      </span>
                      <span className="MakeAGiftRecipientSpanText2">
                        We'll send your recipient a message with delivery
                        details. They can schedule their delivery for a
                        convenient time.
                      </span>
                    </div>
                    <div className="MakeAGiftInputHead">
                      <div className="MakeAGiftFromDiv">
                        <span className="MakeAGiftFromText">From</span>
                      </div>
                      <input
                        type="text"
                        className="MakeAGiftInputFrom"
                        placeholder="Your Name"
                        value={phoneNumber}
                      />
                    </div>
                    <div className="">
                      <div className="MakeAGiftCardImageDivHeadingOuter">
                        <div className="MakeAGiftCardImageDivHeadingInner">
                          <span className="MakeAGiftCardImageDivText1">
                            Choose a digital card
                          </span>
                          <span className="MakeAGiftCardImageDivText2">
                            Optional
                          </span>
                        </div>
                        <div className="MakeAGiftCardImageOuterDiv">
                          <ul className="MakeAGiftCardImageInnerDiv">
                            {GiftCardImage.map(({ id, image }) => (
                              <li className="MakeAGiftCardImageLi" key={id}>
                                <img
                                  src={image}
                                  alt=""
                                  className="MakeAGiftCardImage"
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="MakeAGiftTextAreaDiv">
                        <div className="MakeAGiftTextAreaHeadingDiv">
                          <span className="MakeAGiftTextAreaHeadingText1">
                            Personal Message
                          </span>
                          <span className="MakeAGiftTextAreaHeadingText2">
                            Optional
                          </span>
                        </div>
                        <textarea
                          name="deliveryInstruction"
                          id="deliveryInstruction"
                          placeholder="Add a personal message"
                          className="DeliveryTextArea"
                        ></textarea>
                      </div>
                    </div>
                    <div className="CheckoutContinueButtonDiv">
                      <button
                        className="AddressButton SaveButton"
                        onClick={handleSaveMakeAGift}
                      >
                        Continue
                      </button>
                      <span
                        className="MakeAGfitButtonClose"
                        onClick={toggleMakeAGift}
                      >
                        Close
                      </span>
                    </div>
                  </>
                )}
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
          <div>
            <div className="CheckoutContinueButtonOutsideDiv">
              <button className="CheckoutContinueButton" disabled>
                Continue
              </button>
            </div>
            {deliveryAddress && (
              <div className="TotalCartPriceOuterDiv">
                <div className="TotalCartPriceInnerDiv">
                  <div className="TotalCartPriceSubTotal">
                    <span className="TotalCartPriceSubTotalText1">
                      Item subtotal
                    </span>
                    <span className="TotalCartPriceSubTotalText2">
                      ${price.toFixed(2)}
                    </span>
                  </div>
                  <div className="TotalCartPriceDeliveryFee">
                    <span className="TotalCartPriceDeliveryFeeText1">
                      Delivery fee
                    </span>
                    <span className="TotalCartPriceDeliveryFeeText2">
                      $1.99
                    </span>
                  </div>
                  <div className="TotalCartPriceServiceFee">
                    <span className="TotalCartPriceServiceFeeText1">
                      Service fee
                      <BsExclamationCircleFill size={14} color="grey" />
                    </span>
                    <span className="TotalCartPriceServiceFeeText2">$3.00</span>
                  </div>
                  <div className="TotalCartPriceEstimatefFee">
                    <span className="TotalCartPriceEstimatefFeeText1">
                      Estimated taxes and fees
                      <BsExclamationCircleFill size={14} color="grey" />
                    </span>
                    <span className="TotalCartPriceEstimatefFeeText2">
                      $0.24
                    </span>
                  </div>
                </div>
                <hr style={{ margin: "10px", color: "lightgrey" }} />
                <div className="TotalCartPriceTotal">
                  <span className="TotalCartPriceTotalText1">Subtotal</span>
                  <span className="TotalCartPriceTotalText2">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isAddressModalOpen && (
        <AddressModal
          onClose={handleAddressCloseModal}
          onAddressSave={handleSaveAddress}
          initialAddress={deliveryAddress}
        />
      )}
      {isPaymentModalOpen && (
        <PaymentMethod onClose={handlePaymentCloseModal} />
      )}
    </>
  );
};

export default Checkout;
