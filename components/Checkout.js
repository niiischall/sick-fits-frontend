import { useState } from 'react';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import nProgress from 'nprogress';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import SickButton from './styles/SickButton';
import CheckoutFormStyled from './styles/CheckoutFormStyles';
import { useCart } from '../lib/CartProvider';
import { USER_AUTHENTICATED_QUERY } from '../lib/hooks/useUser';

export const CHECKOUT_MUTATION = gql`
  mutation CHECKOUT($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeProvider = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export const Checkout = () => (
  <Elements stripe={stripeProvider}>
    <CheckoutForm />
  </Elements>
);

export const CheckoutForm = () => {
  const router = useRouter();
  const { closeCart } = useCart();
  const stripe = useStripe();
  const [checkout, { error: graphqlerror }] = useMutation(CHECKOUT_MUTATION, {
    refetchQueries: [{ query: USER_AUTHENTICATED_QUERY }],
  });

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // start loading.
    setError(null);
    setLoading(true);
    // start page transition loader.
    nProgress.start();
    // create payment method via stripe, token is returned.
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    // if error is received, show error.
    if (error) {
      setError(error);
      setLoading(false);
      nProgress.done();
      return;
    }
    // if token is recieved, send request to our server.
    const order = await checkout({
      variables: {
        token: paymentMethod?.id,
      },
    });
    // close cart.
    // stop loader
    setLoading(false);
    nProgress.done();

    closeCart();
    router.push({
      pathname: '/order',
      query: {
        id: order.data.checkout.id,
      },
    });
  };

  return (
    <CheckoutFormStyled onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphqlerror && <p style={{ fontSize: 12 }}>{graphqlerror.message}</p>}
      <CardElement />
      <SickButton>Check Out</SickButton>
    </CheckoutFormStyled>
  );
};

export default Checkout;
