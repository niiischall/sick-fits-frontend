import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { USER_AUTHENTICATED_QUERY } from './User';
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
      refetchQueries: [USER_AUTHENTICATED_QUERY],
    }
  );

  const handleSignIn = (event) => {
    event.preventDefault();
    console.log(inputs);
    authenticateUser();
    resetForm();
  };

  const error =
    data?.authenticateUserWithPassword?.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <StyledForm onSubmit={handleSignIn}>
      <DisplayError error={error} />
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
