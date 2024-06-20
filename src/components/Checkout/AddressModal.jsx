import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import map from "../../images/InstacartPlus.webp";
import { addAddress } from "../../apiServices";

const AddressModal = ({ onClose, onAddressSave, initialAddress }) => {
  const [streetAddress, setStreetAddress] = useState("");
  const [floorAddress, setFloorAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    if (initialAddress) {
      setStreetAddress(initialAddress.streetAddress);
      setFloorAddress(initialAddress.floorAddress);
      setZipCode(initialAddress.zipCode);
    }
  }, [initialAddress]);

  useEffect(() => {
    setIsSaveDisabled(!streetAddress || !floorAddress || !zipCode);
  }, [streetAddress, floorAddress, zipCode]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("Overlay")) {
      onClose();
    }
  };

  const handleZipCodeChange = (e) => {
    const formattedZipCode = e.target.value.replace(/\D/g, "");
    setZipCode(formattedZipCode);
  };

  const addNewAddress = async () => {
    try {
      const refreshToken = localStorage.getItem("RefreshToken");
      const result = await addAddress(refreshToken, {
        street: streetAddress,
        floor: floorAddress,
        business_name: null,
        zip_code: zipCode,
        latitude: null,
        longitude: null,
      });
      console.log("Address added successfully:", result);
      onAddressSave({
        street: streetAddress,
        floor: floorAddress,
        zip_code: zipCode,
      });
    } catch (error) {
      console.error("Error adding address:", error);
    }
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
            type="text"
            className="AddressInput"
            placeholder="Floor Address"
            value={floorAddress}
            onChange={(e) => setFloorAddress(e.target.value)}
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
              onClick={addNewAddress}
              disabled={isSaveDisabled}
            >
              Save Address
            </button>
          </div>
        </div>
        <div>
          <span style={{ color: "red" }}>Delete Address</span>
        </div>
      </div>
    </>
  );
};

export default AddressModal;
