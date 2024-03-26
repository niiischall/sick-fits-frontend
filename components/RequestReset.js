import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/hooks/useForm';
import StyledForm from './styles/Form';
import DisplayError from './ErrorMessage';

export const REQUEST_RESET_PASSWORD_MUTATION = gql`
  mutation REQUEST_RESET_PASSWORD($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export const RequestResetPassword = () => {
  const { inputs, handleInputChange, resetForm } = useForm({
    email: '',
  });

  const [requestResetPassword, { data, error, loading }] = useMutation(
    REQUEST_RESET_PASSWORD_MUTATION,
    {
      variables: inputs,
    }
  );

  const isSuccess = data?.sendUserPasswordResetLink === null;

  const handleRequestReset = (event) => {
    event.preventDefault();
    requestResetPassword().catch((err) => console.error(err));
    resetForm();
  };

  return (
    <StyledForm onSubmit={handleRequestReset}>
      <h2>
        {isSuccess
          ? `Request For Reset Placed Successfully. Please Check Email.`
          : `Request Password Reset`}
      </h2>
      <h3>{!isSuccess && data?.sendUserPasswordResetLink?.message}</h3>
      <DisplayError
        error={error || (!isSuccess && data?.sendUserPasswordResetLink)}
      />
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

export default RequestResetPassword;
