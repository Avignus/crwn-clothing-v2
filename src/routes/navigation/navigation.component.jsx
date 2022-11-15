import { useContext } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
// import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import "./navigation.styles.jsx";
import { CartContext } from "../../context/cart.context";
import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles.jsx";
import { selectCurrentUser } from "../../store/user/user.selector";
const Navigation = () => {
  // const { currentUser } = useContext(UserContext);
  const signOutHandler = async () => {
    signOutUser();
  };
  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
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
