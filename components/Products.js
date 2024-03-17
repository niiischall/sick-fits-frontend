import styled from 'styled-components';
import Link from 'next/link';
import propTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/utils/formayMoney';
import Delete from './Delete';
import ProductButtonContainer from './styles/ProductButtonContainer';
import Pagination from './Pagination';
import { perPage } from '../config';

const StyledProductList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS($first: Int, $skip: Int) {
    allProducts(first: $first, skip: $skip) {
      id
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
    <ProductButtonContainer>
      <Link href={{ pathname: '/edit', query: { id: product?.id } }}>
        Edit ✍🏻
      </Link>
      <Delete id={product?.id}>
        <span>Delete 🗑️</span>
      </Delete>
    </ProductButtonContainer>
  </ItemStyles>
);

const Products = () => {
  const { query } = useRouter();
  const page = query?.page ? parseInt(query?.page) : 1;

  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      first: perPage,
      skip: page * perPage - perPage,
    },
  });

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
    <div>
      <Pagination page={page} />
      <StyledProductList>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </StyledProductList>
      <Pagination page={page} />
    </div>
  );
};

Product.prototype = {
  product: propTypes.object,
};

export default Products;
