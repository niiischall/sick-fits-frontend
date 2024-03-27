import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART($cartId: ID!) {
    deleteCartItem(id: $cartId) {
      id
    }
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
`;

const handleUpdate = (cache, payload) => {
  const selectedItem = cache.identify(payload.data.deleteCartItem);
  cache.evict(selectedItem);
};

const RemoveFromCart = ({ cartId }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: {
      cartId,
    },
    update: handleUpdate,
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id: cartId,
    //   },
    // },
  });

  return (
    <RemoveButton
      type="button"
      title="Remove Item from cart"
      onClick={removeFromCart}
      disabled={loading}
    >
      &times;
    </RemoveButton>
  );
};

export default RemoveFromCart;
