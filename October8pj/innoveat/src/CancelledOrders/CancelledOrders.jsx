import React from "react";
import "./CancelledOrders.css";
import Navbar from "../Navbar/Navbar";

function CancelledOrders({ cancelledOrders, onBack }) {
  return (
    <>
    <Navbar />
    <div className="orders-container">
      <div className="menu">
        <div className="menu-item" onClick={onBack}>BACK</div>
      </div>
      <h2 className="orders-title">CANCELLED ORDERS</h2>
      <div className="orders-list">
        {cancelledOrders.map((order) => (
          <div key={order.id} className="order-item">  {/* Use unique key here */}
            <div className="order-details">
              <div>Name: {order.name}</div>
              <div><b>Type:</b> {order.type}</div>
              <div><b>NO.:</b> {order.phone}</div>
              <div>Date: {order.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default CancelledOrders;
