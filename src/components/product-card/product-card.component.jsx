import { useContext } from 'react';


import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';

import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from './product-card.styles';
import { CartContext } from '../../context/cart.context';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPES_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
