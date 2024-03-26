import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/hooks/useForm';
import StyledForm from './styles/Form';
import DisplayError from './ErrorMessage';

export const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export const ResetPassword = ({ token }) => {
  const { inputs, handleInputChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [resetPassword, { data, error, loading }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: inputs,
    }
  );
  const isSuccessfulError = data?.redeemUserPasswordResetToken !== null;

  const handleResetPassword = (event) => {
    event.preventDefault();
    resetPassword().catch((error) => console.error(error));
    resetForm();
  };

  return (
    <StyledForm onSubmit={handleResetPassword}>
      <h2>
        {isSuccessfulError
          ? `Reset Password`
          : `Password Reset Success. Please log-in.`}
      </h2>
      <h3>
        {isSuccessfulError && data?.redeemUserPasswordResetToken?.message}
      </h3>
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
            autoComplete="email"
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
            autoComplete="password"
            onChange={handleInputChange}
          />
        </label>
      </fieldset>
      <button type="submit" disabled={loading}>
        Reset Password
      </button>
    </StyledForm>
  );
};

export default ResetPassword;
