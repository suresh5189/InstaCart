import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { HiArrowUturnRight } from "react-icons/hi2";
import { BsExclamationCircle } from "react-icons/bs";
import { getStoreInsideDetails } from "../apiServices";

function StoreDetailsInfoPage({ isOpen, isClose, storeId }) {
  const [activeTab, setActiveTab] = useState("info");
  const [storeInsideDetail, setStoreInsideDetail] = useState([]);

  console.log(storeId);

  const infoRef = useRef(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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
        const repsonse = await getStoreInsideDetails(storeId);
        setStoreInsideDetail(repsonse.data);
        console.log(repsonse.data);
      } catch (error) {
        console.error("Error Fetching Store Inside Detail Data", error);
      }
    };
    getStoreDetails();
  }, []);

  return (
    <>
      {isOpen && (
        <>
          <div className="Overlay"></div>
          <div className="StoreDetailSecondContainer" ref={infoRef}>
            {storeInsideDetail.map((store) => (
              <div className="StoreDetailSecondContainer" key={store.store_id}>
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
                  <span
                    className={`StoreDetailSecondButtonInfo ${
                      activeTab === "info" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("info")}
                  >
                    Info
                  </span>
                  <span
                    className={`StoreDetailSecondButtonDelivery ${
                      activeTab === "delivery" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("delivery")}
                  >
                    Delivery times
                  </span>
                </div>
                <div
                  style={{
                    borderBottom: "1px solid lightGrey",
                    margin: "10px",
                  }}
                ></div>
                <div
                  className={`StoreDetailSecondReturnAndAbout ${
                    activeTab === "info" ? "fade-in" : ""
                  }`}
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
                </div>
                {store.delivery_time.delivery_timings == "not available" ? (
                  <div
                    className={`StoreDetailSecondDeliveryInfo ${
                      activeTab === "delivery" ? "fade-in" : "fade-out"
                    }`}
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
                  </div>
                ) : (
                  <div
                    className={`StoreDetailSecondDeliveryInfo ${
                      activeTab === "delivery" ? "fade-in" : "fade-out"
                    }`}
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
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default StoreDetailsInfoPage;
