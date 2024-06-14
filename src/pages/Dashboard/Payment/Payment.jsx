import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// TODO: Add publishable key from stripe
const stripePromise = loadStripe('')

const Payment = () => {
    return (
        <div>
            <h2>Payment</h2>
            <div>
                <Elements stripe={stripePromise}>

                </Elements>
            </div>
        </div>
    );
};

export default Payment;