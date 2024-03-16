import React, { useState } from 'react';
import { Modal, ModalClose, Sheet, Typography,  Button } from '@mui/joy';


import { initializeApp } from "firebase/app";

import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import {firebaseConfig} from "@/helpers/functonHelpers";
import {login} from "@/events/actions";
import {useSelector} from "react-redux";


export default function LoginModal({ loginModalState, onClose }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const authStoreData = useSelector((state) => state.authentication);


    const handleLogin = async () => {
        setIsLoading(true);

        try {
            const app = await initializeApp(firebaseConfig)
            const auth = await getAuth(app);
            if(window.recaptchaVerifier === undefined){
                window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
                    'size': 'invisible',
                    'callback': (response) => {
                        // reCAPTCHA solved, allow signInWithPhoneNumber.
                        onSignInSubmit();
                    }
                });
            }

            auth.languageCode = 'en';
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);



            // Handle the next step of the authentication process (e.g., displaying a code input modal)
            const verificationCode = window.prompt('Enter the verification code:');

            try {
                const result = await confirmationResult.confirm(verificationCode);

                console.log('User authenticated:', result.user);
                login({phoneNumber: "9876543210"})
                // Handle the authentication result as needed
            } catch (error) {
                console.error('Error during verification:', error);
                // Handle the error
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Handle the error
        } finally {
            setIsLoading(false);
        }
    };

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
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        Please login to continue
                    </Typography>

                    {/*<TextField*/}
                    {/*    id="phone-number"*/}
                    {/*    label="Phone Number"*/}
                    {/*    variant="outlined"*/}
                    {/*    fullWidth*/}
                    {/*    margin="normal"*/}
                    {/*    value={phoneNumber}*/}
                    {/*    onChange={(e) => setPhoneNumber(e.target.value)}*/}
                    {/*/>*/}
                    <input  value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} />

                    <Button
                        variant="solid"
                        color="primary"
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                </Sheet>
            </Modal>
        </>
    );
}