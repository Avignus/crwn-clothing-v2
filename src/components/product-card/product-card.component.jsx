import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles.jsx";
import Button from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  const addProductTocart = () => addItemToCart(product);
  return (
    <ProductCardContainer>
      <img
        style={{ width: "80%", height: "400px" }}
        src={imageUrl}
        alt={`${name}`}
      />
      <Button onClick={addProductTocart} buttonType="inverted">
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
