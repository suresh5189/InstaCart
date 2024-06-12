import React, { useEffect, useRef } from "react";
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
} from "../store/action/userActions";

const Cart = ({ closeCart, isOpenCart }) => {
  const useCartRef = useRef(null);
  const dispatch = useDispatch();

  const handleClickOutside = (event) => {
    if (useCartRef.current && !useCartRef.current.contains(event.target)) {
      closeCart();
    }
  };

  const cartItems = useSelector((state) => state.cart.items);
  console.log("Cart Items:", cartItems);

  const handleRemoveItemFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(updateCartItemQuantity(itemId, 1));
  };

  const handleDecreaseQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === item.id);
    if (item && item.quantity > 1) {
      dispatch(updateCartItemQuantity(itemId, -1));
    }
  };

  useEffect(() => {
    if (isOpenCart) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpenCart]);

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
            const displayQuantity = quantity ?? 1;
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
                  <span className="CartItemPriceText">$ {displayQuantity*actual_price}</span>
                </div>
              </div>
            );
          }
        )}
        <div className="CartCheckOutButton">
          <button>$10 Min. to checkout</button>
          <span className="CartInputButton">$0.00</span>
        </div>
      </div>
    </>
  );
};

export default Cart;
