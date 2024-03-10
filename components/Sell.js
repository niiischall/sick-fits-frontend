import gql from 'graphql-tag';
import Router from 'next/router';
import { useMutation } from '@apollo/client';
import StyledForm from './styles/Form';
import { ALL_PRODUCTS_QUERY } from './Products';
import DisplayError from './ErrorMessage';
import useForm from '../lib/hooks/useForm';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      price
      description
    }
  }
`;

const Sell = () => {
  const { inputs, handleInputChange, clearForm } = useForm({
    name: '',
    price: 0,
    image: null,
    description: '',
  });

  const [createProduct, { loading, error }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createProduct();
    clearForm();
    if (response) {
      clearForm();
      Router.push({
        pathname: `/product/${response?.data?.createProduct?.id}`,
      });
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">
          Name:
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={inputs.name}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="price">
          Price:
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Price"
            value={inputs.price}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="image">
          Image:
          <input
            required
            id="image"
            name="image"
            type="file"
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Description"
            value={inputs.description}
            onChange={handleInputChange}
          />
        </label>
      </fieldset>
      <button type="submit">+ Add Product</button>
    </StyledForm>
  );
};

export default Sell;
