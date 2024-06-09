import React, { useEffect, useRef, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { MdKeyboardArrowDown } from "react-icons/md";

const StoreItemDetail = ({ item, handleClose, handleOpen }) => {
  const [count, setCount] = useState(1);
  const useItemRef = useRef(null);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const handleClickOutside = (event) => {
    if (useItemRef.current && !useItemRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (handleOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  },);

  return (
    <>
      <div className="Overlay"></div>
      <div className="StoreItemDetailHead" ref={useItemRef}>
        <div className="StoreItemDetailClose" onClick={handleClose}>
          <span className="StoreItemDetailCloseIcon">
            <GoArrowLeft size={20} />
          </span>
          <span className="StoreItemDetailCloseBack">Back</span>
        </div>
        <div className="StoreItemDetail">
          <div className="StoreItemDetailImage">
            <img src={item.image} alt={item.productDetail} />
          </div>
          <div className="StoreItemDetailHeading">
            <div className="StoreItemDetailText1">{item.title}</div>
            <div className="StoreItemDetailText11">{item.label}</div>
            <div
              style={{ borderBottom: "1px solid lightGrey", marginTop: "20px" }}
            ></div>
            <div className="StoreItemDetailDetail">
              <div className="StoreItemDetailText2">Details</div>
              <div className="StoreItemDetailText2">
                <MdKeyboardArrowDown />
              </div>
            </div>
            <div style={{ borderBottom: "1px solid lightGrey" }}></div>
          </div>
          <div className="StoreItemDetailButtonContainer">
            <div className="StoreItemDetailButtonContainerText">
              $ {item.actual_price}
            </div>
            <div className="StoreItemDetailButtonContainerItemCount">
              <button className="IncreaseDecreaseButton" onClick={decrement}>
                -
              </button>
              <input
                className="InputIncreaseDecreaseButtonValue"
                type="text"
                value={count}
                disabled
              />
              <button className="IncreaseDecreaseButton" onClick={increment}>
                +
              </button>
            </div>
            <div className="StoreItemDetailButtonContainerCart">
              Add To Cart
            </div>
            <div className="StoreItemDetailIconItems">
              <div className="StoreItemDetailIcon">
                <span className="StoreItemDetailIconSave">
                  <IoMdHeartEmpty size={20} />
                </span>
                <span className="StoreItemDetailIconSaveText">Save</span>
              </div>
              <div className="StoreItemDetailIcon">
                <span className="StoreItemDetailIconSave">
                  <FaList size={20} />
                </span>
                <span className="StoreItemDetailIconSaveText">Add To List</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreItemDetail;
