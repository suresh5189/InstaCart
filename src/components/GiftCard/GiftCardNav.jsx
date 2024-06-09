import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import InstaCarLogo from "../../images/instacart.svg";

const GiftCardNav = () => {
  return (
    <nav>
      <div className="GiftNavbar">
        <div className="GiftNavbarHamburger">
          <GiHamburgerMenu size={20} />
        </div>
        <div className="GiftNavbarLogo">
          <img src={InstaCarLogo} alt="" />
        </div>
      </div>
    </nav>
  );
};

export default GiftCardNav;
