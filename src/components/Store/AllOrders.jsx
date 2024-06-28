import React, { useEffect, useState } from "react";
import { getOrders } from "../../apiServices";
import { useNavigate } from "react-router-dom";

const AllOrders = () => {
  const [ordersData, setOrdersData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getProductOrder = async () => {
      try {
        const refreshToken = localStorage.getItem("RefreshToken");
        const orders = await getOrders(refreshToken);
        // console.log(
        //   "Fetching Orders: ",
        //   orders.data.current_orders.pickup_orders.orders
        // );
        setOrdersData(orders.data.current_orders.pickup_orders.orders);
      } catch (error) {
        console.log("Error Fetching Orders", error.message);
      }
    };
    getProductOrder();
  }, []);

  const navigateToOrderDetailPage = (order_id) => {
    navigate(`/store/orders/orderDetails/${order_id}`);
  };

  return (
    <>
      <div>
        <h2 className="OrdersHeading">Current Pickup Orders</h2>
        {ordersData?.length > 0 ? (
          <div className="Orders">
            {ordersData.map((order) => (
              <button
                key={order.order_id}
                className="OrdersDiv"
                onClick={() => navigateToOrderDetailPage(order.order_id)}
              >
                <div className="OrderDivInside">
                  <p className="OrdersId">Order ID: {order.order_id}</p>
                  <p>Status: {order.order_status}</p>
                  <p>Pickup Day: {order.pickup_day}</p>
                  <p>Pickup Slot: {order.pickup_slot}</p>
                  <p>Subtotal: ${order.subtotal}</p>
                  <p>Items Count: {order.items_count}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="OrderNotFound">No Current Pickup Orders Found...</p>
        )}
      </div>
    </>
  );
};

export default AllOrders;
