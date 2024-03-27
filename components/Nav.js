import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from '../lib/hooks/useUser';
import { useCart } from '../lib/CartProvider';
import LogOut from './LogOut';

const Nav = () => {
  const user = useUser();
  const { openCart } = useCart();
  const authenticatedUser = user?.authenticatedItem;

  return (
    <NavStyles>
      {authenticatedUser ? (
        <>
          <Link href="/products">Products</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <LogOut />
          <button type="button" onClick={openCart}>
            My Cart
          </button>
        </>
      ) : (
        <>
          <Link href="/products">Products</Link>
          <Link href="/auth">Log-In</Link>
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
