import React, { useEffect, useRef, useState } from "react";
import '../css/StoreItemDetail.css'
import '../css/StoreDetailPage.css'
import '../css/StoreDetailScreen.css'
import { motion, AnimatePresence } from "framer-motion";
import { FaList } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  addToCart,
  addToFavorite,
  removeFromFavorite,
} from "../../store/action/userActions";
import { toast } from "react-toastify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addToSavedProduct, removeFromSavedProduct } from "../../apiServices";

const StoreProductInformation = ({ item, handleClose, handleOpen }) => {
  const [quantity, setQuantity] = useState(1);
  const [favoriteItems, setFavoritesItems] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : {};
  });

  const useItemRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const handleChangeFavoriteButtonColor = async () => {
    const isCurrentlyFavorite = favoriteItems[item.id];

    if (!isCurrentlyFavorite) {
      await addToProduct();
    } else {
      await removeProduct();
    }
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Item Added To Cart", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleClickOutside = (event) => {
    if (useItemRef.current && !useItemRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (handleOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  });

  const addToProduct = async () => {
    try {
      const refreshToken = localStorage.getItem("RefreshToken");
      await addToSavedProduct(item.id, refreshToken);
      setFavoritesItems({
        ...favoriteItems,
        [item.id]: true,
      });
      dispatch(addToFavorite(item));
      toast.success("Item Added To Favorites", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to add item to favorites", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  const removeProduct = async () => {
    try {
      const refreshToken = localStorage.getItem("RefreshToken");
      await removeFromSavedProduct(item.id, refreshToken);
      setFavoritesItems({
        ...favoriteItems,
        [item.id]: false,
      });
      dispatch(removeFromFavorite(item));
      toast.success("Item Removed From Favorites", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to remove item from favorites", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <AnimatePresence>
      {handleOpen && (
        <motion.div
          className="Overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="StoreItemDetailHead"
            ref={useItemRef}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 150, duration: 0.7 }}
          >
            <div className="StoreItemDetailClose" onClick={handleClose}>
              <motion.span
                className="StoreItemDetailCloseIcon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <GoArrowLeft size={20} />
              </motion.span>
              <span className="StoreItemDetailCloseBack">Back</span>
            </div>
            <div className="StoreItemDetail">
              <div className="StoreItemDetailImage">
                <motion.img
                  src={item.image}
                  alt={item.productDetail}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="StoreItemDetailHeading">
                <div className="StoreItemDetailText1">{item.title}</div>
                <div className="StoreItemDetailText11">{item.label}</div>
                <div
                  style={{
                    borderBottom: "1px solid lightGrey",
                    marginTop: "20px",
                  }}
                ></div>
                <div className="StoreItemDetailDetail">
                  <div className="StoreItemDetailText2">Details</div>
                  <div className="StoreItemDetailText2">
                    <MdKeyboardArrowDown />
                  </div>
                </div>
                <div style={{ borderBottom: "1px solid lightGrey" }}></div>
              </div>
              <div className="StoreItemDetailButtonContainer">
                <div className="StoreItemDetailButtonContainerText">
                  $ {item.actual_price}
                </div>
                <div className="StoreItemDetailButtonContainerItemCount">
                  <motion.button
                    className="IncreaseDecreaseButton"
                    onClick={decrement}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <input
                    className="InputIncreaseDecreaseButtonValue"
                    type="text"
                    value={quantity}
                    disabled
                  />
                  <motion.button
                    className="IncreaseDecreaseButton"
                    onClick={increment}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
                <motion.div
                  className="StoreItemDetailButtonContainerCart"
                  onClick={() => handleAddToCart(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add To Cart
                </motion.div>
                <div className="StoreItemDetailIconItems">
                  <div className="StoreItemDetailIcon">
                    <motion.span
                      className="StoreItemDetailIconSave"
                      onClick={handleChangeFavoriteButtonColor}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {favoriteItems[item.id] ? (
                        <FavoriteIcon
                          size={20}
                          style={{ color: "red", cursor: "pointer" }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          size={20}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </motion.span>
                    <span className="StoreItemDetailIconSaveText">Save</span>
                  </div>
                  <div className="StoreItemDetailIcon">
                    <span className="StoreItemDetailIconSave">
                      <FaList size={20} />
                    </span>
                    <span className="StoreItemDetailIconSaveText">
                      Add To List
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StoreProductInformation;
