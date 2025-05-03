// src/components/MenuManager/Checkout.jsx
import React from "react";
import "./Checkout.css";

export default function Checkout({ cart, deliveryTime, deliveryAddress, setDeliveryTime, setDeliveryAddress, totalAmount, onPlaceOrder, onBack }) {
  return (
    <div className="checkout-form">
      <h2>Complete Your Order</h2>
      <p className="note">
        Restaurant hours: 9:00 AM - 11:00 PM. Pre-orders must be placed at least 5 hours in advance.
      </p>
      <div className="form-group">
        <label>
          Delivery Time:
          <input
            type="time"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Delivery Address:
          <textarea
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            rows="3"
          />
        </label>
      </div>
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        {cart.map(item => (
          <div key={item.id}>
            <span>{item.name} (for {item.personCount})</span>
            <span>Rs. {item.totalPrice}</span>
          </div>
        ))}
        <div>
          <strong>Total Amount:</strong> Rs. {totalAmount}
        </div>
      </div>
      <button onClick={onBack}>Back to Cart</button>
      <button onClick={onPlaceOrder}>Place Order</button>
    </div>
  );
}