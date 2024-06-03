import React, { useState } from "react";
import StoreProductDetails from "../data/storeDetail";
import { FaPlus } from "react-icons/fa6";
import DetailScreenSidebar from "./DetailScreenSidebar";
import BookMark from "./BookMark";
import StoreItemDetail from "./StoreItemDetail";

const StoreDetailScreen = () => {
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState(true);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
            <DetailScreenSidebar />
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
                  <div
                    className="StoreContainer"
                    key={id}
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
                    <button className="StoreContainerCartButton">
                      <FaPlus size={16} />
                      <div></div>
                    </button>
                    <div className="StoreImage">
                      <img src={productImage} alt="" />
                    </div>
                    <div className="StoreContainerDetail">
                      <div className="StoreContainerPrice">
                        ${price}
                        <sup className="StoreContainerPriceSup">{supPrice}</sup>
                      </div>
                      <div className="StoreContainerProductDetail">
                        {productDetail}
                      </div>
                      <div className="StoreContainerButton">
                        <button>{button}</button>
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
