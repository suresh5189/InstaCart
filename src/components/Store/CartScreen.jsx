import React, { useEffect, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  IoIosRemoveCircleOutline,
  IoIosAddCircleOutline,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../store/action/userActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = ({ closeCart, isOpenCart }) => {
  const useCartRef = useRef(null);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const navigateToCheckoutPage = () => {
    navigate("/store/checkout");
    closeCart();
  };

  const handleClickOutside = (event) => {
    if (useCartRef.current && !useCartRef.current.contains(event.target)) {
      closeCart();
    }
  };

  const cartItems = useSelector((state) => state.cart.items);
  // console.log("Cart Items:", cartItems);

  const handleRemoveItemFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.success("Item Remove From Cart", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(updateCartItemQuantity(itemId, 1));
  };

  const handleDecreaseQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
      dispatch(updateCartItemQuantity(itemId, -1));
    }
  };

  const isDisabled = cartItems.length === 0;

  useEffect(() => {
    if (isOpenCart) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpenCart]);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce(
      (total, item) => total + item.actual_price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  return (
    <>
      <div className="Overlay"></div>
      <div className="Cart" ref={useCartRef}>
        <div className="CartHeader">
          <div className="CartClose">
            <MdOutlineClose
              className="CartCloseIcon"
              size={22}
              onClick={closeCart}
            />
          </div>
          <div className="CartHeading">
            <span className="CartHeadingText1">Personal FoodCo Cart</span>
            <span className="CartHeadingText2">Shopping in 94105</span>
          </div>
        </div>
        <div
          style={{ borderBottom: "1px solid lightGrey", margin: "10px" }}
        ></div>
        {cartItems.map(
          ({ id, image, title, label, actual_price, quantity }) => {
            const displayQuantity = quantity !== undefined ? quantity : 1;
            return (
              <div className="CartItem" key={id}>
                <div className="CartItemImage">
                  <img src={image} alt="" />
                  <div className="CartItemImgaeText">
                    <div className="CartItemHeading">
                      <div className="CartItemHeadingText">
                        <span className="CartItemText1">{title}</span>
                        <span className="CartItemText2">{label}</span>
                      </div>
                      <div className="CartItemButton">
                        <div className="CartItemButtonDiv">
                          <div
                            className="CartItemButtonIcon"
                            onClick={() => handleDecreaseQuantity(id)}
                          >
                            <IoIosRemoveCircleOutline size={20} />
                          </div>
                          <span className="CartItemQuantity">
                            {displayQuantity}
                          </span>
                          <div
                            className="CartItemButtonIcon"
                            onClick={() => handleIncreaseQuantity(id)}
                          >
                            <IoIosAddCircleOutline size={20} />
                          </div>
                        </div>
                        <div
                          className="CartItemButtonIconAndRemove"
                          onClick={() => handleRemoveItemFromCart(id)}
                        >
                          <span>
                            <RiDeleteBinLine />
                          </span>
                          <span className="CartItemButtonIconText">Remove</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="CartItemPrice">
                  <span className="CartItemPriceText">
                    $ {(displayQuantity * actual_price).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          }
        )}
        <div className="CartCheckOutButton">
          <button
            onClick={navigateToCheckoutPage}
            style={{
              cursor: "pointer",
              backgroundColor: isDisabled
                ? "rgb(172, 172, 172)"
                : "rgb(27, 152, 27)",
            }}
            disabled={isDisabled}
          >
            {totalPrice < 10 ? "$10 Min. to checkout" : "Checkout"}
          </button>
          <span className="CartInputButton">
            ${totalPrice <= 0 ? "0.00" : totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </>
  );
};

export default Cart;
