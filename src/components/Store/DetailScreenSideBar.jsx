import React, { useEffect, useState } from "react";
import { FaShop } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";
import { FaListUl } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
// import DetailSideBarData from "../../data/detailSidebarData";
import StoreDetailsInfoPage from "./StoreInformation";
import { getStoreFrontDetails } from "../../apiServices";
import { useNavigate } from "react-router-dom";

const DetailScreenSidebar = ({
  storeId,
  image,
  title,
  handleCategoryClick,
}) => {
  const [openDetailInfoModal, setOpenDetailInfoModal] = useState(false);
  const [storeFrontItems, setStoreFrontItems] = useState([]);

  const navigate = useNavigate();

  const handleNavigatefavorite = () => {
    navigate("/favorites");
  };

  const handleOpenDetailInfoModal = () => {
    setOpenDetailInfoModal(true);
  };

  const handleCloseDetailInfoModal = () => {
    setOpenDetailInfoModal(false);
  };

  useEffect(() => {
    const fetchStoreFrontDetails = async () => {
      try {
        const response = await getStoreFrontDetails(storeId);
        setStoreFrontItems(response.data[0].categories || []);
        // console.log(response);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching store front details:", error);
        setStoreFrontItems([]);
      }
    };

    fetchStoreFrontDetails();
  }, [storeId]);

  // console.log(storeFrontItems)

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
          <div className="SideBarStoreButton" onClick={handleNavigatefavorite}>
            <span className="SideBarStoreButtonText">
              <MdFavorite size={20} />
              <span className="SideBarStoreButtonSpan">Favorite</span>
            </span>
          </div>
        </div>
        <div
          style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
        ></div>
        <div className="SideBarStore">
          <div className="SideBarDetailButton">
            {storeFrontItems.length === 0 ? (
              <div className="NoCategoriesMessage">No categories available</div>
            ) : (
              storeFrontItems.map((category) => (
                <div
                  className="SideBarDetailButtonSpanHead"
                  key={category.category_id}
                  onClick={() => handleCategoryClick(category.category_name)}
                >
                  <span className="SideBarDetailButtonSpan">
                    {category.category_name}
                  </span>
                </div>
              ))
            )}
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
