import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import DetailScreenSidebar from "./DetailScreenSideBar";
import BookMark from "./BookMark";
import StoreItemDetail from "./StoreItemDetail";
import { useLocation, useParams } from "react-router-dom";
import { storeDetailData } from "../apiServices";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/action/userActions";

const StoreDetailScreen = () => {
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState(true);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [productByCategory, setProductByCategory] = useState({});

  const { storeId } = useParams();

  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const location = useLocation();
  const { store_id, image, title } = location.state;

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

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await storeDetailData(storeId);
        setProductByCategory(response);
      } catch (error) {
        console.error("Error Fetching Store Detail Data", error);
      }
    };
    fetchStoreData();
  }, [storeId]);

  return (
    <>
      <div className="StoreDetail">
        <div className="StoreDetailSideBar">
          <div className="DetailScreenSidebar">
            <DetailScreenSidebar
              storeId={store_id}
              image={image}
              title={title}
            />
          </div>
        </div>
        <div>
          {Object.entries(productByCategory).map(
            ([category, product]) =>
              product.length > 0 && (
                <div className="StoreDetailHead" key={category}>
                  <div className="StoreHeading">{category}</div>
                  <div className="StoreContainerHead">
                    {product.map(
                      ({
                        id,
                        title,
                        image,
                        label,
                        actual_price,
                        selling_price,
                      }) => {
                        return (
                          <div className="StoreContainer" key={id}>
                            <button
                              className="StoreContainerCartButton"
                              onMouseEnter={() => setHoveredId(id)}
                              onMouseLeave={() => setHoveredId(null)}
                              onClick={() =>
                                handleAddToCart({
                                  id,
                                  title,
                                  image,
                                  label,
                                  actual_price,
                                  selling_price,
                                })
                              }
                            >
                              <FaPlus size={16} />
                              <div>
                                {hoveredId === id ? "Add To Cart" : "Add"}
                              </div>
                            </button>
                            <div
                              className="StoreImageAndDetailContainer"
                              onClick={() =>
                                handleOpenDetailModal({
                                  id,
                                  title,
                                  image,
                                  label,
                                  actual_price,
                                  selling_price,
                                })
                              }
                            >
                              <div className="StoreImage">
                                <img src={image} alt={title} />
                              </div>
                              <div className="StoreContainerDetail">
                                <div className="StoreContainerPrice">
                                  <span className="StoreContainerPriceSup">
                                    ${actual_price}
                                  </span>
                                  <span className="StoreContainerPriceSub">
                                    ${selling_price}
                                  </span>
                                </div>
                                <div className="StoreContainerTitle">
                                  {title}
                                </div>
                                <div className="StoreContainerProductDetail">
                                  {label}
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
              )
          )}
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
