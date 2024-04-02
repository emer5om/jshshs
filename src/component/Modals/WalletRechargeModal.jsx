"use client"
import React, { useState } from 'react'
import { Box, Button, Modal, ModalClose, ModalDialog, DialogActions, DialogTitle, DialogContent, Stack, FormControl, FormLabel, Input, RadioGroup, List, ListItem, Radio, Typography, Textarea } from '@mui/joy'
import Stripe from '../PaymentGateways/Stripe';
import { useSelector } from 'react-redux';
import RazorpayCheckout from '../PaymentGateways/RazorpayCheckout';
import PaypalCheckout from '../PaymentGateways/PaypalCheckout';
import {payRazorpay} from "@/events/actions";

const WalletRechargeModal = () => {
    const [open, setOpen] = useState(false);
    const [openStripe, setOpenStripe] = useState(false);
    const [openRazorPay, setOpenRazorPay] = useState(false);
    const [openPaypal, setOpenPaypal] = useState(false);
    const [amount, setAmount] = useState(0)
    const [message, setMessage] = useState("")

    let settings = useSelector((state) => state.settings);
    settings = settings.value.paymentMethod.payment_method

    let methods = []

    const stripePG = settings.stripe_payment_method == 1 ? true : false
    const razorpayPG = settings.razorpay_payment_method == 1 ? true : false
    const paypalPG = settings.paypal_payment_method == 1 ? true : false

    const onPGMethodChange = (value) => {
        const name = value.toLowerCase()
        if (name === "stripe") {
            setOpenStripe(true)
            setOpenRazorPay(false)
            setOpenPaypal(false)
        }
        else if (name === "razorpay") {
            setOpenRazorPay(true)
            setOpenStripe(false)
            setOpenPaypal(false)
        }
        else if (name === "paypal") {
            setOpenRazorPay(false)
            setOpenStripe(false)
            setOpenPaypal(true)
        }
        else {
            setOpenStripe(false)
        }
    }

    return (
        <Box>
            <Button
                variant="solid"
                color="primary"
                fullWidth
                onClick={() => setOpen(true)}
            >
                Add Money
            </Button>
            <Modal open={open} onClose={() => setOpen(false)} sx={{
                overflowX: "scroll"
            }}>
                <ModalDialog size='lg' sx={{ width: 700, maxHeight: "100%", }}>
                    <ModalClose />
                    <DialogTitle>Recharge Wallet</DialogTitle>
                    <DialogContent>Recharge Wallet to use later!</DialogContent>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>
                                <Typography> amount  </Typography>
                            </FormLabel>
                            <Input autoFocus required value={amount} onChange={e => setAmount(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Message</FormLabel>
                            <Textarea required value={message} onChange={e => setMessage(e.target.value)}></Textarea>
                        </FormControl>

                        <RadioGroup aria-label="Your plan" name="people"
                            onChange={e => onPGMethodChange(e.target.value)}
                        >
                            <List
                                sx={{
                                    minWidth: 240,
                                    '--List-gap': '0.5rem',
                                    '--ListItem-paddingY': '1rem',
                                    '--ListItem-radius': '8px',
                                    '--ListItemDecorator-size': '32px',
                                }}
                            >
                                {paypalPG &&
                                    <ListItem variant="outlined" sx={{ boxShadow: 'sm' }}>
                                        <Radio
                                            overlay
                                            value={"Paypal"}
                                            label={"Paypal"}
                                            sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                                            slotProps={{
                                                action: ({ checked }) => ({
                                                    sx: (theme) => ({
                                                        ...(checked && {
                                                            inset: -1,
                                                            border: '2px solid',
                                                            borderColor: theme.vars.palette.primary[500],
                                                        }),
                                                    }),
                                                }),
                                            }}
                                        />
                                    </ListItem>
                                }

                                {razorpayPG &&
                                    <ListItem variant="outlined" sx={{ boxShadow: 'sm' }}>
                                        <Radio
                                            overlay
                                            value={"Razorpay"}
                                            label={"Razorpay"}
                                            sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                                            slotProps={{
                                                action: ({ checked }) => ({
                                                    sx: (theme) => ({
                                                        ...(checked && {
                                                            inset: -1,
                                                            border: '2px solid',
                                                            borderColor: theme.vars.palette.primary[500],
                                                        }),
                                                    }),
                                                }),
                                            }}
                                        />
                                    </ListItem>
                                }

                                {stripePG &&
                                    <ListItem variant="outlined" sx={{ boxShadow: 'sm' }}>
                                        <Radio
                                            overlay
                                            value={"Stripe"}
                                            label={"Stripe"}
                                            sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                                            slotProps={{
                                                action: ({ checked }) => ({
                                                    sx: (theme) => ({
                                                        ...(checked && {
                                                            inset: -1,
                                                            border: '2px solid',
                                                            borderColor: theme.vars.palette.primary[500],
                                                        }),
                                                    }),
                                                }),
                                            }}
                                        />
                                    </ListItem>
                                }
                            </List>
                        </RadioGroup>
                    </Stack>
                    {openStripe &&
                        <Stripe />
                    }
                    <Button onClick={() => {
                        if(openRazorPay){
                            payRazorpay("asd", amount)
                        }
                    }}>Pay</Button>

                    {/*<RazorpayCheckout />*/}
                    {openPaypal &&
                        <PaypalCheckout price={amount} type={"wallet"} />}
                </ModalDialog>
            </Modal>

        </Box>
    )
}

export default WalletRechargeModal