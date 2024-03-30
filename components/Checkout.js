import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SickButton from './styles/SickButton';
import CheckoutForm from './styles/CheckoutFormStyles';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export const Checkout = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('checkout plss...');
  };

  return (
    <Elements stripe={stripe}>
      <CheckoutForm onSubmit={handleSubmit}>
        <CardElement />
        <SickButton>Check Out</SickButton>
      </CheckoutForm>
    </Elements>
  );
};

export default Checkout;
