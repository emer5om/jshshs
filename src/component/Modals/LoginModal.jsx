import React, { useState, useEffect } from 'react';
import { Modal, ModalClose, Sheet, Typography, Button, Box, ModalDialog } from '@mui/joy';
import PhoneInput from 'react-phone-input-2';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { firebaseConfig } from "@/helpers/functonHelpers";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import OtpInput from "otp-input-react";
import { login, register } from "@/events/actions";

// APis
import { verify_user } from "@/interceptor/routes"

// CSS
import 'react-phone-input-2/lib/material.css';
// icons
import { RiArrowLeftLine, RiTimer2Line } from '@remixicon/react';
import RegisterModal from './RegisterModal';

export default function LoginModal({ loginModalState, onClose }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOTPLoading, setIsOTPLoading] = useState(false);
    const [OTPReset, setOTPReset] = useState(false);
    const authStoreData = useSelector((state) => state.authentication);
    const countryCode = process.env.NEXT_PUBLIC_COUNTRY_CODE;
    const [otp, setOtp] = useState('');
    const [resendDisabled, setResendDisabled] = useState(false);
    const [resendTime, setResendTime] = useState(0);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);

    useEffect(() => {
        initializeRecaptchaVerifier();
    }, []); // Initialize only once

    const initializeRecaptchaVerifier = async () => {
        try {
            const app = await initializeApp(firebaseConfig);
            const auth = await getAuth(app);
            auth.languageCode = 'en';

            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
                    'size': 'invisible',
                    callback: (response) => { },
                    "expired-callback": () => { },
                    auth,
                });
            }
        } catch (error) {
            console.error('Error initializing RecaptchaVerifier:', error);
        }
    };


    const handleSendOTP = async () => {
        try {
            await initializeRecaptchaVerifier();
            const app = await initializeApp(firebaseConfig);
            const auth = await getAuth(app);
            auth.languageCode = 'en';
            const confirmationResult = await signInWithPhoneNumber(auth, `+${phoneNumber}`, window.recaptchaVerifier);
            console.log(confirmationResult);
            window.confirmationResult = confirmationResult;
            setIsLoading(true);
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
            console.error('Error during login:', error);
            if (window.recaptchaVerifier) {
                try {
                    window.recaptchaVerifier.render().then((widgetId) => {
                        window.recaptchaVerifier.recaptcha.reset();
                        window.recaptchaVerifier.clear();
                        // window.recaptchaVerifier.reset(widgetId);
                    });
                } catch (error) {
                    console.log("recaptchaVerifier error on line 60", error);
                }
            }
        }
    };

    useEffect(() => {
        let interval;
        if (resendDisabled) {
            interval = setInterval(() => {
                setResendTime(prevTime => prevTime - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendDisabled]);

    const handleResendOTP = async () => {
        try {
            await initializeRecaptchaVerifier();
            // Your resend OTP logic...
            // Disable resend button
            setResendDisabled(true);
            setResendTime(30); // Set timer back to 10 seconds
            const app = await initializeApp(firebaseConfig);
            const auth = await getAuth(app);
            auth.languageCode = 'en';

            // Reset previous confirmation result
            window.confirmationResult = null;

            // Initialize recaptchaVerifier if not already initialized
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    // onSignInSubmit();
                }
            });
            // if (!window.recaptchaVerifier) {
            // }

            // Request new OTP
            const confirmationResult = await signInWithPhoneNumber(auth, `+${phoneNumber}`, window.recaptchaVerifier);
            console.log("New OTP sent");
            window.confirmationResult = confirmationResult;

            // Set a delay of 30 seconds before enabling the resend button again
            setTimeout(() => {
                setResendDisabled(false);
            }, 30000);
        } catch (error) {
            toast.error(error.message);
            console.error('Error during OTP resend:', error);
            // Re-enable resend button on error
            setResendDisabled(false);
        }
    };


    const verifyUser = async () => {
        try {
            const number = phoneNumber.slice(2)
            const verify = await verify_user({ mobile: number })
            return verify
        } catch (error) {
            toast.error(error.message)
            console.error("verify User Error:", error)
            return { error: true }
        }
    }

    const handleOTPVerification = () => {
        if (otp === "") {
            toast.error("Please enter the verification code!");
            return;
        }

        const number = phoneNumber.slice(2);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res);
                const verify = await verifyUser()
                if (verify.error) {
                    setOpenRegisterModal(true)
                } else {
                    const userLogin = await login({ phoneNumber: number });
                    if (userLogin.error) {
                        toast.error(userLogin.message)
                    } else {
                        toast.success(userLogin.message)
                        onClose()
                    }

                }
            })
            .catch((err) => {
                console.log(err);
                // toast.error("Failed to verify OTP. Please try again later.");
            });
    };


    return (
        <Box>
            <div id={"sign-in-button"}></div>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={loginModalState}
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
                                onClick={handleSendOTP}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Login'}
                            </Button>
                        </Box>
                        :
                        <Box>
                            <Box py={2} mb={1} display={"flex"} alignItems={"center"} flexDirection={"column"} gap={2}>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    OTPLength={6}
                                    otpType="number"
                                    disabled={false}
                                    autoFocus={true}
                                    className="opt-container"
                                ></OtpInput>
                            </Box>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} gap={1}>
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    sx={{ width: "33%" }}
                                    onClick={() => setIsLoading(false)}
                                    startDecorator={
                                        <RiArrowLeftLine />
                                    }
                                >
                                    Go back
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleResendOTP}
                                    disabled={isOTPLoading || resendDisabled}
                                    startDecorator={
                                        resendDisabled && <RiTimer2Line />
                                    }
                                >
                                    Resend OTP {resendDisabled && `in ${resendTime} seconds`}
                                </Button>
                                <Button
                                    variant="solid"
                                    color="primary"
                                    sx={{ width: "33%" }}
                                    onClick={handleOTPVerification}
                                    disabled={isOTPLoading}
                                >
                                    {isOTPLoading ? 'Loading...' : 'Verify'}
                                </Button>
                            </Box>
                        </Box>
                    }
                </ModalDialog>
            </Modal>

            {openRegisterModal &&
                <RegisterModal openRegisterModal={openRegisterModal} setOpenRegisterModal={setOpenRegisterModal}
                    mobile={phoneNumber} />
            }
        </Box>
    );
}
