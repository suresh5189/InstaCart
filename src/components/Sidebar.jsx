import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import InstaCartLogo from "../images/instacart.svg";
import { CiLogin } from "react-icons/ci";
import { GoHomeFill } from "react-icons/go";
import { MdOutlineSettings } from "react-icons/md";
import { TbSettingsPlus } from "react-icons/tb";
import { FaGift } from "react-icons/fa6";
import { IoPricetag } from "react-icons/io5";
import { MdHelpCenter } from "react-icons/md";
import { LuLightbulb } from "react-icons/lu";
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { IoToggle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import UserImage from "../images/userImage.webp";
import { useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import { FaFirstOrderAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

const Sidebar = ({
  closeSidebar,
  isOpen,
  isLoggedIn,
  handleLogout,
  onLoginClick,
  onSignUpClick,
}) => {
  const useSidebarRef = useRef(null);

  const userDetails = useSelector((state) => state.user.userDetails);
  // console.log(userDetails);

  const handleClickOutside = (event) => {
    if (
      useSidebarRef.current &&
      !useSidebarRef.current.contains(event.target)
    ) {
      closeSidebar();
    }
  };

  const navigate = useNavigate();

  const handleOpenAccount = () => {
    navigate("/store/userinformation/account");
    closeSidebar();
  };
  const handleOpenOrder = () => {
    navigate("/store/orders");
    closeSidebar();
  };

  const handleInstaCartPlus = () => {
    window.open("/store/account/instacart-plus", "_blank");
  };

  const handleBuyGifts = () => {
    window.open("/p/gift-cards", "_blank");
  };

  const handlePromo = () => {
    navigate("/store/account/manage_promos");
    closeSidebar();
  };

  const onLogin = () => {
    onLoginClick();
    closeSidebar();
  }

  const onSignUp = () => {
    onSignUpClick();
    closeSidebar();
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <>
      <div className="Overlay"></div>
      <div className="Sidebar" ref={useSidebarRef}>
        <div className="LogoAndImage">
          <div className="CloseIconSidebar" onClick={closeSidebar}>
            <IoClose size={24} className="CloseIconSide" />
          </div>
          <img src={InstaCartLogo} alt="instacartLogo" className="logo" />
        </div>
        <div className="SidebarHead">
          {!isLoggedIn ? (
            <div>
              <div className="SideBarSignUpButton" onClick={onSignUp}>
                <span className="SideBarSignUpButtonText">
                  <span>Sign up</span>
                </span>
              </div>
              <div
                className="SideBarLoginButton"
                style={{ marginTop: "20px" }}
                onClick={onLogin}
              >
                <span className="SideBarLoginButtonText">
                  <span>
                    <CiLogin size={22} className="SideBarLoginIcon" />
                  </span>
                  <span>Log in</span>
                </span>
              </div>
              <div
                style={{
                  borderBottom: "1px solid lightGrey",
                  margin: "30px 10px",
                }}
              ></div>
              <div className="SideBarNew">
                <div className="SideBarNewSpan">
                  <span className="SideBarNewSpanText">Departments</span>
                  <span className="SideBarNewSpanIcon">
                    <IoIosArrowForward size={12} />
                  </span>
                </div>
                <div className="SideBarNewSpan">
                  <span className="SideBarNewSpanText">More ways to shop</span>
                  <span className="SideBarNewSpanIcon">
                    <IoIosArrowForward size={12} />
                  </span>
                </div>
                <div className="SideBarNewSpan">
                  <span className="SideBarNewSpanText">Help</span>
                  <span className="SideBarNewSpanIcon">
                    <IoIosArrowForward size={12} />
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="SideBarUserAndName">
                <div className="SideBarUserName">
                  {userDetails.firstName} {userDetails.lastName}
                </div>
                <div className="SideBarUserImage">
                  <img src={UserImage} alt="" />
                </div>
              </div>
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
              ></div>
              <div className="SideBarStore">
                <div className="SideBarStoreButton">
                  <span className="SideBarStoreButtonText active">
                    <GoHomeFill size={24} />
                    <span className="SideBarStoreButtonSpan">Stores</span>
                  </span>
                </div>
                <div className="SideBarStoreButton">
                  <span className="SideBarStoreButtonText">
                    <FaFirstOrderAlt size={20} />
                    <span
                      className="SideBarStoreButtonSpan"
                      onClick={handleOpenOrder}
                    >
                      Your Orders
                    </span>
                  </span>
                </div>
                <div className="SideBarStoreButton">
                  <span className="SideBarStoreButtonText">
                    <MdOutlineSettings size={20} />
                    <span
                      className="SideBarStoreButtonSpan"
                      onClick={handleOpenAccount}
                    >
                      Your account settings
                    </span>
                  </span>
                </div>
                <div
                  className="SideBarStoreButton"
                  onClick={handleInstaCartPlus}
                >
                  <span className="SideBarStoreButtonText">
                    <TbSettingsPlus size={20} />
                    <span className="SideBarStoreButtonSpan">
                      Try Instcart+
                    </span>
                  </span>
                </div>
              </div>
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
              ></div>
              <div className="SideBarStore">
                <div className="SideBarStoreButton">
                  <span className="SideBarStoreButtonSpan">
                    Credit and promos
                  </span>
                </div>
                <div className="SideBarStoreButton">
                  <span className="SideBarStoreButtonText">
                    <FaGift size={20} />
                    <span
                      className="SideBarStoreButtonSpan"
                      onClick={handleBuyGifts}
                    >
                      Buy gifts cards
                    </span>
                  </span>
                </div>
                <div className="SideBarStoreButton" onClick={handlePromo}>
                  <span className="SideBarStoreButtonText">
                    <IoPricetag size={20} />
                    <span className="SideBarStoreButtonSpan">
                      Credits, promos, and gift cards
                    </span>
                  </span>
                </div>
              </div>
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
              ></div>
              <div className="SideBarStore">
                <div className="SideBarStoreButton">
                  <span className="SideBarStoreButtonSpan">Support</span>
                </div>
                <div className="SideBarStoreButton">
                  <span className="SideBarStoreButtonText">
                    <MdHelpCenter size={20} />
                    <span className="SideBarStoreButtonSpan">Help Center</span>
                  </span>
                </div>
                <div className="SideBarStoreButton">
                  <span className="SideBarStoreButtonText">
                    <LuLightbulb size={20} />
                    <span className="SideBarStoreButtonSpan">
                      How Instacart works
                    </span>
                  </span>
                </div>
              </div>
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
              ></div>
              <div className="SideBarStore">
                <div className="SideBarStoreButton">
                  <span className="SideBarStoreButtonSpan">Our Apps</span>
                </div>
                <div className="SideBarStoreButton">
                  <span className="SideBarStoreButtonText">
                    <FaApple size={20} />
                    <span className="SideBarStoreButtonSpan">App Store</span>
                  </span>
                </div>
                <div className="SideBarStoreButton">
                  <span className="SideBarStoreButtonText">
                    <FaGooglePlay size={20} />
                    <span className="SideBarStoreButtonSpan">Google Play</span>
                  </span>
                </div>
              </div>
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
              ></div>
              <div className="SideBarStore">
                <div className="SideBarStoreButton">
                  <span className="SideBarStoreButtonSpan">Accessibility</span>
                </div>
                <div className="SideBarStoreButton">
                  <span className="SideBarStoreButtonText">
                    <span className="SideBarStoreButtonSpan">
                      Enable high contrast colors
                    </span>
                    <IoToggle size={24} />
                  </span>
                </div>
              </div>
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
              ></div>
              <div className="SideBarStore">
                <div className="SideBarStoreButton">
                  <div className="SideBarButtonAllList">
                    <div className="SideBarButtonList">
                      <li className="SideBarButtonLi">Press</li>
                    </div>
                    <div className="SideBarButtonList">
                      <li className="SideBarButtonLi">Jobs</li>
                    </div>
                    <div className="SideBarButtonList">
                      <li className="SideBarButtonLi">Terms</li>
                    </div>
                    <div className="SideBarButtonList">
                      <li className="SideBarButtonLi">Privacy</li>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
              ></div>
              <div className="SideBarStoreButton" onClick={handleLogout}>
                <span className="SideBarStoreButtonText">
                  <CiLogout size={20} />
                  <span className="SideBarStoreButtonSpan">Logout</span>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
