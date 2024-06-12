import React, { useEffect, useRef, useState } from "react";
import { FaShop } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";
import { FaListUl } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import DetailSideBarData from "../data/detailSidebarData";
import StoreDetailsInfoPage from "./StoreDetailsInfoPage";

const DetailScreenSidebar = ({ storeId, image, title }) => {
  const [openDetailInfoModal, setOpenDetailInfoModal] = useState(false);

  const handleOpenDetailInfoModal = () => {
    setOpenDetailInfoModal(true);
    // history.push(`/store/${storeId}/info`);
  };

  const handleCloseDetailInfoModal = () => {
    setOpenDetailInfoModal(false);
  };

  return (
    <>
      <div className="SidebarHead">
        <div className="SideBarDetailButton">
          <span className="DetailSideBarLogo">
            <span className="DetailSideBarImage">
              <img src={image} alt={title} />
            </span>
            <span className="DetailSideBarLogoText1">{title}</span>
            <span
              className="DetailSideBarLogoText2"
              onClick={handleOpenDetailInfoModal}
            >
              In store prices <MdKeyboardArrowRight size={18} />
            </span>
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
                <div className="SideBarDetailButtonSpanHead" key={id}>
                  <span className="SideBarDetailButtonSpan">{listItem}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {openDetailInfoModal && (
        <StoreDetailsInfoPage
          isOpen={handleOpenDetailInfoModal}
          isClose={handleCloseDetailInfoModal}
          storeId={storeId}
        />
      )}
    </>
  );
};

export default DetailScreenSidebar;
