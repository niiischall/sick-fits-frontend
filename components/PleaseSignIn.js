import LogIn from './LogIn';
import { useUser } from '../lib/hooks/useUser';

export const PleaseSignIn = ({ children }) => {
  const data = useUser();
  const isUserAvailable = data?.authenticatedItem;

  if (!isUserAvailable) {
    return <LogIn />;
  }

  return children;
};

export default PleaseSignIn;
