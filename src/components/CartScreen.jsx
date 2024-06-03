import React, { useEffect, useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import { TbReload } from "react-icons/tb";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import CartItemDetail from "../data/cartItemDetail";

const Cart = ({ closeCart, isOpenCart }) => {
  const useCartRef = useRef(null);

  const handleCartRef = (event) => {
    if (useCartRef.current && !useCartRef.current.contains(event.target)) {
      closeCart();
    }
  };

  useEffect(() => {
    if (isOpenCart) {
      document.addEventListener("mousedown", handleCartRef);
    } else {
      document.removeEventListener("mousedown", handleCartRef);
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
        {CartItemDetail.map(
          ({ id, itemImage, cartItemTitle, cartItemVolume, cartItemPrice }) => {
            return (
              <div className="CartItem" key={id}>
                <div className="CartItemImage">
                  <img src={itemImage} alt="" />
                  <div className="CartItemImgaeText">
                    <div className="CartItemHeading">
                      <div className="CartItemHeadingText">
                        <span className="CartItemText1">{cartItemTitle}</span>
                        <span className="CartItemText2">{cartItemVolume}</span>
                      </div>
                      <div className="CartItemButton">
                        <div className="CartItemButtonDiv">
                          <div className="CartItemButtonIcon">
                            <span className="CartItemButtonIcon">
                              <TbReload size={20} />
                            </span>
                            <span className="CartItemButtonIconText">
                              Choose Replacement
                            </span>
                          </div>
                          <div className="CartItemButtonIcon">
                            <span className="CartItemButtonIcon">
                              <IoIosRemoveCircleOutline size={20} />
                            </span>
                            <span className="CartItemButtonIconText">
                              Remove
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="CartItemPrice">
                  <span className="CartItemPriceText">$ {cartItemPrice}</span>
                </div>
              </div>
            );
          }
        )}
        <div className="CartInput">
          <input type="text" name="" id="" placeholder="$10 Min. to checkout" />
          <span className="CartInputButton">$0.00</span>
        </div>
      </div>
    </>
  );
};

export default Cart;
