import React, { useEffect, useState } from "react";
import { getOrdersDetails } from "../../apiServices";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);

  const { order_id } = useParams();

  useEffect(() => {
    const getProductOrderDetails = async () => {
      try {
        const refreshToken = localStorage.getItem("RefreshToken");
        const orderDetails = await getOrdersDetails(refreshToken, order_id);
        console.log("Fetching Order Details", orderDetails.data);
        setOrderDetails(orderDetails.data.orderData);
      } catch (error) {
        console.log("Error Fetching Orders Details", error.message);
      }
    };
    getProductOrderDetails();
  }, []);

  return (
    <div>
      {orderDetails.length > 0 ? (
        orderDetails.map((detail) => (
          <div>
            <h1>Your Order Details</h1>
            <div>
              <div>
                <img src={detail.store_logo} alt="" />
              </div>
              <span>{detail.store_name}</span>
            </div>
            <div>
              <span>orderId</span>
              <span>Order Status</span>
            </div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default OrderDetails;
