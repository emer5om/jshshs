"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CircularProgress } from '@mui/joy';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

import { addTransaction, placeOrder, paymentIntentGenerator } from "../../interceptor/routes";
import { updateUserCart } from '@/events/actions';
import { getUserData } from '@/events/getters';
import { setDeliveryAddress } from "../../store/reducers/selectedDeliverySlice";

const CheckoutForm = ({ amount, type, message, deliveryType, isModalOpen, closeModal }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const userData = getUserData();
    const dispatch = useDispatch();
    const paymentMethods = useSelector((state) => state.settings)?.value?.paymentMethod?.payment_method;
    const cartStoreData = useSelector((state) => state.cart);
    const branchData = useSelector((state) => state.branch);
    const branch_id = branchData.id;
    const selectedDeliveryAddress = useSelector((state) => state.selectedDeliveryAddress)?.value;
    let promo_code = useSelector((state) => state.promoCode)?.value;
    promo_code = promo_code.length > 0 ? promo_code.promo_code : "";
    const is_self_pick_up = deliveryType === "Pick Up" ? 1 : 0;

    const handleSubmit = async (event) => {
        setIsProcessing(true);

        if (!stripe || !elements) {
            setIsProcessing(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        try {
            const product_variant_id = cartStoreData.variant_id.join(', ');
            const qty = cartStoreData.data.map(document => document.qty).join(', ');
            const place_order = await placeOrder({
                branch_id,
                mobile: userData.mobile,
                product_variant_id,
                quantity: qty,
                total: cartStoreData.overall_amount,
                final_total: amount,
                latitude: selectedDeliveryAddress?.city_latitude ?? 0,
                longitude: selectedDeliveryAddress?.city_longitude ?? 0,
                promo_code: "",
                payment_method: "stripe",
                address_id: selectedDeliveryAddress?.id ?? 0,
                is_wallet_used: 0,
                wallet_balance_used: 0,
                is_self_pick_up,
            });

            if (!place_order.error) {
                const order_id = place_order.order_id;
                const paymentIntent = await paymentIntentGenerator({
                    order_id: order_id,
                    type: "stripe",
                });

                const verifyPayment = await stripe.confirmCardPayment(
                    paymentIntent.client_secret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: userData.username,
                        },
                    },
                }
                );

                const transaction = await addTransaction({
                    transaction_type: "transaction",
                    order_id,
                    type: "stripe",
                    payment_method: "stripe",
                    txn_id: verifyPayment.paymentIntent.id,
                    amount: amount,
                    status: "Pending",
                    message: message ?? "Transaction Message",
                    branch_id,
                });

                if (!transaction.error) {
                    closeModal(false);
                    isModalOpen(false);
                    updateUserCart();
                    dispatch(setDeliveryAddress());
                    toast.success(place_order.message);
                }
            }
        } catch (error) {
            console.error("Error while placing order:", error);
            toast.error("An error occurred while processing the payment.", error.message);
        }

        setIsProcessing(false);
    };

    return (
        <>
            <CardElement />
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"space-between"} mt={1}>
                <Button
                    color="success"
                    fullWidth
                    disabled={isProcessing || !stripe}
                    onClick={handleSubmit}
                    startDecorator={isProcessing ? <CircularProgress size="sm" /> : null}
                >
                    {isProcessing ? 'Processing...' : 'Place Order!'}
                </Button>
            </Box>
        </>
    );
};

const Stripe = ({ amount, type, message, deliveryType, isModalOpen, closeModal }) => {
    const paymentMethods = useSelector((state) => state.settings)?.value?.paymentMethod?.payment_method;
    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || paymentMethods.stripe_publishable_key;

    const stripePromise = loadStripe(stripePublishableKey);

    return (
        <Box my={4}>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    amount={amount}
                    type={type}
                    message={message}
                    deliveryType={deliveryType}
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                />
            </Elements>
        </Box>
    );
};

export default Stripe;