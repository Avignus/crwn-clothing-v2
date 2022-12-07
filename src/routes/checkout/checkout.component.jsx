import { useSelector } from "react-redux";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles.jsx";
import PaymentForm from "../../components/payment-form/payment-form.component";
const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  return (
    <>
      <CheckoutContainer className="checkout-container">
        <CheckoutHeader className="checkout-header">
          <HeaderBlock className="header-block">
            <span>Product</span>
          </HeaderBlock>
          <HeaderBlock
            style={{
              width: "23%",
              paddingLeft: "30px",
            }}
            className="header-block"
          >
            <span>Description</span>
          </HeaderBlock>
          <HeaderBlock className="header-block">
            <span>Quantity</span>
          </HeaderBlock>
          <HeaderBlock className="header-block">
            <span>Price</span>
          </HeaderBlock>
          <HeaderBlock style={{ width: "8%" }} className="header-block">
            <span>Remove</span>
          </HeaderBlock>
        </CheckoutHeader>
        {cartItems.map((cartItem, index) => {
          return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
        })}
        <Total className="total">Total: ${cartTotal}</Total>
        <PaymentForm />
      </CheckoutContainer>
    </>
  );
};

export default Checkout;
