// src/components/MenuManager/MenuManager.jsx
import React, { useState, useEffect } from "react";
import MenuItemCard from "./MenuItemCard";
import Cart from "./Cart";
import Checkout from "./Checkout";
import "./MenuManager.css";

export default function MenuManager({ menuItems }) {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalAmount(total);
  }, [cart]);

  const addToCart = (item, personCount) => {
    const servingsNeeded = Math.ceil(personCount / item.serves);
    const totalPrice = servingsNeeded * item.price;
    const existingIndex = cart.findIndex(ci => ci.id === item.id);

    if (existingIndex >= 0) {
      const updatedCart = [...cart];
      const updatedPersonCount = updatedCart[existingIndex].personCount + personCount;
      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        personCount: updatedPersonCount,
        servingsCount: Math.ceil(updatedPersonCount / item.serves),
        totalPrice: Math.ceil(updatedPersonCount / item.serves) * item.price
      };
      setCart(updatedCart);
    } else {
      setCart([...cart, {
        ...item,
        personCount,
        servingsCount: servingsNeeded,
        totalPrice
      }]);
    }

    setOrderMessage(`✅ Added ${item.name} for ${personCount} person(s) to cart`);
    setTimeout(() => setOrderMessage(""), 3000);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => setShowCheckout(true);

  const handlePlaceOrder = () => {
    const now = new Date();
    const [hours, minutes] = deliveryTime.split(":").map(Number);
    const delivery = new Date();
    delivery.setHours(hours, minutes, 0);

    if (delivery < now || ((delivery - now) / 3600000 < 5)) {
      setOrderMessage("⚠️ Delivery must be at least 5 hours from now.");
      return;
    }

    if (!deliveryAddress.trim()) {
      setOrderMessage("⚠️ Please provide a delivery address.");
      return;
    }

    setOrderMessage(`✅ Order placed! Total: Rs. ${totalAmount}`);
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
  };

  return (
    <div className="food-ordering-system">
      <header className="app-header">
        <h1>Tasty Delights Restaurant</h1>
        <div className="cart-icon" onClick={() => setShowCart(!showCart)}>
          🛒 Cart ({cart.length})
        </div>
      </header>

      <main className="main-content">
        {showCart ? (
          showCheckout ? (
            <Checkout
              cart={cart}
              deliveryTime={deliveryTime}
              deliveryAddress={deliveryAddress}
              setDeliveryTime={setDeliveryTime}
              setDeliveryAddress={setDeliveryAddress}
              totalAmount={totalAmount}
              onPlaceOrder={handlePlaceOrder}
              onBack={() => setShowCheckout(false)}
            />
          ) : (
            <Cart
              cart={cart}
              onRemoveFromCart={removeFromCart}
              onCheckout={handleCheckout}
              totalAmount={totalAmount}
            />
          )
        ) : (
          <div className="menu-grid">
            {menuItems.map(item => (
              <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </main>

      {orderMessage && (
        <div className={`order-message ${orderMessage.startsWith("✅") ? "success" : "error"}`}>
          {orderMessage}
        </div>
      )}
    </div>
  );
}