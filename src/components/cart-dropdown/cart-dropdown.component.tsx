import Button from '../button/button.component';
import CartItemComponent from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useCallback } from 'react';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartDropdown = () => {
  const dispatch = useDispatch();
  
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  // actual callback, that wants to be memooized, [dependency array determine when to rememoize]
  const goToCheckoutHandler = useCallback(() => {
    dispatch(setIsCartOpen(false));
    navigate('/checkout');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItemComponent key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
