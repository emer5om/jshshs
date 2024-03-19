"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/joy';


import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const CheckoutForm = ({amount}) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        setIsProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        // Send the paymentMethod.id to your server to create a payment intent
        // and complete the payment process

        setIsProcessing(false);
    };

    return (
        <>
            <CardElement />
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"space-between"} mt={1} >
                <Button color="success" fullWidth disabled={isProcessing || !stripe} onClick={() => handleSubmit()}>
                    {isProcessing ? 'Processing...' : 'Recharge Now!'}
                </Button>
            </Box>
        </>
    );
};



const Stripe = ({ amount }) => {
    const paymentMethods = useSelector((state) => state.settings)?.value?.paymentMethod?.payment_method;
    const stripePublishableKey = paymentMethods.stripe_publishable_key

    const stripePromise = loadStripe(stripePublishableKey);

    return (
        <Box my={4}>
            <Elements stripe={stripePromise}>
                <CheckoutForm  amount={amount} />
            </Elements>
        </Box>
    )
}

export default Stripe