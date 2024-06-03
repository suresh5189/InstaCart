import React from "react";
import { FaShop } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";
import { FaListUl } from "react-icons/fa";
import DetailSideBarData from "../data/detailSidebarData";
import SafeWay from "../images/SafeWay.webp";

const DetailScreenSidebar = () => {
  return (
    <div className="SidebarHead">
      <div className="SideBarDetailButton">
        <span className="DetailSideBarLogo">
          <span>
            <img src={SafeWay} alt="SafeWay" />
          </span>
          <span className="DetailSideBarLogoText1">Lucky Supermarket</span>
          <span className="DetailSideBarLogoText2">In store prices</span>
          <span className="DetailSideBarLogoText3">
            100% satisfaction guarantee
          </span>
          <span className="DetailSideBarLogoText4">
            Add Lucky Rewards To Save
          </span>
        </span>
      </div>
      <div
        style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
      ></div>
      <div className="SideBarStore">
        <div className="SideBarStoreButton">
          <span className="SideBarStoreButtonText active">
            <FaShop size={24} />
            <span className="SideBarStoreButtonSpan">Shop</span>
          </span>
        </div>
        <div className="SideBarStoreButton">
          <span className="SideBarStoreButtonText">
            <TbReload size={20} />
            <span className="SideBarStoreButtonSpan">Buy it again</span>
          </span>
        </div>
        <div className="SideBarStoreButton">
          <span className="SideBarStoreButtonText">
            <FaListUl size={20} />
            <span className="SideBarStoreButtonSpan">Lists</span>
          </span>
        </div>
      </div>
      <div
        style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
      ></div>
      <div className="SideBarStore">
        <div className="SideBarDetailButton">
          {DetailSideBarData.map(({ id, listItem }) => {
            return (
              <div className="SideBarDetailButtonSpanHead">
                <span className="SideBarDetailButtonSpan" key={id}>
                  {listItem}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailScreenSidebar;
