import React, { useState } from "react";
import StoreProductDetails from "../data/storeDetail";
import { FaPlus } from "react-icons/fa6";
import DetailScreenSidebar from "./DetailScreenSideBar";
import BookMark from "./BookMark";
import StoreItemDetail from "./StoreItemDetail";
import { useLocation } from "react-router-dom";

const StoreDetailScreen = () => {
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState(true);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const location = useLocation();
  const { image, title } = location.state;

  const handleCloseBookmarkModal = () => {
    setBookmarkModalOpen(false);
  };

  const handleOpenDetailModal = (item) => {
    setSelectedItem(item);
    setItemModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedItem(null);
    setItemModalOpen(false);
  };

  return (
    <>
      <div className="StoreDetail">
        <div className="StoreDetailSideBar">
          <div className="DetailScreenSidebar">
            <DetailScreenSidebar image={image} title={title} />
          </div>
        </div>
        <div className="StoreDetailHead">
          <div className="StoreHeading">Snacks</div> 
          <div className="StoreContainerHead">
            {StoreProductDetails.map(
              ({
                id,
                productImage,
                price,
                supPrice,
                productDetail,
                button,
              }) => {
                return (
                  <div className="StoreContainer" key={id}>
                    <button
                      className="StoreContainerCartButton"
                      onMouseEnter={() => setHoveredId(id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <FaPlus size={16} />
                      <div>{hoveredId === id ? "Add To Cart" : "Add"}</div>
                    </button>
                    <div
                      className="StoreImageAndDetailContainer"
                      onClick={() =>
                        handleOpenDetailModal({
                          productImage,
                          price,
                          supPrice,
                          productDetail,
                          button,
                        })
                      }
                    >
                      <div className="StoreImage">
                        <img src={productImage} alt="" />
                      </div>
                      <div className="StoreContainerDetail">
                        <div className="StoreContainerPrice">
                          ${price}
                          <sup className="StoreContainerPriceSup">
                            {supPrice}
                          </sup>
                        </div>
                        <div className="StoreContainerProductDetail">
                          {productDetail}
                        </div>
                        <div className="StoreContainerButton">
                          <button>{button}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <div>
            {bookmarkModalOpen && (
              <BookMark
                handleClose={handleCloseBookmarkModal}
                handleOpen={handleOpenDetailModal}
              />
            )}
          </div>
        </div>
      </div>
      {selectedItem && (
        <StoreItemDetail
          item={selectedItem}
          handleClose={handleCloseDetailModal}
          handleOpen={itemModalOpen}
        />
      )}
    </>
  );
};

export default StoreDetailScreen;
