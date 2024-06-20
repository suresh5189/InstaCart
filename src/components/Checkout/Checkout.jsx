import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { FaCar } from "react-icons/fa6";
import { BsFillClockFill } from "react-icons/bs";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";
import { IoGiftSharp } from "react-icons/io5";
import { SiInstacart } from "react-icons/si";
import AddressModal from "./AddressModal";
import PaymentMethod from "./PaymentMethod";
import DebitCard from "../../images/Payment/DebitCard.webp";
import Select from "react-select";

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
                        maxLength={10}
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
