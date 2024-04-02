"use client";
import React, { useState } from 'react'

import { Box, Button, DialogContent, DialogTitle, Divider, FormControl, FormLabel, Input, List, ListItem, Modal, ModalClose, ModalDialog, Radio, RadioGroup, Stack, Typography } from '@mui/joy';

import { formatePrice } from "../../helpers/functonHelpers"
import PaypalCheckout from "../PaymentGateways/PaypalCheckout"
import { useSelector } from 'react-redux';
import {payRazorpay} from "@/events/actions";

const AddressModal = ({ finalTotal, addressId, openModal, setModalOpen, message }) => {

    const [open, setOpen] = useState(openModal);
    const [openStripe, setOpenStripe] = useState(false);
    const [openRazorPay, setOpenRazorPay] = useState(false);
    const [openPaypal, setOpenPaypal] = useState(false);

    const cod_settings = useSelector((state) => state.settings)?.value;

    let settings = useSelector((state) => state.settings);
    settings = settings.value.paymentMethod.payment_method

    let methods = []

    const is_cod_available = cod_settings?.paymentMethod?.is_cod_allowed
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
            setOpenPaypal(false)
            setOpenRazorPay(false)
            setOpenStripe(false)
        }
    }

    return (
        <Box>
            <Modal open={open} onClose={() => {
                setOpen(false)
                setModalOpen(false)
            }}>
                <ModalDialog size='lg' sx={{ maxHeight: "100%", maxWidth: "100%" }}>
                    <ModalClose />
                    <DialogTitle>Select Address</DialogTitle>
                    <DialogContent>
                        <Divider sx={{ width: "100%" }} />
                        <Box py={1} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                            <Typography textColor={"text.menuText"} fontSize={"md"} fontWeight={"lg"}> Total Bill </Typography>
                            <Typography textColor={"text.currency"} fontSize={"md"} fontWeight={"lg"} > {formatePrice(finalTotal)} </Typography>
                        </Box>
                        <Divider sx={{ width: "100%" }} />
                        <DialogTitle sx={{ textAlign: "center", fontSize: "md", fontWeight: "md", py: 1 }}>
                            Select The way to Pay
                        </DialogTitle>
                        <Divider sx={{ width: "100%" }} />
                    </DialogContent>

                    <Stack spacing={2}>
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

                    {openRazorPay &&
                        <Button onClick={() => {


                            payRazorpay("asd", finalTotal)

                        }}>Pay</Button>
                    }
                    {openPaypal &&
                        <PaypalCheckout price={finalTotal} type={"placeOrder"} message={message} />}
                </ModalDialog>
            </Modal>
        </Box>
    )
}

export default AddressModal