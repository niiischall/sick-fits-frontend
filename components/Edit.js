import React from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import StyledForm from './styles/Form';
import DisplayError from './ErrorMessage';
import useForm from '../lib/hooks/useForm';
import { ALL_PRODUCTS_QUERY } from './Products';

const PRODUCT_QUERY = gql`
  query QUERY_SINGLE_PRODUCT($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      price
      description
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation MUTATE_SINGLE_PRODUCT(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      name
      description
      price
    }
  }
`;

const Edit = ({ id }) => {
  const {
    data: productData,
    loading: productDataLoading,
    error: productDataError,
  } = useQuery(PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  const [
    updateProduct,
    { loading: updateProductLoading, error: updateProductError },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  const { inputs, handleInputChange } = useForm(productData?.Product ?? {});

  const handleFormSubmit = (event) => {
    event.preventDefault();
    updateProduct({
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    });
  };

  if (productDataLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (productDataError) {
    return <DisplayError error={productDataError} />;
  }

  return (
    <StyledForm onSubmit={handleFormSubmit}>
      <DisplayError error={updateProductError} />
      <fieldset
        disabled={updateProductLoading}
        aria-busy={updateProductLoading}
      >
        <label htmlFor="name">
          Name:
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={inputs?.name}
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
            value={inputs?.price}
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
            value={inputs?.description}
            onChange={handleInputChange}
          />
        </label>
      </fieldset>
      <button type="submit">Edit Product</button>
    </StyledForm>
  );
};

export default Edit;
