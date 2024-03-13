import { gql, useMutation } from '@apollo/client';

const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const handleUpdate = (cache, payload) => {
  const selectedItem = cache.identify(payload.data.deleteProduct);
  cache.evict(selectedItem);
};

const Delete = ({ id, children }) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT, {
    variables: {
      id,
    },
    update: handleUpdate,
  });

  const handleDelete = () => {
    const response = confirm('Are you sure of deleting this product?');

    if (response) {
      deleteProduct()
        .then(() => alert('product deleted successfully'))
        .catch((err) => alert('error in deletion'));
    }
  };

  return (
    <div>
      <button type="button" onClick={handleDelete} disabled={loading}>
        {children}
      </button>
    </div>
  );
};

export default Delete;
