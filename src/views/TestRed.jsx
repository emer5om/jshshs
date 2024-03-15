"use client"
import React, { useEffect, useState } from 'react'
import { auth } from "@/@core/firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const TestRed = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationId, setVerificationId] = useState('');

    useEffect(() => {
        const renderRecaptcha = () => {
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
                'recaptcha-container',
                {
                    size: 'invisible',
                    callback: (response) => {
                        // reCAPTCHA solved
                    },
                }
            );
        };

        renderRecaptcha();
    }, []);

    const sendVerificationCode = async () => {
        try {
            const confirmationResult = await auth.signInWithPhoneNumber(
                `+91${phoneNumber}`,
                window.recaptchaVerifier
            );
            setVerificationId(confirmationResult.verificationId);
        } catch (error) {
            console.error('Error sending verification code:', error);
        }
    };

    const verifyCode = async () => {
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode
            );
            await auth.currentUser.updatePhoneNumber(credential);
            console.log('Phone number updated successfully');
        } catch (error) {
            console.error('Error verifying code:', error);
        }
    };

    return (
        <div>
            <div id="recaptcha-container"></div>
            <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={sendVerificationCode}>Send Verification Code</button>
            <input
                type="text"
                placeholder="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button onClick={verifyCode}>Verify Code</button>
        </div>
    )
}

export default TestRed