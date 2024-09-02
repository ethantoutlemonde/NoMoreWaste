import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DonationComponent from './DonationComponent';

const stripePromise = loadStripe('pk_test_oKhSR5nslBRnBZpjO6KuzZeX');


const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <DonationComponent/>
    </Elements>
  );
};

export default App;
