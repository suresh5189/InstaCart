import React, { useEffect, useState } from "react";
import '../../components/css/AddressModal.css'
import { IoMdClose } from "react-icons/io";
import map from "../../images/InstacartPlus.webp";
import { addAddress } from "../../apiServices";

const AddressModal = ({
  onClose,
  onAddAddress,
  onUpdateAddress,
  isEdit,
  initialAddress,
}) => {
  const [streetAddress, setStreetAddress] = useState("");
  const [floorAddress, setFloorAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    if (initialAddress) {
      setStreetAddress(initialAddress.street || "");
      setFloorAddress(initialAddress.floor || "");
      setZipCode(initialAddress.zip_code || "");
    }
  }, [initialAddress]);

  // console.log(isEdit);

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

  const handleSaveAddress = async () => {
    if (isEdit) {
      onUpdateAddress({
        street: streetAddress,
        floor: floorAddress,
        zip_code: zipCode,
      });
    } else {
      try {
        const newAddress = {
          street: streetAddress,
          floor: floorAddress,
          zip_code: zipCode,
          business_name: null,
          latitude: null || 0,
          longitude: null || 0,
        };
        const refreshToken = localStorage.getItem("RefreshToken");
        const result = await addAddress(refreshToken, newAddress);
        if (result) {
          onAddAddress(result.data);
          const addressObject = {
            street: result.data.street,
            floor: result.data.floor,
            zip_code: result.data.zip_code,
          };
          localStorage.setItem(
            "DeliveryAddress",
            JSON.stringify(addressObject)
          );
          // console.log("Address added successfully:", result);
        }
        onClose();
      } catch (error) {
        console.error("Error adding address:", error);
      }
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
          <span className="AddressHeaderTitle">
            {isEdit ? "Edit Address" : "Add Address"}
          </span>
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
              onClick={handleSaveAddress}
              disabled={isSaveDisabled}
            >
              {isEdit ? "Update Address" : "Save Address"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressModal;
