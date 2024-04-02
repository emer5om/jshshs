"use client"
import React, { useState, useEffect } from 'react'
import { Box, Button, DialogContent, DialogTitle, FormControl, FormLabel, Input, Modal, ModalClose, ModalDialog, Stack, Textarea, Typography } from '@mui/joy';
import { get_settings, send_withdraw_request } from '@/interceptor/routes';
import toast from 'react-hot-toast';
import { setUserSettings } from '@/store/reducers/userSettingsSlice';
import { useDispatch } from 'react-redux';
import { getUserData } from '@/events/getters';

const WalletWithdrawModal = () => {
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const [paymentAddress, setPaymentAddress] = useState("");

    const dispatch = useDispatch()
    const userData = getUserData()
    const user_id = userData.id
    const getUserSettings = async () => {
        const userSettings = await get_settings({ user_id })
        dispatch(setUserSettings(userSettings.data))
    }


    const handleWalletTransactions = async () => {
        if (amount <= 0) {
            return toast.error("Amount must not be less than or equal 0!")
        }
        if (paymentAddress === "") {
            return toast.error("Payment Address field is required")
        }
        const sendRequest = await send_withdraw_request({ amount, payment_address: paymentAddress });

        if (sendRequest.error) {
            toast.error(sendRequest.message)
        } else {
            toast.success(sendRequest.message)
            setOpen(false)
            getUserSettings();
            setAmount(0)
            setPaymentAddress("")
        }
    }

    return (
        <Box>
            <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => setOpen(true)}
            >
                Withdraw Money
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog sx={{
                    maxHeight: "100%"
                }}>
                    <ModalClose />
                    <DialogTitle component={Typography}>WithDraw Wallet</DialogTitle>
                    <DialogContent component={Typography}>Fill in the information to withdraw money from account.</DialogContent>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel><Typography>Amount</Typography></FormLabel>
                            <Input autoFocus required value={amount} onChange={e => { setAmount(e.target.value) }} />
                        </FormControl>
                        <FormControl>
                            <FormLabel><Typography>Bank Details</Typography></FormLabel>
                            <Textarea minRows={4} required value={paymentAddress} onChange={e => setPaymentAddress(e.target.value)} />
                        </FormControl>
                        <Button onClick={() => handleWalletTransactions()}>Submit</Button>
                    </Stack>
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default WalletWithdrawModal