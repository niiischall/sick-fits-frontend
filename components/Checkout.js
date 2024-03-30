import { useState } from 'react';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import nProgress from 'nprogress';
import SickButton from './styles/SickButton';
import CheckoutFormStyles from './styles/CheckoutFormStyles';

const stripeProvider = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export const Checkout = () => (
  <Elements stripe={stripeProvider}>
    <CheckoutForm />
  </Elements>
);

export const CheckoutForm = () => {
  const [isLoading, setLoading] = useState(false);
  const stripe = useStripe();
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
    }
    // if token is recieved, send request to our server.
    console.log(paymentMethod);
    // change page to view order.
    // close cart.
    // stop loader
    setLoading(false);
    nProgress.done();
  };

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      <CardElement />
      <SickButton>Check Out</SickButton>
    </CheckoutFormStyles>
  );
};

export default Checkout;
