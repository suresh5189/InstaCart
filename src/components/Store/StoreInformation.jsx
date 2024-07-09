import React, { useEffect, useRef, useState } from "react";
import '../css/StoreItemDetail.css'
import '../css/StoreDetailPage.css'
import '../css/StoreDetailScreen.css'
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineDollar } from "react-icons/ai";
import { HiArrowUturnRight } from "react-icons/hi2";
import { BsExclamationCircle } from "react-icons/bs";
import { getStoreInsideDetails } from "../../apiServices";

function StoreDetailsInfoPage({ isOpen, isClose, storeId }) {
  const [activeTab, setActiveTab] = useState("info");
  const [storeInsideDetail, setStoreInsideDetail] = useState([]);
  const infoRef = useRef(null);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleClickOutside = (event) => {
    if (infoRef.current && !infoRef.current.contains(event.target)) {
      isClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  });

  useEffect(() => {
    const getStoreDetails = async () => {
      try {
        const response = await getStoreInsideDetails(storeId);
        setStoreInsideDetail(response.data);
      } catch (error) {
        console.error("Error Fetching Store Inside Detail Data", error);
      }
    };
    getStoreDetails();
  }, [storeId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="Overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="StoreDetailSecondContainer"
            ref={infoRef}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
          >
            {storeInsideDetail.map((store) => (
              <div key={store.store_id}>
                <div className="StoreDetailSecondImageContainerDiv">
                  <div className="StoreDetailSecondImageContainer">
                    <img
                      src={store.logo}
                      alt=""
                      className="StoreDetailSecondImage"
                    />
                  </div>
                  <div className="StoreDetailSecondImageContainerTitle">
                    <span className="StoreDetailSecondImageContainerText">
                      {store.store_name}
                    </span>
                  </div>
                  <div className="StoreDetailSecondImageContainerSubTitle">
                    {store.store_categories.map((category, index) => (
                      <div key={index}>
                        <span className="StoreDetailSecondImageContainerSubText">
                          {category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    borderBottom: "1px solid lightGrey",
                    margin: "10px",
                  }}
                ></div>
                <div className="StoreDetailSecondButton">
                  <motion.span
                    className={`StoreDetailSecondButtonInfo ${
                      activeTab === "info" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("info")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Info
                  </motion.span>
                  <motion.span
                    className={`StoreDetailSecondButtonDelivery ${
                      activeTab === "delivery" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("delivery")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delivery times
                  </motion.span>
                </div>
                <div
                  style={{
                    borderBottom: "1px solid lightGrey",
                    margin: "10px",
                  }}
                ></div>
                <motion.div
                  className={`StoreDetailSecondReturnAndAbout ${
                    activeTab === "info" ? "fade-in" : ""
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="StoreDetailSecondPriceInfo">
                    <div className="StoreDetailSecondPrice">Pricing</div>
                    <div className="StoreDetailSecondPriceLogoAndDetail">
                      <span className="StoreDetailSecondIcon">
                        <AiOutlineDollar size={22} />
                      </span>
                      <span className="StoreDetailSecondDetail">
                        {store.pricing.store_pricing_type ||
                          "Everyday store prices"}
                      </span>
                    </div>
                  </div>
                  {store.return_policy.return_policy_title !== null && (
                    <div className="StoreDetailSecondReturn">
                      <hr
                        style={{
                          borderBottom: "1px solid lightGrey",
                          margin: "10px",
                        }}
                      ></hr>
                      <div className="StoreDetailSecondReturnInfo">
                        <span className="StoreDetailSecondReturnInfoText">
                          Return Info
                        </span>
                      </div>
                      <div className="StoreDetailSecondReturnIconAndText">
                        <div className="StoreDetailSecondReturnIcon">
                          <HiArrowUturnRight size={22} />
                        </div>
                        <div className="StoreDetailSecondReturnText">
                          <span className="StoreDetailSecondReturnTitleText">
                            {store.return_policy.return_policy_title}
                          </span>
                          <p className="StoreDetailSecondReturnSubTitleText">
                            {store.return_policy.description}
                            <span className="StoreDetailSecondReturnSpan">
                              Return Policy
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {store.about.description !== null && (
                    <>
                      <hr
                        style={{
                          borderBottom: "1px solid lightGrey",
                          margin: "10px",
                        }}
                      ></hr>
                      <div className="StoreDetailAbout">
                        <div className="StoreDetailAboutTitle">
                          <span className="StoreDetailAboutTitleText">
                            About
                          </span>
                        </div>
                        <div className="StoreDetailAboutIconAndText">
                          <span className="StoreDetailAboutIcon">
                            <BsExclamationCircle size={22} />
                          </span>
                          <span className="StoreDetailAboutText">
                            {store.about.description}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  {store.hours !== "not available" && (
                    <div className="StoreDetailSecondInfoTime">
                      <hr
                        style={{
                          borderBottom: "1px solid lightGrey",
                          margin: "10px",
                        }}
                      ></hr>
                      <div className="StoreDetailSecondInfoTimeHour">
                        <span className="StoreDetailSecondInfoTimeHourText">
                          Hours
                        </span>
                      </div>
                      {Object.entries(store.hours).map(
                        ([day, hours], index) => (
                          <div
                            className="StoreDetailSecondInfoTimeDayHour"
                            key={index}
                          >
                            <span className="StoreDetailSecondInfoDay">
                              {day}
                            </span>
                            <span className="StoreDetailSecondInfoHour">
                              {hours}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </motion.div>
                {store.delivery_time.delivery_timings === "not available" ? (
                  <motion.div
                    className={`StoreDetailSecondDeliveryInfo ${
                      activeTab === "delivery" ? "fade-in" : "fade-out"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "30px",
                        marginTop: "20px",
                      }}
                    >
                      No Delivery Time Found
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    className={`StoreDetailSecondDeliveryInfo ${
                      activeTab === "delivery" ? "fade-in" : "fade-out"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {store.delivery_time.delivery_timings.map(
                      (deliveryTiming, index) => (
                        <div key={index}>
                          <div className="StoreDetailSecondDeliveryTitle">
                            <div>
                              <li className="StoreDetailSecondDeliveryTitleText">
                                {deliveryTiming.day}
                              </li>
                            </div>
                          </div>
                          <div className="StoreDetailSecondDeliverySubTitle">
                            {deliveryTiming.slots.map((slot, index) => (
                              <div
                                key={index}
                                className="StoreDetailSecondDeliveryTimeSlot"
                              >
                                <li className="StoreDetailSecondDeliveryTime">
                                  {slot.time_slot}
                                </li>
                                <span className="StoreDetailSecondDeliveryPrice">
                                  ${slot.price}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default StoreDetailsInfoPage;
