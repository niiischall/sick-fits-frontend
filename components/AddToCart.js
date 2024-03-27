import { gql, useMutation } from '@apollo/client';
import { USER_AUTHENTICATED_QUERY } from '../lib/hooks/useUser';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART($productId: ID!) {
    addToCart(productId: $productId) {
      id
    }
  }
`;

const AddToCart = ({ productId }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      productId,
    },
    refetchQueries: [{ query: USER_AUTHENTICATED_QUERY }],
  });

  return (
    <button type="button" onClick={addToCart} disabled={loading}>
      {loading ? `Adding to Cart` : `Add To Cart`} 🛒
    </button>
  );
};

export default AddToCart;
