"use client"
import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/paypal-js';

const PaypalCheckout = ({ price }) => {

    const paymentMethods = useSelector((state) => state.settings)?.value?.paymentMethod?.payment_method;
    const keyID = paymentMethods.paypal_client_id

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: '100.00', // Replace with your desired amount
                    },
                },
            ],
        });
    };

    const onApprove = async (data, actions) => {
        try {
            const details = await actions.order.capture();
            setPaidFor(true);
            console.log('Transaction completed by', details);
            // Call your server to handle the successful payment
        } catch (err) {
            setError('Something went wrong when completing the payment');
            console.log('Error:', err);
        }
    };

    const onError = (err) => {
        setError('An error occurred while processing the payment');
        console.log('Error:', err);
    };

    return (
        <PayPalScriptProvider options={{ 'client-id': keyID }}>
            {!paidFor && (
                <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                    style={{ layout: 'horizontal' }}
                />
            )}
            {paidFor && <div>Thank you for your payment!</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </PayPalScriptProvider>
    );
};

export default PaypalCheckout;