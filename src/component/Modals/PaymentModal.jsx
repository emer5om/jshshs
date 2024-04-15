"use client";
import React, { useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Modal,
  ModalClose,
  ModalDialog,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";

import { formatePrice } from "../../helpers/functonHelpers";
import PaypalCheckout from "../PaymentGateways/PaypalCheckout";
import { useDispatch, useSelector } from "react-redux";
import RazorpayCheckout from "../PaymentGateways/RazorpayCheckout";
import { addTransaction, placeOrder } from "../../interceptor/routes";
import { getUserData } from "@/events/getters";
import { updateUserCart } from "@/events/actions";
import { setDeliveryAddress } from "../../store/reducers/selectedDeliverySlice";
import toast from "react-hot-toast";
import Stripe from "../PaymentGateways/Stripe";
import { useRouter } from "next/router";

const PaymentModal = ({
  finalTotal,
  addressId,
  openModal,
  setModalOpen,
  message,
  deliveryType,
}) => {
  const [open, setOpen] = useState(openModal);
  const [openStripe, setOpenStripe] = useState(false);
  const [openRazorPay, setOpenRazorPay] = useState(false);
  const [openPaypal, setOpenPaypal] = useState(false);
  const [openCOD, setOpenCOD] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const cod_settings = useSelector((state) => state.settings)?.value;

  let settings = useSelector((state) => state.settings);
  settings = settings.value.paymentMethod.payment_method;

  const cartStoreData = useSelector((state) => state.cart);
  const branchData = useSelector((state) => state.branch);
  const branch_id = branchData.id;

  const selectedDeliveryAddress = useSelector(
    (state) => state.selectedDeliveryAddress
  )?.value;
  let promo_code = useSelector((state) => state.promoCode)?.value;

  promo_code = promo_code.length > 0 ? promo_code.promo_code : "";
  const dispatch = useDispatch();

  const is_self_pick_up = deliveryType == "Pick Up" ? 1 : 0;

  let methods = [];

  const is_cod_available = cod_settings?.paymentMethod?.is_cod_allowed;
  const stripePG = settings.stripe_payment_method == 1 ? true : false;
  const razorpayPG = settings.razorpay_payment_method == 1 ? true : false;
  const paypalPG = settings.paypal_payment_method == 1 ? true : false;
  const product_variant_id = cartStoreData.variant_id.join(", ");
  const qty = cartStoreData.data.map((document) => document.qty).join(", ");
  const userData = getUserData();

  const [loading, setLoading] = useState(false);

  const onPGMethodChange = (value) => {
    const name = value.toLowerCase();
    if (name === "stripe") {
      setOpenStripe(true);
      setOpenRazorPay(false);
      setOpenPaypal(false);
      setOpenCOD(false);
    } else if (name === "razorpay") {
      setOpenRazorPay(true);
      setOpenStripe(false);
      setOpenPaypal(false);
      setOpenCOD(false);
    } else if (name === "paypal") {
      setOpenRazorPay(false);
      setOpenStripe(false);
      setOpenPaypal(true);
      setOpenCOD(false);
    } else if (name === "cod") {
      setOpenPaypal(false);
      setOpenRazorPay(false);
      setOpenStripe(false);
      setOpenCOD(true);
    } else {
      setOpenPaypal(false);
      setOpenRazorPay(false);
      setOpenStripe(false);
      setOpenCOD(false);
    }
  };

  const handlePaymentOrder = async () => {
    if (is_self_pick_up === 0 && !selectedDeliveryAddress) {
      return toast.error("Please Select Address before processing ahead!");
    }

    setLoading(true);

    const place_order = await placeOrder({
      branch_id,
      mobile: userData.mobile,
      product_variant_id,
      quantity: qty,
      total: cartStoreData.overall_amount,
      final_total: finalTotal,
      latitude: selectedDeliveryAddress?.city_latitude,
      longitude: selectedDeliveryAddress?.city_longitude,
      promo_code,
      payment_method: "cod",
      address_id: selectedDeliveryAddress?.id ?? 0,
      is_wallet_used: 0,
      wallet_balance_used: 0,
      is_self_pick_up,
    });

    if (!place_order.error) {
      const order_id = place_order.order_id;

      const transaction = await addTransaction({
        transaction_type: "transaction",
        order_id,
        type: "paypal",
        payment_method: "paypal",
        txn_id: order_id,
        amount: finalTotal,
        status: "Pending",
        message: message ?? "Transaction Message",
        branch_id,
      });

      if (!transaction.error) {
        setOpen(false);
        setModalOpen(false);
        updateUserCart();
        dispatch(setDeliveryAddress());
        toast.success(place_order.message);
        router.push("/orderplaced"); // Replace '/success' with your actual success page path
        setLoading(false);
      }
    }

    if (place_order.error) {
      setLoading(false);
      return toast.error(place_order.message);
    }
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={() => {
          if (is_self_pick_up === 1 && !selectedDeliveryAddress) {
            toast.error("Please Select City!");
          } else {
            setOpen(false);
            setModalOpen(false);
          }
        }}
      >
        <ModalDialog
          size="lg"
          sx={{ maxHeight: "100%", maxWidth: "100%", width: 500 }}
        >
          <ModalClose />
          <DialogTitle>Place Order</DialogTitle>
          <DialogContent>
            <Divider sx={{ width: "100%" }} />
            <Box
              py={1}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                textColor={
                  theme.palette.mode === "light"
                    ? theme.palette.text.menuText
                    : theme.palette.text.currency
                }
                fontSize={"md"}
                fontWeight={"lg"}
              >
                {" "}
                Total Bill{" "}
              </Typography>
              <Typography
                textColor={"text.currency"}
                fontSize={"md"}
                fontWeight={"lg"}
              >
                {" "}
                {formatePrice(finalTotal)}{" "}
              </Typography>
            </Box>
            <Divider sx={{ width: "100%" }} />
            <DialogTitle
              sx={{
                textAlign: "center",
                fontSize: "md",
                fontWeight: "md",
                py: 1,
              }}
            >
              Select The way to Pay
            </DialogTitle>
            <Divider sx={{ width: "100%" }} />
          </DialogContent>

          <Stack spacing={2}>
            <RadioGroup
              aria-label="Your plan"
              name="people"
              onChange={(e) => onPGMethodChange(e.target.value)}
            >
              <List
                sx={{
                  minWidth: 240,
                  "--List-gap": "0.5rem",
                  "--ListItem-paddingY": "1rem",
                  "--ListItem-radius": "8px",
                  "--ListItemDecorator-size": "32px",
                }}
              >
                {paypalPG && (
                  <ListItem variant="outlined" sx={{ boxShadow: "sm" }}>
                    <Radio
                      overlay
                      value={"Paypal"}
                      label={"Paypal"}
                      sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
                      slotProps={{
                        action: ({ checked }) => ({
                          sx: (theme) => ({
                            ...(checked && {
                              inset: -1,
                              border: "2px solid",
                              borderColor: theme.vars.palette.primary[500],
                            }),
                          }),
                        }),
                      }}
                    />
                  </ListItem>
                )}

                {razorpayPG && (
                  <ListItem variant="outlined" sx={{ boxShadow: "sm" }}>
                    <Radio
                      overlay
                      value={"Razorpay"}
                      label={"Razorpay"}
                      sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
                      slotProps={{
                        action: ({ checked }) => ({
                          sx: (theme) => ({
                            ...(checked && {
                              inset: -1,
                              border: "2px solid",
                              borderColor: theme.vars.palette.primary[500],
                            }),
                          }),
                        }),
                      }}
                    />
                  </ListItem>
                )}

                {stripePG && (
                  <ListItem variant="outlined" sx={{ boxShadow: "sm" }}>
                    <Radio
                      overlay
                      value={"Stripe"}
                      label={"Stripe"}
                      sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
                      slotProps={{
                        action: ({ checked }) => ({
                          sx: (theme) => ({
                            ...(checked && {
                              inset: -1,
                              border: "2px solid",
                              borderColor: theme.vars.palette.primary[500],
                            }),
                          }),
                        }),
                      }}
                    />
                  </ListItem>
                )}

                {is_cod_available && (
                  <ListItem variant="outlined" sx={{ boxShadow: "sm" }}>
                    <Radio
                      overlay
                      value={"cod"}
                      label={"Cash On Delivery"}
                      sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
                      slotProps={{
                        action: ({ checked }) => ({
                          sx: (theme) => ({
                            ...(checked && {
                              inset: -1,
                              border: "2px solid",
                              borderColor: theme.vars.palette.primary[500],
                            }),
                          }),
                        }),
                      }}
                    />
                  </ListItem>
                )}
              </List>
            </RadioGroup>
          </Stack>

          {openPaypal && (
            <PaypalCheckout
              price={finalTotal}
              type={"placeOrder"}
              message={message}
              deliveryType={deliveryType}
              isModalOpen={setModalOpen}
              closeModal={setOpen}
            />
          )}

          {openRazorPay && (
            <RazorpayCheckout
              price={finalTotal}
              type={"placeOrder"}
              message={message}
              isModalOpen={setModalOpen}
              closeModal={setOpen}
              deliveryType={deliveryType}
            />
          )}
          {openStripe && (
            <Stripe
              amount={finalTotal}
              type={"placeOrder"}
              message={message}
              isModalOpen={setModalOpen}
              closeModal={setOpen}
              deliveryType={deliveryType}
            />
          )}

          {openCOD && (
            <Button
            fullWidth
            variant="soft"
           onClick={() => handlePaymentOrder()}
           disabled={loading}
        >
           {loading ? <CircularProgress 
              
             /> : "Place Order"}
         </Button>
          )}
         
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default PaymentModal;
