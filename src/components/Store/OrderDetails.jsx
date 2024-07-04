import React, { useEffect, useState } from "react";
import { getOrdersDetails } from "../../apiServices";
import { useParams } from "react-router-dom";
import Loader from "../Loader";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  const { order_id } = useParams();

  useEffect(() => {
    const getProductOrderDetails = async () => {
      try {
        const refreshToken = localStorage.getItem("RefreshToken");
        const orderDetails = await getOrdersDetails(refreshToken, order_id);
        // console.log("Fetching Order Details", orderDetails.data.orderData);
        setOrderDetails(orderDetails.data.orderData);
      } catch (error) {
        console.error("Error Fetching Orders Details", error.message);
      }
    };
    getProductOrderDetails();
  }, [order_id]);

  return (
    <div>
      {orderDetails ? (
        <div className="OrderDetail">
          <h1 className="OrderDetailHeading">Your Order Details</h1>
          <div className="OrderDetailStoreImageAndStore">
            <div className="OrderDetailStoreImageDiv">
              <img
                src={orderDetails.store_logo}
                alt=""
                className="OrderDetailStoreImage"
              />
            </div>
            <div className="OrderDetailStoreNameDiv">
              <span className="OrderDetailStoreName">
                {orderDetails.store_name}
              </span>
              <div className="OrderDetailOrderIdAndStatus">
                <span className="OrderDetailOrderId">
                  OrderId: {orderDetails.order_id}
                </span>
                <span className="OrderDetailOrderStatus">
                  OrderStatus: {orderDetails.order_status}
                </span>
              </div>
            </div>
          </div>
          <div>
            {orderDetails.items.map((item) => (
              <div
                className="OrderDetailProductImageAndName"
                key={item.product_id}
              >
                <div className="OrderDetailProductImageDiv">
                  <img
                    src={item.image}
                    alt=""
                    className="OrderDetailProductImage"
                  />
                </div>
                <div className="OrderDetailProductAllDetail">
                  <div className="OrderDetailProductAllDetailDiv">
                    <span className="OrderDetailProductName">
                      Product: {item.title}
                    </span>
                    <span className="OrderDetailProductPrice">
                      Price: {item.price}
                    </span>
                    <span className="OrderDetailProductQuantity">
                      Quantity: {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="OrderDetailAddressAndPayment">
            <div className="OrderDetailAddressDiv">
              <span className="OrderDetailAddressType">
                Type: {orderDetails.address.type}
              </span>
              <span className="OrderDetailAddress">
                {" "}
                Address: {orderDetails.address.address}
              </span>
              <span className="OrderDetailAddressCity">
                {" "}
                City: {orderDetails.address.city}
              </span>
              <span className="OrderDetailAddressState">
                {" "}
                State: {orderDetails.address.state}
              </span>
              <span className="OrderDetailAddressCountry">
                {" "}
                Country: {orderDetails.address.country}
              </span>
              <span className="OrderDetailAddressZipcode">
                {" "}
                ZipCode: {orderDetails.address.zip_code}
              </span>
              <span className="OrderDetailAddressMobileNumber">
                Phone No: {orderDetails.country_code}
                {orderDetails.mobile_number}
              </span>
            </div>
            <div className="OrderDetailPaymentDiv">
              <span className="OrderDetailPaymentType">
                Payment Method: {orderDetails.payment_details.type}
              </span>
              <span className="OrderDetailPaymentInvoice">
                Invoice: {orderDetails.payment_details.invoice}
              </span>
              <span className="OrderDetailPaymentBagfee">
                Bag Fee: ${orderDetails.payment_details.bag_fee}
              </span>
              <span className="OrderDetailPaymentDiscount">
                Discount: {orderDetails.payment_details.discount_applied}%
              </span>
              <span className="OrderDetailPaymentServiceFee">
                Service Fee: ${orderDetails.payment_details.service_fee}
              </span>
              <span className="OrderDetailPaymentTotalAmount">
                Total Amount: ${orderDetails.payment_details.final_subtotal}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
