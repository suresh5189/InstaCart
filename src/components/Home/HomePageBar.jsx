import React, { useState } from "react";
import '../../components/css/HomePageBar.css'
import Banner from "../../images/banner.webp";
import { GiIndianPalace } from "react-icons/gi";
import { MdKeyboardArrowDown } from "react-icons/md";

function HomePageBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="HomePageBar">
      <div className="HomePageBarDiv">
        <div className="ImageBannerAndDrop">
          <div className="dropdown">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="dropDownButton"
            >
              <GiIndianPalace size={30} />
              <MdKeyboardArrowDown size={20} />
            </button>
            {isOpen && (
              <div className="dropDownButtonList">
                <span>India</span>
                <span>USA</span>
              </div>
            )}
          </div>
        </div>
        <div className="HomePageBarText">
          <h1 className="HomePageBarTextH1">
            Order groceries for delivery or pickup today
          </h1>
          <p className="HomePageBarTextP">
            Whatever you want from local stores, brought right to your door.
          </p>
        </div>
        <div>
          <img src={Banner} alt="" className="ImageBanner" />
        </div>
      </div>
    </div>
  );
}

export default HomePageBar;
