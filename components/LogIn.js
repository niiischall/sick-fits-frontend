import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { USER_AUTHENTICATED_QUERY } from '../lib/hooks/useUser';
import useForm from '../lib/hooks/useForm';
import StyledForm from './styles/Form';
import DisplayError from './ErrorMessage';

export const AUTHENTICATE_USER_MUTATION = gql`
  mutation AUTHENTICATE_USER($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export const LogIn = () => {
  const { inputs, handleInputChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [authenticateUser, { data, loading }] = useMutation(
    AUTHENTICATE_USER_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: USER_AUTHENTICATED_QUERY }],
    }
  );

  const handleSignIn = (event) => {
    event.preventDefault();
    authenticateUser();
    resetForm();
  };

  const IsError =
    data?.authenticateUserWithPassword?.__typename ===
    'UserAuthenticationWithPasswordFailure';

  return (
    <StyledForm onSubmit={handleSignIn}>
      <DisplayError error={IsError && data?.authenticateUserWithPassword} />
      <fieldset>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your email"
            value={inputs?.email}
            onChange={handleInputChange}
          />
        </label>
      </fieldset>
      <fieldset>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Your password"
            value={inputs?.password}
            onChange={handleInputChange}
          />
        </label>
      </fieldset>
      <button type="submit" disabled={loading}>
        Log In
      </button>
    </StyledForm>
  );
};

export default LogIn;
