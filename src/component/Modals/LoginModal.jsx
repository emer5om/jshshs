"use client";
import React, { useState, useEffect } from 'react'
import { auth } from "@/@core/firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const LoginModal = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationId, setVerificationId] = useState('');
    return (
        <div>

            {/* <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: "scroll", maxHeight: "100%" }}
            >
                <ModalDialog variant={"soft"} size="lg" maxWidth={"sm"} sx={{ minHeight: 580 }}>
                    <ModalClose
                        color="warning"
                        component={Button}
                        sx={{
                            // width: "7%",
                            position: "absolute",
                            top: "-2%",
                            right: "-2%",
                        }}
                    />
                   

                </ModalDialog>
            </Modal> */}

        </div>
    )
}

export default LoginModal