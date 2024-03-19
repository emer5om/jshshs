"use client";
import react, { useEffect } from 'react';

import { generateOrderID } from '@/helpers/functonHelpers';
import { add_transactions, razorpay_create_order } from '@/interceptor/routes';
import { useSelector } from 'react-redux';

export default function RazorpayCheckout() {
    const paymentMethods = useSelector((state) => state.settings)?.value?.paymentMethod?.payment_method;
    const keyID = paymentMethods.razorpay_key_id
    useEffect(() => {
        const handlePayment = async () => {
            try {
                const response = await razorpay_create_order({
                    order_id: generateOrderID(),
                });
                const data = await response.json();
                const { order } = data;

                const options = {
                    key: keyID,
                    amount: order.amount,
                    currency: order.currency,
                    order_id: order.id,
                    // Other Razorpay options, if needed
                    handler: (res) => {
                        // Handle successful payment
                        console.log('Payment successful:', res);
                    },
                    prefill: {
                        name: 'John Doe', // User's name
                        email: 'john@example.com', // User's email
                        contact: '9999999999', // User's phone number
                    },
                    notes: {
                        address: 'Example Address', // Address
                    },
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (err) {
                console.error('Error creating order:', err);
            }
        };

        // Call the handlePayment function when the component mounts
        handlePayment();
    }, []);

    return (
        <>
            <div>
                <h1>Razorpay Checkout</h1>
                {/* You can add additional UI elements or components here */}
            </div>
        </>
    );
}