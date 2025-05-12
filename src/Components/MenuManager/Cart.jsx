import "./Cart.css";

export default function Cart({ cart, onRemoveFromCart, onCheckout, totalAmount }) {
  if (cart.length === 0) return <div className="empty-cart">Your cart is empty</div>;

  return (
    <div className="cart-items">
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-details">
            <h4>{item.name}</h4>
            <p>For {item.personCount} person(s)</p>
            <p>{item.servingsCount} serving(s)</p>
          </div>
          <div className="cart-item-price">
            <p>Rs. {item.totalPrice}</p>
            <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total: Rs. {totalAmount}</h3>
        <button onClick={onCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
}