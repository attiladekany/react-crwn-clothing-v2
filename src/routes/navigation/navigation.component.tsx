import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import NavigationContainer, {
  AvatarContainer,
  LogoContainer,
  NavLink,
  NavLinks,
  signOutLinkStyles,
  smallShopLink,
} from './navigation.styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { UserState } from '../../store/user/user.reducer';
import { RootState } from '../../store/store';
import { Size, useWindowSize } from '../../custom-hooks/use-window-size';

const Navigation = () => {
  const size: Size = useWindowSize();

  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => (state.user as UserState).currentUser);
  const { displayName } = currentUser ?? {};
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          {/* Todo: implement nested submenu for sign-in/out & trash smallShopLink */}
          <NavLink style={size.width && size.width < 800 ? smallShopLink : {}} to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <Fragment>
              <NavLink style={signOutLinkStyles} as="span" onClick={signOutUser}>
                SIGN OUT
              </NavLink>

              {displayName ? (
                <AvatarContainer>
                  <span>| {displayName} |</span>
                </AvatarContainer>
              ) : null}
            </Fragment>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}

          <CartIcon />
        </NavLinks>

        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
