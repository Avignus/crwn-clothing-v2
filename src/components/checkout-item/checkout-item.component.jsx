import {
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Quantity,
  Value,
  Price,
  Arrow,
  RemoveButton,
} from "./checkout-item.styles.jsx";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItem, cartItems));
  const addItemHandler = () => dispatch(addItemToCart(cartItem, cartItems));
  const removeItemHandler = () => {
    dispatch(removeItemFromCart(cartItem, cartItems));
  };
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
