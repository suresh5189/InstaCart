import React, { useEffect, useState } from "react";
import { getStoreIemDetails } from "../../apiServices";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addToCart } from "../../store/action/userActions";
import Loader from "../Loader";
import BookMark from "../BookMark";
import StoreProductInformation from "./StoreProductInformation";
import DetailScreenSidebar from "./DetailScreenSideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StoreProducts = () => {
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState(true);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [productByCategory, setProductByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const { store_id, title, image } = state || {};

  const itemsPerPage = 8;

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Item Added To Cart", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
    });
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
            categorizedProducts[category_name][subcategory_name].push(
              ...products
            );
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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Calculate start and end indices for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      <div className="StoreDetail">
        <ToastContainer />
        <div className="StoreDetailSideBar">
          <div className="DetailScreenSidebar">
            <DetailScreenSidebar
              storeId={store_id}
              image={image}
              title={title}
            />
          </div>
        </div>
        <div className="PaginationDiv">
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
                                          onMouseLeave={() =>
                                            setHoveredId(null)
                                          }
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
          <div className="Pagination">
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="PaginationBack"
            >
              Previous
            </button>
            <span>{`Page ${currentPage}`}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= Math.ceil(10 / itemsPerPage)}
              className="PaginationNext"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {bookmarkModalOpen && (
        <BookMark
          handleClose={handleCloseBookmarkModal}
          handleOpen={handleOpenDetailModal}
        />
      )}
      {selectedItem && (
        <StoreProductInformation
          item={selectedItem}
          handleClose={handleCloseDetailModal}
          handleOpen={itemModalOpen}
        />
      )}
    </>
  );
};

export default StoreProducts;
