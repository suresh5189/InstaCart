import React, { useEffect, useRef } from "react";
import '../components/css/Sidebar.css';
import { motion } from "framer-motion";
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
  };

  const onSignUp = () => {
    onSignUpClick();
    closeSidebar();
  };

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
      <motion.div
        className="Sidebar"
        ref={useSidebarRef}
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 100, duration: 0.3 }}
      >
        <div className="LogoAndImage">
          <motion.div
            className="CloseIconSidebar"
            onClick={closeSidebar}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <IoClose size={24} className="CloseIconSide" />
          </motion.div>
          <img src={InstaCartLogo} alt="instacartLogo" className="logo" />
        </div>
        <div className="SidebarHead">
          {!isLoggedIn ? (
            <div>
              <motion.div
                className="SideBarSignUpButton"
                onClick={onSignUp}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
              >
                <span className="SideBarSignUpButtonText">
                  <span>Sign up</span>
                </span>
              </motion.div>
              <motion.div
                className="SideBarLoginButton"
                style={{ marginTop: "20px" }}
                onClick={onLogin}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
              >
                <span className="SideBarLoginButtonText">
                  <span>
                    <CiLogin size={22} className="SideBarLoginIcon" />
                  </span>
                  <span>Log in</span>
                </span>
              </motion.div>
              <div
                style={{
                  borderBottom: "1px solid lightGrey",
                  margin: "30px 10px",
                }}
              ></div>
              <motion.div
                className="SideBarNew"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
              >
                <motion.div
                  className="SideBarNewSpan"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.4 } }}
                >
                  <span className="SideBarNewSpanText">Departments</span>
                  <IoIosArrowForward size={12} className="SideBarNewSpanIcon" />
                </motion.div>
                <motion.div
                  className="SideBarNewSpan"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
                >
                  <span className="SideBarNewSpanText">More ways to shop</span>
                  <IoIosArrowForward size={12} className="SideBarNewSpanIcon" />
                </motion.div>
                <motion.div
                  className="SideBarNewSpan"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.6 } }}
                >
                  <span className="SideBarNewSpanText">Help</span>
                  <IoIosArrowForward size={12} className="SideBarNewSpanIcon" />
                </motion.div>
              </motion.div>
            </div>
          ) : (
            <>
              <motion.div
                className="SideBarUserAndName"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="SideBarUserName">
                  {userDetails.firstName} {userDetails.lastName}
                </div>
                <div className="SideBarUserImage">
                  <img src={UserImage} alt="" />
                </div>
              </motion.div>
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
              ></div>
              <motion.div
                className="SideBarStore"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
              >
                <motion.div
                  className="SideBarStoreButton"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.4 } }}
                >
                  <span className="SideBarStoreButtonText active">
                    <GoHomeFill size={24} />
                    <span className="SideBarStoreButtonSpan">Stores</span>
                  </span>
                </motion.div>
                <motion.div
                  className="SideBarStoreButton"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
                >
                  <span className="SideBarStoreButtonText">
                    <FaFirstOrderAlt size={20} />
                    <span
                      className="SideBarStoreButtonSpan"
                      onClick={handleOpenOrder}
                    >
                      Your Orders
                    </span>
                  </span>
                </motion.div>
                <motion.div
                  className="SideBarStoreButton"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.6 } }}
                >
                  <span className="SideBarStoreButtonText">
                    <MdOutlineSettings size={20} />
                    <span
                      className="SideBarStoreButtonSpan"
                      onClick={handleOpenAccount}
                    >
                      Your account settings
                    </span>
                  </span>
                </motion.div>
                <motion.div
                  className="SideBarStoreButton"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.7 } }}
                  onClick={handleInstaCartPlus}
                >
                  <span className="SideBarStoreButtonText">
                    <TbSettingsPlus size={20} />
                    <span className="SideBarStoreButtonSpan">
                      Try Instcart+
                    </span>
                  </span>
                </motion.div>
              </motion.div>
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
              ></div>
              <motion.div
                className="SideBarStore"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4 } }}
              >
                <motion.div
                  className="SideBarStoreButton"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
                >
                  <span className="SideBarStoreButtonSpan">
                    Credit and promos
                  </span>
                </motion.div>
                <motion.div
                  className="SideBarStoreButton"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.6 } }}
                >
                  <span className="SideBarStoreButtonText">
                    <FaGift size={20} />
                    <span
                      className="SideBarStoreButtonSpan"
                      onClick={handleBuyGifts}
                    >
                      Buy gifts cards
                    </span>
                  </span>
                </motion.div>
                <motion.div
                  className="SideBarStoreButton"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.7 } }}
                  onClick={handlePromo}
                >
                  <span className="SideBarStoreButtonText">
                    <IoPricetag size={20} />
                    <span className="SideBarStoreButtonSpan">
                      Credits, promos, and gift cards
                    </span>
                  </span>
                </motion.div>
              </motion.div>
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
              ></div>
              <motion.div
                className="SideBarStore"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5 } }}
              >
                <motion.div
                  className="SideBarStoreButton"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.6 } }}
                >
                  <span className="SideBarStoreButtonSpan">Support</span>
                </motion.div>
                <motion.div
                  className="SideBarStoreButton"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.7 } }}
                >
                  <span className="SideBarStoreButtonText">
                    <MdHelpCenter size={20} />
                    <span className="SideBarStoreButtonSpan">Help Center</span>
                  </span>
                </motion.div>
                <motion.div
                  className="SideBarStoreButton"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.8 } }}
                >
                  <span className="SideBarStoreButtonText">
                    <LuLightbulb size={20} />
                    <span className="SideBarStoreButtonSpan">
                      How Instacart works
                    </span>
                  </span>
                </motion.div>
              </motion.div>
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
              ></div>
              <motion.div
                className="SideBarStore"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.6 } }}
              >
                <motion.div
                  className="SideBarStoreButton"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.7 } }}
                >
                  <span className="SideBarStoreButtonSpan">Our Apps</span>
                </motion.div>
                <motion.div
                  className="SideBarStoreButton"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.8 } }}
                >
                  <span className="SideBarStoreButtonText">
                    <FaApple size={20} />
                    <span className="SideBarStoreButtonSpan">App Store</span>
                  </span>
                </motion.div>
                <motion.div
                  className="SideBarStoreButton"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.9 } }}
                >
                  <span className="SideBarStoreButtonText">
                    <FaGooglePlay size={20} />
                    <span className="SideBarStoreButtonSpan">Google Play</span>
                  </span>
                </motion.div>
              </motion.div>
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
              ></div>
              <motion.div
                className="SideBarStore"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.7 } }}
              >
                <motion.div
                  className="SideBarStoreButton"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.8 } }}
                >
                  <span className="SideBarStoreButtonSpan">Accessibility</span>
                </motion.div>
                <motion.div
                  className="SideBarStoreButton"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.9 } }}
                >
                  <span className="SideBarStoreButtonText">
                    <span className="SideBarStoreButtonSpan">
                      Enable high contrast colors
                    </span>
                    <IoToggle size={24} />
                  </span>
                </motion.div>
              </motion.div>
              <div
                style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
              ></div>
              <motion.div
                className="SideBarStoreButton"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1.0 } }}
              >
                <span className="SideBarStoreButtonText">
                  <CiLogout size={20} />
                  <span className="SideBarStoreButtonSpan">Logout</span>
                </span>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
