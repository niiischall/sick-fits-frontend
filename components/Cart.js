import CartItemStyles from './styles/CartItemStyles';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import formatMoney from '../lib/utils/formayMoney';
import useUser from '../lib/hooks/useUser';
import calcTotalPrice from '../lib/utils/calcTotalPrice';
import { useCart } from '../lib/CartProvider';
import RemoveFromCart from './RemoveFromCart';

const CartItem = ({ item }) => {
  const { product } = item ?? {};
  return (
    <CartItemStyles>
      <img
        width={100}
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product?.photo?.altText}
      />
      <div>
        <h3>{product?.name}</h3>
        <p>
          {formatMoney(product?.price * item?.quantity)} -
          <em>
            {item?.quantity} &times; {formatMoney(product?.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart cartId={item?.id} />
    </CartItemStyles>
  );
};

export const Cart = () => {
  const user = useUser();
  const { name = '', cart = [] } = user?.authenticatedItem ?? {};
  const { cartOpen, closeCart } = useCart();

  if (!user) {
    return null;
  }

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{name}'s cart</Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {cart?.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(cart))}</p>
      </footer>
    </CartStyles>
  );
};

export default Cart;
