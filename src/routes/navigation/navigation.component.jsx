import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import "./navigation.styles.jsx";
import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles.jsx";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { toggleCart } from "../../store/cart/cart.action";
const Navigation = () => {
  const signOutHandler = async () => {
    signOutUser();
  };
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const setIsCartOpen = (boolean) => {
    dispatch(toggleCart(boolean));
  };
  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop" className="nav-link">
            SHOP
          </NavLink>

          {currentUser ? (
            <span onClick={signOutHandler} to="/" className="nav-link">
              SIGN OUT
            </span>
          ) : (
            <NavLink to="/auth" className="nav-link">
              SIGN IN
            </NavLink>
          )}
          <CartIcon onClick={() => setIsCartOpen(!isCartOpen)} />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
