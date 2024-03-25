import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/hooks/useForm';
import StyledForm from './styles/Form';
import DisplayError from './ErrorMessage';

export const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export const ResetPassword = () => {
  const { inputs, handleInputChange, resetForm } = useForm({
    email: '',
  });

  const [resetPassword, { data, error, loading }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: inputs,
    }
  );

  const handleSignIn = (event) => {
    event.preventDefault();
    resetPassword();
    resetForm();
  };

  return (
    <StyledForm onSubmit={handleSignIn}>
      <h3>Forgot Your Password?</h3>
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
      <button type="submit" disabled={loading}>
        Request Reset!
      </button>
    </StyledForm>
  );
};

export default ResetPassword;
