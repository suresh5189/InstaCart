import React, { useEffect, useState } from "react";
import { getStoreIemDetails } from "../apiServices";
import StoreItemDetail from "./StoreItemDetail";
import BookMark from "./BookMark";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/action/userActions";
import DetailScreenSidebar from "./DetailScreenSideBar";
import Loader from "./Loader";
import { useLocation } from "react-router-dom";

const StoreItemInfo = () => {
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState(true);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [productByCategory, setProductByCategory] = useState({});
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const location = useLocation();

  const { state } = location;

  const { store_id, title, image } = state || {};

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

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
    const fetchStoreItemDetails = async () => {
      try {
        const response = await getStoreIemDetails(store_id);
        const categorizedProducts = {};
        response.data.forEach(({ category_name, subcategories }) => {
          subcategories.forEach(({ subcategory_name, products }) => {
            if (!categorizedProducts[category_name]) {
              categorizedProducts[category_name] = {};
            }
            if (!categorizedProducts[category_name][subcategory_name]) {
              categorizedProducts[category_name][subcategory_name] = [];
            }
            categorizedProducts[category_name][subcategory_name].push(...products);
          });
        });
        setProductByCategory(categorizedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error Fetching Store Item Data Details", error);
        setLoading(false);
      }
    };
    fetchStoreItemDetails();
  }, [store_id]);

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
          {loading ? (
            <Loader />
          ) : (
            Object.entries(productByCategory).map(
              ([category, subcategories]) => (
                <div key={category}>
                  {Object.entries(subcategories).some(
                    ([subcategory, products]) => products.length > 0
                  ) && (
                    <div className="StoreDetailHead">
                      <div className="StoreHeading">{category}</div>
                      {Object.entries(subcategories).map(
                        ([subcategory, products]) =>
                          products.length > 0 && (
                            <div key={subcategory}>
                              <div className="StoreSubHeading">
                                {subcategory}
                              </div>
                              <div className="StoreContainerHead">
                                {products.map(
                                  ({
                                    id,
                                    title,
                                    image,
                                    label,
                                    actual_price,
                                    selling_price,
                                  }) => (
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
                                          {hoveredId === id
                                            ? "Add To Cart"
                                            : "Add"}
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
                                  )
                                )}
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  )}
                </div>
              )
            )
          )}
        </div>
      </div>
      {bookmarkModalOpen && (
        <BookMark
          handleClose={handleCloseBookmarkModal}
          handleOpen={handleOpenDetailModal}
        />
      )}
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

export default StoreItemInfo;
