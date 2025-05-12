import { useState, useEffect } from "react";
import "./MenuItemCard.css";

export default function MenuItemCard({ item, onAddToCart }) {
  const [personCount, setPersonCount] = useState(1);
  const [itemTotal, setItemTotal] = useState(item.price);

  useEffect(() => {
    const servingsNeeded = Math.ceil(personCount / item.serves);
    setItemTotal(servingsNeeded * item.price);
  }, [personCount, item]);

  const incrementPersons = () => {
    setPersonCount(prevCount => prevCount + 1);
  };

  const decrementPersons = () => {
    setPersonCount(prevCount => Math.max(1, prevCount - 1));
  };

  return (
    <div className="menu-item">
      <img src={item.image} alt={item.name} className="item-image" />
      <div className="item-details">
        <h3>{item.name}</h3>
        <p>Rs. {item.price} (serves {item.serves})</p>
        <div className="item-actions">
          <div className="person-selector">
            <label>Persons:</label>
            <div className="counter-controls">
              <button 
                className="counter-btn"
                onClick={decrementPersons}
                disabled={personCount <= 1}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={personCount}
                onChange={(e) => setPersonCount(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button 
                className="counter-btn"
                onClick={incrementPersons}
              >
                +
              </button>
            </div>
          </div>
          <p className="item-total">Total: Rs. {itemTotal}</p>
          <button className="add-to-cart-btn" onClick={() => onAddToCart(item, personCount)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}