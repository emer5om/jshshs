"use client";
import React, { useState } from 'react'
import {
    Box, Button, Modal, ModalDialog, DialogTitle, DialogActions, DialogContent, Stack,
    FormControl, FormLabel, Input, ModalClose
} from '@mui/joy';
import { register } from "@/events/actions";
import toast from 'react-hot-toast';

const RegisterModal = ({ openRegisterModal, setOpenRegisterModal, mobile }) => {

    const [open, setOpen] = useState(openRegisterModal)
    const phoneNumber = mobile.slice(2)
    const countryCode = parseInt(mobile.slice(0, 2))


    /**
     * name:sdfsdf
email:sdfsd@fghfg.in
mobile:167413625
country_code:91 
referral_code:dhfghgfh
password:password
//latitude:57567
//longitude:5676
//user_id:256
     */


    const [prefill, setPrefill] = useState({
        name: "",
        email: "",
        mobile: phoneNumber,
        country_code: countryCode,
        referral: "",
        password: "",
    })


    const addValueProps = (name, file = false) => {
        if (!file) {
            return {
                value: prefill[name] || '',
                onChange: e => {
                    setPrefill({ ...prefill, [name]: e.target.value })
                }
            }
        }

        return {
            defaultImage: prefill[name] || '',
            onChange: e => {
                setPrefill({ ...prefill, [name]: e.target.files[0] })
            }
        }
    }

    const handleRegister = async () => {
        const userRegister = await register(prefill)

        if (userRegister?.error || userRegister?.data?.error ) {
            return toast.error(userRegister?.message ? userRegister?.message : userRegister?.data?.message )
        } else {
            setOpenRegisterModal(false)
            return toast.success(userRegister?.message ? userRegister?.message : userRegister?.data?.message)
        }
    }

    return (
        <Box>
            <Modal open={open} onClose={() => { setOpen(false), setOpenRegisterModal(false) }}>
                <ModalDialog size='lg' sx={{ height: "100%" }}>
                    <ModalClose />
                    <DialogTitle>Register. Taste. Enjoy.</DialogTitle>
                    <DialogContent>
                        Start your culinary journey with a simple registration process. Sign up today to explore a world of flavors delivered to you with ease.
                    </DialogContent>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input size='lg' placeholder="Type in here…" variant="outlined"
                                {...addValueProps('name')} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>email</FormLabel>
                            <Input size='lg' type="email" placeholder="Type in here…" variant="outlined"
                                {...addValueProps('email')} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>mobile number</FormLabel>
                            <Input disabled readOnly size='lg' placeholder="Type in here…" variant="outlined"
                                {...addValueProps('mobile')} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Referral code</FormLabel>
                            <Input size='lg' placeholder="Type in here…" variant="outlined"
                                {...addValueProps('referral')} />
                        </FormControl>

                        <FormControl sx={{ display: "none" }}>
                            <FormLabel>Password</FormLabel>
                            <Input size='lg' type='password' placeholder="Type in here…" variant="outlined"
                                {...addValueProps('password')} />
                        </FormControl>

                        <Button onClick={() => handleRegister()}>Submit</Button>
                    </Stack>
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default RegisterModal