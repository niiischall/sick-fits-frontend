import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import OrderStyles from '../../components/styles/OrderStyles';
import DisplayError from '../../components/ErrorMessage';
import formatMoney from '../../lib/utils/formayMoney';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER($id: ID!) {
    order: Order(where: { id: $id }) {
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

export const SingleOrderPage = ({ query }) => {
  const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
    variables: {
      id: query?.id,
    },
  });

  const { order = {} } = data ?? {};

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
    <OrderStyles>
      <Head>
        <title>Sick Fits - ${order?.id}</title>
      </Head>
      <p>
        <span>Order ID:</span>
        <span>{order?.id}</span>
      </p>
      <p>
        <span>Charge:</span>
        <span>{order?.charge}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(order?.total)}</span>
      </p>
      <p>
        <span>Item Count:</span>
        <span>{order?.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div key={item?.id}>
            <img
              width="200"
              src={item.photo.image.publicUrlTransformed}
              alt={item.title}
            />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>Subtotal: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
};

export default SingleOrderPage;
