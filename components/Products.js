import styled from 'styled-components';
import Link from 'next/link';
import propTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formayMoney';

const StyledProductList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

const ALL_PRODUCTS_QUERY = gql`
  query {
    allProducts {
      name
      description
      price
      status
      photo {
        image {
          publicUrlTransformed
        }
        altText
      }
    }
  }
`;

const Product = ({ product }) => (
  <ItemStyles>
    <img
      src={product?.photo?.image?.publicUrlTransformed}
      alt={product?.name}
    />
    <Title>
      <Link href={`/product/${product?.id}`}>{product.name}</Link>
    </Title>
    <PriceTag>{formatMoney(product?.price)}</PriceTag>
    <p>{product?.description}</p>
  </ItemStyles>
);

const Products = () => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>error: {error.message}</p>
      </div>
    );
  }

  return (
    <StyledProductList>
      {data.allProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </StyledProductList>
  );
};

Product.prototype = {
  product: propTypes.object,
};

export default Products;
