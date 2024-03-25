import styled from 'styled-components';
import Login from '../components/LogIn';
import Signup from '../components/SignUp';

export const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

const LogInPage = () => (
  <GridStyles>
    <Login />
    <Signup />
  </GridStyles>
);

export default LogInPage;
