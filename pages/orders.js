import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import DisplayError from '../components/ErrorMessage';
import formatMoney from '../lib/utils/formayMoney';

const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUI = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

const countItemsInOrder = (order) =>
  order.items.reduce((tally, item) => tally + item.quantity, 0);

export const OrdersPage = () => {
  const { data, loading, error } = useQuery(ALL_ORDERS_QUERY);

  const { allOrders = {} } = data ?? {};

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
    <div>
      <Head>
        <title>Your orders ({allOrders?.length})</title>
      </Head>
      <h2>You have {allOrders.length} orders!</h2>
      <OrderUI>
        {allOrders.map((order) => (
          <OrderItemStyles>
            <Link href={`/order/${order?.id}`}>
              <a>
                <div className="order-meta">
                  <p>
                    {countItemsInOrder(order)} Item
                    {countItemsInOrder(order) === 1 ? '' : 's'}
                  </p>
                  <p>
                    {order?.items.length} Products
                    {order?.items.length === 1 ? '' : 's'}
                  </p>
                  <p>{formatMoney(order?.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={item.id}
                      src={item.photo.image.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUI>
    </div>
  );
};

export default OrdersPage;
