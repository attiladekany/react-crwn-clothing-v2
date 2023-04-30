import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import NavigationContainer, { AvatarContainer, LogoContainer, NavLink, NavLinks } from './navigation.styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { UserState } from '../../store/user/user.reducer';
import { RootState } from '../../store/store';

const Navigation = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => (state.user as UserState).currentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <Fragment>
              <NavLink as="span" onClick={signOutUser}>
                SIGN OUT
              </NavLink>

              <AvatarContainer>
                <span>| {currentUser.displayName} |</span>
              </AvatarContainer>
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
