"use client";
import react, { useEffect } from 'react';

import { generateOrderId, generateRandomOrderId } from '@/helpers/functonHelpers';
import { addTransaction, razorpay_create_order, placeOrder } from '@/interceptor/routes';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/joy';
import { removeItemFromCart, updateUserCart } from '@/events/actions';
import { getUserData } from '@/events/getters';
import { setDeliveryAddress } from "../../store/reducers/selectedDeliverySlice"
import toast from 'react-hot-toast';

export default function RazorpayCheckout({ price, type, message, isModalOpen, closeModal, deliveryType }) {
    const paymentMethods = useSelector((state) => state.settings)?.value?.paymentMethod?.payment_method;
    const keyID = paymentMethods.razorpay_key_id

    const userData = getUserData()

    const cartStoreData = useSelector((state) => state.cart);
    const branchData = useSelector((state) => state.branch);
    const branch_id = branchData.id
    let order_id = ""

    const selectedDeliveryAddress = useSelector((state) => state.selectedDeliveryAddress)?.value;
    let promo_code = useSelector((state) => state.promoCode)?.value;

    promo_code = promo_code.length > 0 ? promo_code.promo_code : ""
    const dispatch = useDispatch()

    const is_self_pick_up = deliveryType == "Pick Up" ? 1 : 0

    const handlePayment = async () => {
        try {
            const product_variant_id =
                cartStoreData.variant_id.join(', ');
            const qty = cartStoreData.data.map(document => document.qty).join(', ');
            if (type == "placeOrder") {

                const place_order = await placeOrder({
                    branch_id,
                    mobile: userData.mobile,
                    product_variant_id,
                    quantity: qty,
                    total: cartStoreData.overall_amount,
                    final_total: price,
                    latitude: selectedDeliveryAddress?.city_latitude ?? 0,
                    longitude: selectedDeliveryAddress?.city_longitude ?? 0,
                    promo_code: "",
                    payment_method: "razorpay",
                    address_id: selectedDeliveryAddress?.id ?? 0,
                    is_wallet_used: 0,
                    wallet_balance_used: 0,
                    is_self_pick_up,
                })
                if (!place_order.error) {
                    const order_id = place_order.order_id

                    const paymentIntentGenerate = await razorpay_create_order({ order_id })

                    console.log(paymentIntentGenerate)
                    let txn_id = ""

                    const options = {
                        key: keyID,
                        amount: price * 100,
                        currency: "INR",
                        receipt: order_id,
                        // Other Razorpay options, if needed
                        handler: async (res) => {
                            // Handle successful payment
                            console.log('Payment successful:', res);
                            txn_id = res.razorpay_payment_id
                            const transaction = await addTransaction({
                                transaction_type: "transaction",
                                order_id,
                                type: "paypal",
                                payment_method: "paypal",
                                txn_id: res.razorpay_payment_id,
                                amount: price,
                                status: "Pending",
                                message: message ?? "Transaction Message",
                                branch_id,
                            })

                            if (!transaction.error) {
                                closeModal(false)
                                isModalOpen(false)
                                updateUserCart();
                                dispatch(setDeliveryAddress())
                                toast.success(place_order.message)
                            }
                        },

                        notes: {
                            address: 'Example Address', // Address
                        },
                    };

                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open();


                }


            }




        } catch (err) {
            console.error('Error creating order:', err);
        }
    };
    // useEffect(() => {

    //     // Call the handlePayment function when the component mounts
    //     handlePayment();
    // }, []);

    return (
        <>
            <div>
                <Button fullWidth variant='soft' onClick={() => handlePayment()}> Place Order </Button>
            </div>
        </>
    );
}