import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/hooks/useForm';
import StyledForm from './styles/Form';
import DisplayError from './ErrorMessage';

export const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER($email: String!, $name: String!, $password: String!) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      name
      email
    }
  }
`;

export const SignUp = () => {
  const { inputs, handleInputChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [createUser, { data, error, loading }] = useMutation(
    CREATE_USER_MUTATION,
    {
      variables: inputs,
    }
  );

  const handleSignIn = async (event) => {
    event.preventDefault();
    await createUser().catch((err) => console.error(err));
    resetForm();
  };

  return (
    <StyledForm onSubmit={handleSignIn}>
      <h3>
        {data?.createUser
          ? `Signed Up with ${data?.createUser?.email} - Please go ahaead and login!`
          : `Sign-up with your email`}
      </h3>
      <DisplayError error={error} />
      <fieldset>
        <label htmlFor="name">
          Name:
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            value={inputs?.name}
            onChange={handleInputChange}
          />
        </label>
      </fieldset>
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
        Log In
      </button>
    </StyledForm>
  );
};

export default SignUp;
