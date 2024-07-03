import React from "react";
import InstaCarLogo from "../../images/instacart.svg";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const GiftCardNav = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
    window.close();
  };

  return (
    <nav>
      <div className="GiftNavbar" onClick={handleBack}>
        <div className="GiftNavbarHamburger">
          <IoArrowBack size={20} />
        </div>
        <div className="GiftNavbarLogo">
          <img src={InstaCarLogo} alt="" />
        </div>
      </div>
    </nav>
  );
};

export default GiftCardNav;
