import React, { useState } from 'react';
import { Modal, ModalClose, Sheet, Typography, Button, Box, ModalDialog } from '@mui/joy';

import PhoneInput from 'react-phone-input-2'

import { initializeApp } from "firebase/app";

import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { firebaseConfig } from "@/helpers/functonHelpers";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import OtpInput from "otp-input-react";


// APIs
// import { login } from "@/interceptor/routes"
import { login } from "@/events/actions";

// css
import 'react-phone-input-2/lib/material.css'
import { RiArrowLeftLine } from '@remixicon/react';

export default function LoginModal({ loginModalState, onClose }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOTPLoading, setIsOTPLoading] = useState(false);
    const authStoreData = useSelector((state) => state.authentication);
    const countryCode = process.env.NEXT_PUBLIC_COUNTRY_CODE
    const [otp, setOtp] = useState('');

    const handleLogin = async () => {
        setIsLoading(true);

        try {
            const app = await initializeApp(firebaseConfig)
            const auth = await getAuth(app);
            if (window.recaptchaVerifier === undefined) {
                window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
                    'size': 'invisible',
                    'callback': (response) => {
                        // reCAPTCHA solved, allow signInWithPhoneNumber.
                        onSignInSubmit();
                    }
                });
            }

            auth.languageCode = 'en';

            const confirmationResult = await signInWithPhoneNumber(
                auth,
                `+${phoneNumber}`,
                window.recaptchaVerifier);

            console.log(confirmationResult)
            window.confirmationResult = confirmationResult;
            // Handle the next step of the authentication process (e.g., displaying a code input modal)
            // const verificationCode = window.prompt('Enter the verification code:');

            // try {
            //     const result = await confirmationResult.confirm(verificationCode);

            //     console.log('User authenticated:', result.user);
            //     login({ phoneNumber: "9876543210" })
            //     // Handle the authentication result as needed
            // } catch (error) {
            //     toast.error(error)
            //     console.error('Error during verification:', error);
            //     // Handle the error
            // }
        } catch (error) {
            toast.error(error)
            console.error('Error during login:', error);
            window.recaptchaVerifier.render().then((widgetId) => {
                try {
                    window.recaptchaVerifier.reset(widgetId);
                } catch (error) {
                    console.log("recaptchaVerifier error", error);
                }
            });
        }
    };

    const handleOTPVerification = () => {
        if (otp === "") {
            toast.error("Please enter the verification code!");
            return;
        }


        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to verify OTP. Please try again later.");
            });
    }

    return (
        <>
            <div id={"sign-in-button"}></div>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={(!authStoreData.isLogged) && loginModalState}
                onClose={() => onClose()}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >


                <ModalDialog size='lg' sx={{ width: { sm: "100%", md: 500 } }}>
                    <ModalClose variant="plain" sx={{ m: 1 }} />

                    <Typography
                        fontSize={"xl"}
                        fontWeight="lg"
                        mb={1}
                    >
                        Please login to continue ordering
                    </Typography>

                    {isLoading === false ?
                        <Box py={2} display={"flex"} flexDirection={"column"} gap={2}>
                            <PhoneInput
                                country={countryCode}
                                inputClass='generalClass'
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                inputStyle={{ width: "100%", height: "45px" }}
                                onChange={(value) => setPhoneNumber(value)}
                            />


                            <Button
                                variant="solid"
                                color="primary"
                                fullWidth
                                onClick={handleLogin}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Login'}
                            </Button>
                        </Box>
                        :
                        <Box>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                OTPLength={6}
                                otpType="number"
                                disabled={false}
                                autoFocus
                                className="opt-container"
                            ></OtpInput>
                            <Button
                                variant="outlined"
                                color="warning"
                                sx={{ width: "50%" }}
                                onClick={() => setIsLoading(false)}
                                startDecorator={
                                    <RiArrowLeftLine />
                                }
                            >
                                Go back
                            </Button>
                            <Button
                                variant="solid"
                                color="primary"
                                sx={{ width: "50%" }}
                                onClick={handleOTPVerification}
                                disabled={isOTPLoading}
                            >
                                {isOTPLoading ? 'Loading...' : 'Verify'}
                            </Button>
                        </Box>
                    }
                </ModalDialog>

            </Modal>
        </>
    );
}