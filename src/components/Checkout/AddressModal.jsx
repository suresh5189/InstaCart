import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import map from "../../images/InstacartPlus.webp";

const AddressModal = ({ onClose, onAddressSave, initialAddress }) => {
  const [streetAddress, setStreetAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    if (initialAddress) {
      setStreetAddress(initialAddress.streetAddress);
      setZipCode(initialAddress.zipCode);
    }
  }, [initialAddress]);

  useEffect(() => {
    setIsSaveDisabled(!streetAddress || !zipCode);
  }, [streetAddress, zipCode]);

  const handleSaveAddress = () => {
    if (onAddressSave) {
      onAddressSave({
        streetAddress,
        zipCode,
      });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("Overlay")) {
      onClose();
    }
  };

  const handleZipCodeChange = (e) => {
    const formattedZipCode = e.target.value.replace(/\D/g, "");
    setZipCode(formattedZipCode);
  };

  return (
    <>
      <div className="Overlay" onClick={handleOverlayClick}></div>
      <div className="AddressDiv">
        <div className="AddressHeader">
          <span className="AddressHeaderIcon">
            <IoMdClose size={20} onClick={onClose} />
          </span>
          <span className="AddressHeaderTitle">Choose Address</span>
        </div>
        <div className="AddressMapDiv">
          <img src={map} alt="" style={{ width: "350px" }} />
        </div>
        <div className="AddressInputAndButtonDiv">
          <input
            type="text"
            className="AddressInput"
            placeholder="Street Address"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
          <input
            type="tel"
            className="AddressInput"
            placeholder="Zip Code"
            value={zipCode}
            onChange={handleZipCodeChange}
          />
          <div className="AddressButtonDiv">
            <button
              className={`AddressButton ${
                isSaveDisabled ? "disabledSaveButton" : "SaveButton"
              }`}
              onClick={handleSaveAddress}
              disabled={isSaveDisabled}
            >
              Save Address
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressModal;
