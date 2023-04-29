import { memo } from 'react';
import './cart-item.styles.scss';

// unless the actual value does not change, this component does not need to be re-rendered
const CartItem = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="quantity">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
});
export default CartItem;
