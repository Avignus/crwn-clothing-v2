import "./cart-item.styles.jsx";
import { CartItemContainer, CartItemDetails } from "./cart-item.styles.jsx";
const CartItem = ({ cartItem }) => {
  const { name, price, imageUrl, quantity } = cartItem;

  return (
    <CartItemContainer>
      <img style={{ width: "30%" }} src={imageUrl} alt={name} />
      <CartItemDetails className="item-details">
        <span style={{ fontSize: "16px" }}>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </CartItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
