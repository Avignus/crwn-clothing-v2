import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles.jsx";
import Button from "../button/button.component";

import { addItemToCart } from "../../store/cart/cart.action.js";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector.js";
const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const addProductToCart = () => dispatch(addItemToCart(product, cartItems));
  return (
    <ProductCardContainer>
      <img
        style={{ width: "80%", height: "400px" }}
        src={imageUrl}
        alt={`${name}`}
      />
      <Button onClick={addProductToCart} buttonType="inverted">
        Add to cart
      </Button>
      <Footer>
        <Name>{name}</Name>
        <Price>{price}$</Price>
      </Footer>
    </ProductCardContainer>
  );
};

export default ProductCard;
