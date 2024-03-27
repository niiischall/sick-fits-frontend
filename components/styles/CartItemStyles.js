import styled from 'styled-components';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--light-gray);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

export default CartItemStyles;
