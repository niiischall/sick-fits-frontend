import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { USER_AUTHENTICATED_QUERY } from '../lib/hooks/useUser';

export const LOGOUT_USER_MUTATION = gql`
  mutation {
    endSession
  }
`;

export const Logout = () => {
  const [logoutUser, { loading }] = useMutation(LOGOUT_USER_MUTATION, {
    refetchQueries: [{ query: USER_AUTHENTICATED_QUERY }],
  });

  return (
    <button type="button" onClick={logoutUser} disabled={loading}>
      Logout
    </button>
  );
};

export default Logout;
