import React from 'react';
import { payRazorpay } from "@/events/actions";

const PaymentWidget = () => {


    return (
        <div>
            <button onClick={() => {
                payRazorpay(475, 338.66)
            }}>Pay Now</button>
        </div>
    );
};

export default PaymentWidget;
