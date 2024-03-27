import { gql, useMutation } from '@apollo/client';
import { USER_AUTHENTICATED_QUERY } from '../lib/hooks/useUser';
import { useCart } from '../lib/CartProvider';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART($productId: ID!) {
    addToCart(productId: $productId) {
      id
    }
  }
`;

const AddToCart = ({ productId }) => {
  const { openCart } = useCart();
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      productId,
    },
    refetchQueries: [{ query: USER_AUTHENTICATED_QUERY }],
  });

  const handleAddToCart = () => {
    addToCart();
    openCart();
  };

  return (
    <button type="button" onClick={handleAddToCart} disabled={loading}>
      {loading ? `Adding to Cart` : `Add To Cart`} 🛒
    </button>
  );
};

export default AddToCart;
