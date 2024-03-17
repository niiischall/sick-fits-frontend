import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import DisplayError from './ErrorMessage';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

export const QUERY_PRODUCT_COUNT = gql`
  query PRODUCT_COUNT {
    _allProductsMeta {
      count
    }
  }
`;

const Pagination = ({ page }) => {
  const { data, error, loading } = useQuery(QUERY_PRODUCT_COUNT);
  const count = data?._allProductsMeta?.count;
  const numberOfPages = Math.ceil(count / perPage);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <DisplayError error={error} />;
  }

  return (
    <PaginationStyles>
      <Head>
        Sick Fits - Page {page} of {numberOfPages}
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>&larr; Prev</a>
      </Link>
      <p>
        Page {page} Of {numberOfPages}
      </p>
      <p>Total Items: {count}</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= numberOfPages}>Next &rarr;</a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
