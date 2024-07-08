import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  addOrder,
  deleteAddress,
  editAddress,
  getAllAddress,
} from "../../apiServices";
import { ToastContainer, toast } from "react-toastify";
import OrderPlaceAnimation from "./OrderPlaceAnimation";
import Klarna from "../../images/Klarna.webp";
import { clearCart } from "../../store/action/userActions";

const Checkout = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [isEditAddress, setIsEditAddress] = useState(null);
  const [showDeliveryInstructions, setShowDeliveryInstructions] =
    useState(false);
  const [leaveAtDoor, setLeaveAtDoor] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isPhoneNumberVisible, setIsPhoneNumberVisible] = useState(false);
  // const [makeAGift, setMakeAGift] = useState(false);
  const [allAddress, setAllAddress] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [recipientName, setRecipientName] = useState("");
  const [recipientNumber, setRecipientNumber] = useState("");
  const [senderName, setSenderName] = useState("");
  const [makeAGiftVisible, setMakeAGiftVisible] = useState(false);
  const [onSelectedPaymentMethod, setOnSelectedPaymentMethod] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch initial address from local storage or API if needed
    const storedAddress = JSON.parse(localStorage.getItem("DeliveryAddress"));
    if (storedAddress) {
      setDeliveryAddress(storedAddress);
    }
    allAddressesGet();
  }, []);

  const allAddressesGet = async () => {
    try {
      const refreshToken = localStorage.getItem("RefreshToken");
      const addresses = await getAllAddress(refreshToken);
      const address = addresses.data.data.addressDetails;
      // console.log("Addresses", address.length);
      setAllAddress(address);
    } catch (error) {
      console.log("Error Fetching Addresses", error.message);
    }
  };

  const cartItems = useSelector((state) => state.cart.items);
  // console.log(cartItems);

  const handleOrderPlacedContinue = () => {
    setShowAnimation(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
    dispatch(clearCart());
  };

  const handleSelectedPaymentMethod = (method) => {
    setOnSelectedPaymentMethod(method);
  };

  const toggleAddressModal = () => setIsAddressModalOpen(!isAddressModalOpen);
  // const handleEditAddress = () => setIsAddressModalOpen(true);
  const handleAddressCloseModal = () => setIsAddressModalOpen(false);
  const tooglePaymentModal = () => {
    if (selectedAddressId) {
      setIsPaymentModalOpen(!isPaymentModalOpen);
    }
  };
  const handlePaymentCloseModal = () => setIsPaymentModalOpen(false);

  const price = useSelector((state) => state.cart.totalPrice);

  const deliveryFee = 1.99;
  const serviceFee = 3.0;
  const estimateTaxes = 0.24;

  const totalPrice = price + deliveryFee + serviceFee + estimateTaxes;
  // console.log(totalPrice.toFixed(2));

  const handleDeliveryInstructionsClick = () =>
    setShowDeliveryInstructions(true);

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

  const togglePhoneNumberInput = () => {
    if (selectedAddressId) {
      setIsPhoneNumberVisible(!isPhoneNumberVisible);
    }
  };
  const handleSaveAndContinuePhone = () => setIsPhoneNumberVisible(false);
  const handleSaveMakeAItGift = () => setMakeAGiftVisible(false);
  const toggleMakeAGift = () => {
    if (selectedAddressId) {
      setMakeAGiftVisible(!makeAGiftVisible);
    }
  };
  // const handleSaveMakeAGift = () => setMakeAGift(false);

  const handleUpdateAddress = async (address) => {
    try {
      const refreshToken = localStorage.getItem("RefreshToken");
      const updatedAddressWithCoords = {
        ...address,
        latitude: null || 0,
        longitude: null || 0,
      };
      const updatedAddress = await editAddress(
        refreshToken,
        selectedAddressId,
        updatedAddressWithCoords
      );
      if (updatedAddress) {
        const updatedAddresses = allAddress.map((addr) =>
          addr.address_id === updatedAddress.address_id ? updatedAddress : addr
        );
        setAllAddress(updatedAddresses);
        setDeliveryAddress(updatedAddress); // Update the deliveryAddress if needed
        localStorage.setItem("DeliveryAddress", JSON.stringify(updatedAddress));
        setIsAddressModalOpen(false);
        toast.success("Address Updated Successfully", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      } else {
        console.log("Updated address is null");
      }
    } catch (error) {
      console.log("Error Updating Address", error.message);
    }
  };

  const handleAddAddress = async (newAddress) => {
    try {
      const refreshToken = localStorage.getItem("RefreshToken");
      const addedAddress = await addAddress(refreshToken, newAddress);
      if (addedAddress) {
        setAllAddress([...allAddress, addedAddress.data]); // Add new address to state
        toast.success("Address Added Successfully", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
        setIsAddressModalOpen(false);
      } else {
        console.log("Failed to add new address");
      }
    } catch (error) {
      console.log("Error Adding Address", error.message);
    }
  };

  const handleEditAddress = (addressId) => {
    if (selectedAddressId) {
      const addressToEdit = allAddress.find(
        (address) => address.address_id === addressId
      );
      setIsEditAddress(addressToEdit);
      setIsAddressModalOpen(true);
    }
  };

  const handleDeleteAddress = async () => {
    try {
      const refreshToken = localStorage.getItem("RefreshToken");
      const deletedAddress = await deleteAddress(
        refreshToken,
        selectedAddressId
      );
      if (deletedAddress) {
        setDeliveryAddress(null);
        localStorage.removeItem("DeliveryAddress");
        setSelectedAddressId(null);
        allAddressesGet(); // Refresh addresses after deletion
        toast.success("Address Deleted Successfully", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      } else {
        console.log("Failed to delete address");
      }
    } catch (error) {
      console.log("Error deleting address", error.message);
    }
  };

  const handleMakeAGiftImageClick = (index) => setSelectedImageId(index);

  const handleAddOrder = async () => {
    try {
      const orderData = {
        store_id: 1,
        cart_items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: 1,
        })),
        // address_id,
        country_code: selectedCountry.value,
        mobile_number: phoneNumber,
        payment_mode: onSelectedPaymentMethod.title,
        actual_subtotal: price,
        final_subtotal: totalPrice,
        service_fee: serviceFee,
        bag_fee: deliveryFee,
        subtotal: price,
        discount_applied: 0,
        use_referral_bonus: true,
        pickup_address_id: selectedAddressId,
        pickup_day: "11 may",
        pickup_slot: "11:35-11:45pm",
        pickup_fee: 2.99,
      };

      const refreshToken = localStorage.getItem("RefreshToken");

      const response = await addOrder(refreshToken, orderData);
      console.log("Order Placed Successfully", response);
      handleOrderPlacedContinue();
    } catch (error) {
      console.log("Error Placing Order", error.message);
    }
  };

  // console.log(onSelectedPaymentMethod.title);

  return (
    <>
      <ToastContainer />
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
                  {allAddress.length === 0 ? (
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
                      {allAddress &&
                        allAddress.map(
                          ({ address_id, street, floor, zip_code }) => (
                            <div key={address_id}>
                              <div className="CheckoutDeliveryAddressInside">
                                <div className="CheckoutDeliveryAddressTextDiv">
                                  <input
                                    type="radio"
                                    name="selectedAddress"
                                    value={address_id}
                                    onChange={() =>
                                      setSelectedAddressId(address_id)
                                    }
                                    checked={selectedAddressId === address_id}
                                    className="RadioInputCheck"
                                  />
                                  <div className="CheckoutDeliveryAddressText">
                                    <span>Street Address: {street}</span>
                                    <span>Floor Address: {floor}</span>
                                    <span>ZipCode: {zip_code}</span>
                                  </div>
                                </div>
                                <div>
                                  <div
                                    className="CheckoutDeliveryAddressEditButtonDiv"
                                    // onClick={handleEditAddress}
                                  >
                                    <span
                                      className="CheckoutDeliveryAddressEditButton"
                                      onClick={() =>
                                        handleEditAddress(address_id)
                                      }
                                    >
                                      Edit
                                    </span>
                                  </div>
                                  <div
                                    className="CheckoutDeliveryAddressEditButtonDiv"
                                    onClick={handleDeleteAddress}
                                    style={{ marginTop: "15px" }}
                                  >
                                    <span
                                      style={{
                                        color: "red",
                                        fontWeight: "700",
                                      }}
                                    >
                                      Delete
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  )}
                </>
                <div>
                  <span
                    style={{ color: "green", fontWeight: "bold" }}
                    onClick={toggleAddressModal}
                  >
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
                {selectedAddressId && (
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
                    <div
                      className="CheckoutAddressLegendTextDiv"
                      onClick={tooglePaymentModal}
                    >
                      <h2 className="CheckoutAddressLegendText">Pay with</h2>
                    </div>
                  </div>
                  {onSelectedPaymentMethod ? (
                    <div className="PaymentMethodPayWithDiv">
                      <span className="CheckoutAddressLegendDebitCardImageDiv">
                        <img
                          src={onSelectedPaymentMethod.image}
                          alt={onSelectedPaymentMethod.title}
                          className="CheckoutAddressLegnedPayWithImage"
                        />
                      </span>
                      <span className="PaymentMethodGoogleTitle">
                        {onSelectedPaymentMethod.title}
                      </span>
                    </div>
                  ) : (
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
                  )}
                  <div>
                    <button className="PayWithKlarna">
                      <div className="PayWithKlarnaDiv">
                        <div>
                          <span className="PayWithKlarnaText1">
                            $15 off your first 2 orders when you pay with Klarna
                          </span>
                        </div>
                        <div className="PayWithKlarnaTexts">
                          <div>
                            <span className="PayWithKlarnaText2">
                              Apply code
                            </span>
                          </div>
                          <div>
                            <span className="PayWithKlarnaText3">
                              Terms Apply
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="PayWithKlarnaImageDiv">
                        <img
                          src={Klarna}
                          alt=""
                          className="PayWithKlarnaImage"
                        />
                      </div>
                    </button>
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
                {makeAGiftVisible && (
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
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
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
                          value={recipientNumber}
                          maxLength={10}
                          onChange={(e) => setRecipientNumber(e.target.value)}
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
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
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
                                  className={`MakeAGiftCardImage ${
                                    selectedImageId === id
                                      ? "SelectedImage"
                                      : ""
                                  }`}
                                  onClick={() => handleMakeAGiftImageClick(id)}
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
                        onClick={handleSaveMakeAItGift}
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
                {senderName &&
                  recipientName &&
                  recipientNumber &&
                  !makeAGiftVisible && (
                    <div className="RecipientDetailAndImage">
                      <div className="RecipientDetails">
                        <span>Recipient Name: {recipientName}</span>
                        <span>
                          Recipient Phone Number:{" "}
                          {selectedCountry && `${selectedCountry.value} `}{" "}
                          {recipientNumber}
                        </span>
                        <span>Sender Name: {senderName}</span>
                      </div>
                      <div>
                        <img
                          src={
                            GiftCardImage.find(
                              (card) => card.id === selectedImageId
                            )?.image
                          }
                          alt=""
                          className="MakeAGiftCardImage"
                        />
                      </div>
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
                        <SiInstacart size={26} />
                      </span>
                    </div>
                    <div className="CheckoutAddressLegendTextDiv">
                      <h2 className="CheckoutAddressLegendText">
                        Save $7 per order on average with Instacart+
                      </h2>
                    </div>
                  </div>
                </legend>
              </fieldset>
            </div>
            <div className="CheckoutContinueButtonDiv">
              <button
                className={`CheckoutContinueButton ${
                  onSelectedPaymentMethod === null
                    ? "disabledSaveButton"
                    : "SaveButton"
                }`}
                onClick={handleAddOrder}
              >
                Continue
              </button>
            </div>
          </div>
          <div>
            <div className="CheckoutContinueButtonOutsideDiv">
              <button
                className={`CheckoutContinueButton ${
                  onSelectedPaymentMethod === null
                    ? "disabledSaveButton"
                    : "SaveButton"
                }`}
                onClick={handleAddOrder}
              >
                Continue
              </button>
            </div>
            {allAddress && (
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
          isOpen={isAddressModalOpen}
          onClose={handleAddressCloseModal}
          onAddAddress={handleAddAddress}
          onUpdateAddress={handleUpdateAddress}
          isEdit={isEditAddress}
        />
      )}
      {isPaymentModalOpen && (
        <PaymentMethod
          onClose={handlePaymentCloseModal}
          onSelectedPaymentMethod={handleSelectedPaymentMethod}
        />
      )}
      <OrderPlaceAnimation width={400} height={400} isVisible={showAnimation} />
    </>
  );
};

export default Checkout;
