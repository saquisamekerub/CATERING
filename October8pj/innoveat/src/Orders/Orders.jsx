import React, { useState, useEffect } from "react";
import "./Orders.css";
import Navbar from "../Navbar/Navbar";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  // Fetch orders from the backend on component mount
  useEffect(() => {
    fetch("http://localhost/Integ_Prog_DBCon/getReservations.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Log fetched data
        if (data.status === "success" && data.data) {
          setOrders(data.data);
        } else {
          setError("Failed to load orders data.");
          console.error("Failed to fetch orders:", data.message);
        }
      })
      .catch((error) => {
        setError("Error fetching orders.");
        console.error("Fetch error:", error);
      });
  }, []);

  const handleSelectOrder = (id) => {
    setOrders(
      orders.map((order) =>
        order.final_order_id === id ? { ...order, selected: !order.selected } : order
      )
    );
  };

  const handleCancelOrder = () => {
    const selectedOrders = orders.filter((order) => order.selected);
    if (selectedOrders.length === 0) {
      alert("No orders selected to cancel.");
    } else {
      setOrders(orders.filter((order) => !order.selected));
      alert("Selected order(s) canceled.");
    }
  };

  const handleAcceptOrder = () => {
    const selectedOrders = orders.filter((order) => order.selected);
    if (selectedOrders.length === 0) {
      alert("No orders selected to accept.");
    } else {
      alert("Selected order(s) accepted!");
      setOrders(orders.map((order) => ({ ...order, selected: false })));
    }
  };

  return (
    <>
      <Navbar />
      <div className="orders-containers">
        <h2 className="orders-titles">ORDERS</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="orders-lists">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.final_order_id} className="order-items">
                <input
                  type="checkbox"
                  checked={order.selected || false}
                  onChange={() => handleSelectOrder(order.final_order_id)}
                />
                <div className="space">Final Order ID: {order.final_order_id || "N/A"}</div>
                <div className="space">Event ID: {order.event_id || "N/A"}</div>
                <div className="space">Equipment Package ID: {order.equip_pckg_id || "N/A"}</div>
              </div>
            ))
          ) : (
            <p className="no-orders-message">No orders available</p>
          )}
        </div>
        <div className="order-buttons">
          <button className="cancel-btn" onClick={handleCancelOrder}>
            CANCEL ORDER
          </button>
          <button className="accept-btn" onClick={handleAcceptOrder}>
            ACCEPT ORDER
          </button>
        </div>
      </div>
    </>
  );
}

export default Orders;
