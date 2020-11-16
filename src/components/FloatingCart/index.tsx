import React, { useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import { useCart } from '../../hooks/cart';
import formatValue from '../../utils/formatValue';

import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    const valueTotalProducts = products.reduce((accumulator, product) => {
      return accumulator + product.quantity * product.price;
    }, 0);

    return formatValue(valueTotalProducts);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    const qtdProducts = products.reduce((accumulator, product) => {
      return accumulator + product.quantity;
    }, 0);

    return qtdProducts;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}>
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
