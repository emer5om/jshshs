"use client"
import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, placeOrder } from "../../interceptor/routes"
import { updateUserCart } from '@/events/actions';
import { getUserData } from '@/events/getters';
import toast from 'react-hot-toast';
import { setDeliveryAddress } from "../../store/reducers/selectedDeliverySlice"


const PaypalCheckout = ({ price, type, message, deliveryType, isModalOpen, closeModal }) => {
    const userData = getUserData()
    const dispatch = useDispatch()
    const paymentMethods = useSelector((state) => state.settings)?.value?.paymentMethod?.payment_method;
    const cartStoreData = useSelector((state) => state.cart);
    const branchData = useSelector((state) => state.branch);

    const branch_id = branchData.id

    const keyID = paymentMethods.paypal_client_id
    const selectedDeliveryAddress = useSelector((state) => state.selectedDeliveryAddress)?.value;
    let promo_code = useSelector((state) => state.promoCode)?.value;

    promo_code = promo_code.length > 0 ? promo_code.promo_code : ""

    const paypalCurrency = paymentMethods.currency_code

    const is_self_pick_up = deliveryType == "Pick Up" ? 1 : 0

    if (is_self_pick_up === 1) {
        return toast.error("Please select Address")
    }

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: price,
                        currency_code: paypalCurrency,
                    },
                },
            ],
        });
    };

    const onApprove = async (data, actions) => {
        try {
            const details = await actions.order.capture();
            setPaidFor(true);


            if (type === "wallet") {
                const transaction = await addTransaction({
                    transaction_type: "wallet",
                    order_id: details.id,
                    type: "credit",
                    payment_method: "paypal",
                    txn_id: details.id,
                    amount: price,
                    status: details.status,
                    message: message ?? "Transaction Message",
                    branch_id,
                })

            }
            else {

                const transaction = await addTransaction({
                    transaction_type: "transaction",
                    order_id: details.id,
                    type: "paypal",
                    payment_method: "paypal",
                    txn_id: details.id,
                    amount: price,
                    status: details.status,
                    message: message ?? "Transaction Message",
                    branch_id,
                })

                if (transaction.error) { }
                else {
                    const product_variant_id =
                        cartStoreData.variant_id.join(', ');
                    const qty = cartStoreData.data.map(document => document.qty).join(', ');



                    const place_order = await placeOrder({
                        branch_id,
                        mobile: userData.mobile,
                        product_variant_id,
                        quantity: qty,
                        total: cartStoreData.overall_amount,
                        final_total: price,
                        latitude: selectedDeliveryAddress?.city_latitude ?? 0,
                        longitude: selectedDeliveryAddress?.city_longitude ?? 0,
                        promo_code,
                        payment_method: "paypal",
                        address_id: selectedDeliveryAddress?.id ?? 0,
                        is_wallet_used: 0,
                        wallet_balance_used: 0,
                        is_self_pick_up,
                    })


                    if (!place_order.error) {
                        updateUserCart();
                        closeModal(false)
                        isModalOpen(false)
                        toast.success(place_order.message)
                        dispatch(setDeliveryAddress())

                    }
                    else {
                        toast.error(place_order.message)
                    }

                }

            }

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