import React from "react";
import StoreProductDetails from "../data/storeDetail";
import { FaPlus } from "react-icons/fa6";
import DetailScreenSidebar from "./DetailScreenSidebar";
import BookMark from "./BookMark";

const StoreDetailScreen = () => {
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
            ({ id, productImage, price, supPrice, productDetail, button }) => {
              return (
                <div className="StoreContainer" key={id}>
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
      <BookMark />
    </div>
      </div>
    </div>
    </>
  );
};

export default StoreDetailScreen;
