import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

const Nav = () => {
  const user = useUser();
  const authenticatedUser = user?.authenticatedItem;

  return (
    <NavStyles>
      {authenticatedUser ? (
        <>
          <Link href="/products">Products</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
        </>
      ) : (
        <>
          <Link href="/products">Products</Link>
          <Link href="/log-in">Sign-In</Link>
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
