// eslint-disable
import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51Op90bFcBGywqFjOQ4J2BlxKBvPV5SjZYPwNw2RNYdRdzApldAfPFM0lI6fDiumZf3GYdPtypIDuOl8t39Vasb1800RehcETeF'
);

export const bookTour = async (tourId) => {
  try {
    //1) Get checkout session from API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
