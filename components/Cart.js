import styled from 'styled-components';
import useUser from '../lib/hooks/useUser';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/utils/formayMoney';
import calcTotalPrice from '../lib/utils/calcTotalPrice';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--light-gray);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ item }) => {
  console.log(item);
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
    </CartItemStyles>
  );
};

export const Cart = () => {
  const user = useUser();
  const { name, cart } = user?.authenticatedItem ?? {};

  if (!user) {
    return null;
  }

  return (
    <CartStyles open>
      <header>
        <Supreme>{name}'s cart</Supreme>
      </header>
      <ul>
        {cart.map((item) => (
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