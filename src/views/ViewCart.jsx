"use client";
import React, { use, useEffect, useState } from "react";

import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
  Avatar,
  Textarea,
  IconButton,
  Input,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemDecorator,
  Divider,
} from "@mui/joy";

// icons
import {
  RiShoppingBag2Line,
  RiAddCircleFill,
  RiBillLine,
  RiMoneyRupeeCircleLine,
  RiMapPinLine,
  RiCoupon2Line,
  RiStickyNoteAddLine,
  RiAddLine,
  RiSubtractLine,
  RiPencilLine,
  RiArticleLine,
  RiHomeSmileLine,
  RiHandCoinLine,
  RiCheckLine as CheckIcon,
  RiArrowRightLine,
  RiAlertLine,
  RiDeleteBinLine,
} from "@remixicon/react";
import CustomButton from "@/component/Buttons/CustomButton";
import Link from "next/link";
import { formatePrice } from "@/helpers/functonHelpers";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/store/reducers/cartSlice";
import { setPromoCode } from "@/store/reducers/promoCodeSlice";
import { removeFromCart } from "@/interceptor/routes";
import toast from "react-hot-toast";
import { updateUserCart } from "@/events/actions";
import { add_to_cart, removeItemFromCart } from "../events/actions";
import ProductModal from "@/component/Modals/ProductModal";
import PaymentModal from "@/component/Modals/PaymentModal";
import AddressSelector from "@/component/Modals/AddressSelector";
import { getUserData } from "@/events/getters";
import { useTranslation } from "react-i18next";
import ThrottledQuantitySelector from "@/component/ThrottledQuantitySelector";
import { setDeliveryAddress } from "@/store/reducers/selectedDeliverySlice";

const ViewCart = () => {
  const [deliveryType, setDeliveryType] = useState("Delivery");
  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState(1);
  const [customTipInputValue, setCustomTipInputValue] = useState(1);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAddressSelect, setOpenAddressSelect] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userData = getUserData();
  const theme = useTheme();
  const mainColor = theme.palette.text.menuText;
  const currencyColor = theme.palette.text.currency;

  const cartStoreData = useSelector((state) => state.cart);
  const branchData = useSelector((state) => state.branch);
  const promoCode = useSelector((state) => state.promoCode)?.value;
  const userAddresses = useSelector((state) => state.userAddresses)?.value;

  const selectedDeliveryAddress = useSelector(
    (state) => state.selectedDeliveryAddress
  )?.value;

  const isAnyAddressMatching =
    userAddresses &&
    userAddresses.some((address) => address.id === selectedDeliveryAddress?.id);

  if (!isAnyAddressMatching) {
    dispatch(setDeliveryAddress());
  }

  const branch_id = branchData.id;

  const currencySymbol = useSelector(
    (state) => state.settings.value.currency[0]
  );

  const { t } = useTranslation();

  const handleRemoveItem = async (id, cart_id) => {
    try {
      const removeItem = await removeFromCart({
        branch_id,
        product_variant_id: id,
        cart_id,
      });
      if (removeItem.error) {
        toast.error(removeItem.message);
      } else {
        updateUserCart();
        toast.success(removeItem.message);
      }
    } catch (error) {
      console.log("error while removing item from cart:", error);
    }
  };

  const manageQty = async (
    addons,
    product_variant_id,
    qty,
    cart_id,
    branch_id
  ) => {
    if (qty < 0) toast.error("Quantity can not be less then 0!");
    else {
      add_to_cart({
        product_variant_id,
        qty,
        addons: addons,
        cart_id,
        branch_id,
      });
    }
  };

  let finalTotal = 0;
  let baseAmount;
  let discountAmount;

  if (promoCode.length > 0) {
    console.log("inside promo code true");
    baseAmount = parseFloat(promoCode[0].final_total);

    discountAmount =
      cartStoreData.overall_amount * (promoCode[0]?.discount / 100);

    console.log("discountAmount", promoCode[0]?.max_discount_amount);

    if (discountAmount > promoCode[0]?.max_discount_amount) {
      discountAmount = promoCode[0]?.max_discount_amount;
      baseAmount = parseFloat(
        cartStoreData.overall_amount - promoCode[0]?.max_discount_amount
      );
      console.log("baseAmount", baseAmount);
    } else {
      baseAmount = parseFloat(cartStoreData.overall_amount - discountAmount);
    }
  } else {
    baseAmount = parseFloat(cartStoreData.overall_amount);
  }

  if (tip === "Other") {
    finalTotal = baseAmount + parseFloat(customTip);
  } else {
    finalTotal = baseAmount + parseFloat(tip);
  }

  return (
    <Box>
      {cartStoreData.data.length > 0 && (
        <Grid container sx={{ flexGrow: 1 }}>
          <Grid xs={12} my={4}>
            <RadioGroup
              aria-label="Delivery Type"
              name="Delivery Type"
              value={deliveryType}
            >
              <List
                orientation="horizontal"
                sx={{
                  minWidth: 240,
                  "--List-gap": "0.5rem",
                  "--ListItem-paddingY": "1rem",
                  "--ListItem-radius": "8px",
                  "--ListItemDecorator-size": "32px",
                }}
              >
                {["Delivery", "Pick Up"].map((item) => (
                  <ListItem
                    variant="outlined"
                    key={item}
                    sx={{ boxShadow: "sm" }}
                  >
                    <Radio
                      overlay
                      value={item}
                      label={item == "Delivery" ? t("delivery") : t("pick-up")}
                      sx={{ flexGrow: 1 }}
                      onChange={(e) => {
                        if (e.target.value == "Pick Up") {
                          setTip(0);
                        }

                        setDeliveryType(e.target.value);
                      }}
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
                ))}
              </List>
            </RadioGroup>
          </Grid>
          <Grid xs={12} md={12} lg={6}>
            <Grid container gap={3} sx={{ flexGrow: 1 }}>
              <Grid xs={12} width={"100%"}>
                <Card sx={{ borderRadius: "lg" }}>
                  <CardActions
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      pt: 0,
                    }}
                  >
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                      <RiShoppingBag2Line
                        color={
                          theme.palette.mode === "light"
                            ? theme.palette.text.menuText
                            : theme.palette.text.currency
                        }
                      />
                      <Typography
                        textColor={
                          theme.palette.mode === "light"
                            ? "text.menuText"
                            : "text.secondary"
                        }
                        fontSize={"lg"}
                        fontWeight={"xl"}
                      >
                        {t("food-in-your-bag")}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{ cursor: "pointer" }}
                      onClick={() => setOpenConfirm(true)}
                      fontSize={"md"}
                      fontWeight={"lg"}
                      textColor={"danger.solidBg"}
                    >
                      {t("clear-cart")}
                    </Typography>

                    <Modal
                      open={openConfirm}
                      onClose={() => setOpenConfirm(false)}
                    >
                      <ModalDialog variant="outlined" role="alertdialog">
                        <DialogTitle>
                          <RiAlertLine />
                          {t("confirmation")}
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                          {t("cart-remove-warning")}
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="solid"
                            color="danger"
                            onClick={() => {
                              setOpenConfirm(false);
                              removeItemFromCart(branch_id);
                            }}
                          >
                            {t("remove-cart")}
                          </Button>
                          <Button
                            variant="plain"
                            color="neutral"
                            onClick={() => setOpenConfirm(false)}
                          >
                            {t("cancel")}
                          </Button>
                        </DialogActions>
                      </ModalDialog>
                    </Modal>
                  </CardActions>

                  <CardContent sx={{ px: { md: 4, xs: 1 } }}>
                    <Divider orientation="horizontal" />
                    {cartStoreData.data.map((item, index) => {
                      return (
                        <>
                          <Box py={1}>
                            <Card
                              variant="plain"
                              sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                alignItems: { xs: "center", md: "start" },
                                borderRadius: "md",
                                p: 0,
                              }}
                            >
                              <Box
                                maxWidth={"40%"}
                                sx={{
                                  display: { xs: "flex", md: "inherit" },
                                  "@media screen and (max-width: 900px)": {
                                    maxWidth: "100% !important",
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                  },
                                }}
                                position={"relative"}
                                display={"flex"}
                                gap={1}
                              >
                                <Box
                                  component={"img"}
                                  src={item.image}
                                  srcSet={item.image}
                                  loading="lazy"
                                  alt=""
                                  sx={{
                                    borderRadius: "md",
                                    width: {
                                      xs: "80px", // Width for extra small screens
                                      sm: "80px", // Width for small screens
                                    },
                                    height: {
                                      xs: "80px", // Width for extra small screens
                                      sm: "80px", // Width for small screens
                                    },
                                  }}
                                ></Box>
                                <Typography
                                  textColor={
                                    theme.palette.mode === "light"
                                      ? "text.menuText"
                                      : "text.secondary"
                                  }
                                  fontWeight={"lg"}
                                  width={{ md: "85%", xs: "100%" }}
                                  sx={{
                                    "@media screen and (min-width: 900px)": {
                                      display: "none",
                                    },
                                    "@media screen and (max-width: 425px)": {
                                      fontSize: "sm",
                                    },
                                    "@media screen and (min-width: 765px)": {
                                      fontSize: "md",
                                    },
                                  }}
                                >
                                  {item.name}
                                </Typography>

                                <Box
                                  component={"img"}
                                  src={"/images/icons/Veg.svg"}
                                  position={"absolute"}
                                  sx={{
                                    width: { xs: "15px" },
                                    top: { xs: "9%" },
                                    left: { xs: "2%" },
                                    "@media screen and (min-width: 900px)": {
                                      visibility: "hidden",
                                      width: "10px",
                                    },
                                  }}
                                ></Box>
                              </Box>
                              <CardContent
                                sx={{
                                  maxWidth: "90%",
                                  flexDirection: { md: "row", xs: "column" },
                                  alignItems: {
                                    md: "flex-start",
                                    xs: "center",
                                  },
                                  textAlign: { xs: "center", md: "left" },
                                  gap: 1,
                                  width: { xs: "100%" },
                                }}
                              >
                                <Box maxWidth={"10%"}>
                                  <Box
                                    component={"img"}
                                    src={"/images/icons/Veg.svg"}
                                    width={"20px"}
                                    sx={{
                                      "@media screen and (max-width: 900px)": {
                                        display: "none",
                                      },
                                    }}
                                  ></Box>
                                </Box>
                                <Box
                                  display={"flex"}
                                  justifyContent={"space-between"}
                                  flexDirection={"column"}
                                  sx={{
                                    width: {
                                      xs: "100%", // Width for extra small screens
                                      sm: "80%", // Width for medium screens
                                    },
                                  }}
                                >
                                  <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={1}
                                    maxWidth={"100%"}
                                    sx={{
                                      display: { xs: "none", md: "inherit" },
                                    }}
                                  >
                                    <Typography
                                      textColor={
                                        theme.palette.mode === "light"
                                          ? "text.menuText"
                                          : "text.secondary"
                                      }
                                      fontSize={"md"}
                                      fontWeight={"lg"}
                                      width={{ md: "85%", xs: "100%" }}
                                    >
                                      {item.name}
                                    </Typography>
                                  </Box>

                                  <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={{
                                      xs: "center",
                                      md: "start",
                                    }}
                                    gap={2}
                                  >
                                    {item.special_price > item.price &&
                                    item.special_price > 0 ? (
                                      <Typography
                                        fontSize={"md"}
                                        fontWeight={"lg"}
                                        mb={1}
                                        textColor={currencyColor}
                                      >
                                        {formatePrice(item.special_price)}
                                      </Typography>
                                    ) : (
                                      <Typography
                                        fontSize={"md"}
                                        fontWeight={"lg"}
                                        mb={1}
                                        textColor={currencyColor}
                                      >
                                        {formatePrice(item.price)}
                                      </Typography>
                                    )}

                                    <Box
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Divider
                                        orientation="vertical"
                                        variant="middle"
                                        flexItem
                                        style={{ height: 20 }} // Adjust the height as needed
                                      />
                                    </Box>

                                    {cartStoreData.data[
                                      index
                                    ].product_details[0].variants.map(
                                      (value) => {
                                        const variantId =
                                          cartStoreData.data[index]
                                            .product_variant_id;

                                        if (value.id === variantId) {
                                          return (
                                            <>
                                              {value.variant_values && (
                                                <Typography
                                                  fontSize={"sm"}
                                                  fontWeight={"md"}
                                                  sx={{
                                                    textAlign: {
                                                      xs: "left",
                                                      md: "center",
                                                    },
                                                  }}
                                                  mb={1}
                                                  textColor={currencyColor}
                                                >
                                                  {value.variant_values}
                                                </Typography>
                                              )}

                                              {value.variant_values && (
                                                <Box
                                                  style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                  }}
                                                >
                                                  <Divider
                                                    orientation="vertical"
                                                    variant="middle"
                                                    flexItem
                                                    style={{ height: 20 }} // Adjust the height as needed
                                                  />
                                                </Box>
                                              )}
                                            </>
                                          );
                                        }
                                      }
                                    )}

                                    <ProductModal
                                      text={t("edit")}
                                      image={item.image}
                                      title={item?.product_details[0]?.name}
                                      rating={item?.product_details[0]?.rating}
                                      description={
                                        item?.product_details[0]
                                          ?.short_description
                                      }
                                      variants={
                                        item?.product_details[0]?.variants
                                      }
                                      addOns={
                                        item?.product_details[0]
                                          ?.product_add_ons
                                      }
                                      simple={item?.product_details[0]?.type}
                                      cart={true}
                                      index={index}
                                      buttonVariant="text"
                                      currentQty={item.qty}
                                      cart_id={item.cart_id}
                                    />
                                    {/* vertical Divider */}

                                    <Box
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Divider
                                        orientation="vertical"
                                        variant="middle"
                                        flexItem
                                        style={{ height: 20 }} // Adjust the height as needed
                                      />
                                    </Box>
                                    <Box
                                      sx={{
                                        margin: "0.5em",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      {" "}
                                      {/* Add margin to create spacing around the Typography */}
                                      <Typography
                                        onClick={(e) => {
                                          handleRemoveItem(
                                            item.product_variant_id,
                                            item.cart_id
                                          );
                                        }}
                                        sx={{
                                          width: { xs: 18, md: 24 },
                                          cursor: "pointer",
                                        }}
                                        fontSize={"sm"}
                                        fontWeight={"md"}
                                        textColor={"danger.solidBg"}
                                        alignItems={"center"}
                                      >
                                        <RiDeleteBinLine />
                                      </Typography>
                                    </Box>
                                  </Box>
                                  <Box sx={{ textAlign: { xs: "left" } }}>
                                    {item.product_details[0].variants[0]
                                      .add_ons_data.length ? (
                                      <>
                                        <Typography
                                          textColor={"primary"}
                                          fontWeight={600}
                                          sx={{
                                            fontSize: { xs: "sm", md: "md" },
                                          }}
                                        >
                                          {t("extra-add-ons")}
                                        </Typography>
                                        {item.product_details[0].variants[0].add_ons_data.map(
                                          (addOn, index) => {
                                            return (
                                              <React.Fragment key={index}>
                                                <Typography
                                                  textColor={"primary"}
                                                  fontWeight={100}
                                                  sx={{
                                                    fontSize: {
                                                      xs: "sm",
                                                      md: "md",
                                                    },
                                                  }}
                                                >
                                                  {addOn.title} {"    "}|{" "}
                                                  {formatePrice(addOn.price)}
                                                </Typography>
                                              </React.Fragment>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : null}
                                  </Box>
                                </Box>

                                <ThrottledQuantitySelector
                                  initialValue={parseInt(item.qty)}
                                  cart_id={item.cart_id}
                                  branch_id={branch_id}
                                  manageQty={manageQty}
                                  productVariantId={item.product_variant_id}
                                  addons={
                                    item.product_details[0].variants[0]
                                      .add_ons_data
                                      ? item.product_details[0].variants[0]
                                          .add_ons_data
                                      : null
                                  }
                                />
                              </CardContent>
                            </Card>
                          </Box>
                          <Divider />
                        </>
                      );
                    })}
                  </CardContent>

                  <CardActions
                    component={Link}
                    href={"/products"}
                    sx={{
                      justifyContent: "start",
                      alignItems: "center",
                      color: "text.currency",
                    }}
                  >
                    <RiAddCircleFill />
                    <Typography
                      fontSize={"lg"}
                      fontWeight={"xl"}
                      textColor={
                        theme.palette.mode === "light"
                          ? "text.currency"
                          : "text.secondary"
                      }
                    >
                      {t("Add-Food-In-Your-Bag")}
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
              <Grid xs={12} sx={{ width: "100%" }}>
                <Card sx={{ borderRadius: "lg", width: "100%" }}>
                  <CardActions sx={{ pt: 0, gap: 1 }}>
                    <RiArticleLine
                      color={
                        theme.palette.mode === "light"
                          ? theme.palette.text.menuText
                          : theme.palette.text.currency
                      }
                    />
                    <Typography
                      fontSize={"md"}
                      fontWeight={"lg"}
                      textColor={
                        theme.palette.mode === "light"
                          ? "text.menuText"
                          : "text.secondary"
                      }
                    >
                      {t("bill-details")}
                    </Typography>
                  </CardActions>

                  <CardContent sx={{ px: { md: 2, xs: 1 } }}>
                    <Divider sx={{ my: 1 }} />

                    <Box>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          textColor={
                            theme.palette.mode === "light"
                              ? "text.menuText"
                              : "text.secondary"
                          }
                          fontWeight={"md"}
                        >
                          {t("item-total")}
                        </Typography>
                        <Typography
                          textColor={"text.currency"}
                          fontWeight={"lg"}
                        >
                          {formatePrice(cartStoreData.sub_total)}
                        </Typography>
                      </Box>

                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          textColor={
                            theme.palette.mode === "light"
                              ? "text.menuText"
                              : "text.secondary"
                          }
                          fontWeight={"md"}
                        >
                          {t("taxes-and-charges")} (
                          {cartStoreData.tax_percentage}%)
                        </Typography>
                        <Typography
                          textColor={"text.currency"}
                          fontWeight={"lg"}
                        >
                          {formatePrice(cartStoreData.tax_amount)}
                        </Typography>
                      </Box>

                      {tip !== 0 && (
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Typography
                            textColor={
                              theme.palette.mode === "light"
                                ? "text.menuText"
                                : "text.secondary"
                            }
                            fontWeight={"md"}
                          >
                            {t("Delivery-Partner-Tip")}
                          </Typography>
                          <Typography
                            textColor={"text.currency"}
                            fontWeight={"lg"}
                          >
                            {formatePrice(tip != "Other" ? tip : customTip)}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <Divider sx={{ my: 1 }} />
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography
                        textColor={
                          theme.palette.mode === "light"
                            ? "text.menuText"
                            : "text.secondary"
                        }
                        fontWeight={"lg"}
                      >
                        {t("total")}
                      </Typography>
                      <Typography textColor={"text.currency"} fontWeight={"lg"}>
                        {formatePrice(cartStoreData.overall_amount)}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />

                    {/* This is going to be same render upon condition */}
                    {promoCode.length > 0 && (
                      <>
                        <Box>
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <Typography
                              textColor={
                                theme.palette.mode === "light"
                                  ? "text.menuText"
                                  : "text.secondary"
                              }
                              fontWeight={"md"}
                            >
                              {t("coupon-discount")}
                            </Typography>
                            <Typography
                              textColor={"text.currency"}
                              fontWeight={"lg"}
                            >
                              {formatePrice(discountAmount)}
                            </Typography>
                          </Box>
                        </Box>
                        <Divider sx={{ mt: 1 }} />
                      </>
                    )}
                  </CardContent>

                  <CardActions
                    orientation="horizontal"
                    sx={{ justifyContent: "space-between", pr: 2 }}
                  >
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                      <RiMoneyRupeeCircleLine
                        color={
                          theme.palette.mode === "light"
                            ? theme.palette.text.menuText
                            : theme.palette.text.currency
                        }
                      />
                      <Typography
                        fontSize={"md"}
                        fontWeight={"lg"}
                        textColor={
                          theme.palette.mode === "light"
                            ? "text.menuText"
                            : "text.secondary"
                        }
                      >
                        {t("total-payable")}
                      </Typography>
                    </Box>
                    <Typography
                      fontSize={"md"}
                      fontWeight={"lg"}
                      textColor={"text.currency"}
                    >
                      {formatePrice(finalTotal)}
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Divider orientation="vertical" sx={{ mx: 3 }} />

          <Grid
            xs={12}
            md={12}
            lg={5.5}
            sx={{
              marginTop: { xs: 3, sm: 4, lg: 0 },
            }}
          >
            <Grid container gap={3} sx={{ flexGrow: 1 }}>
              {deliveryType === "Delivery" && (
                <Grid xs={12} width={"100%"}>
                  <AddressSelector
                    openAddressSelect={openAddressSelect}
                    setOpenAddressSelect={(val) => {
                      setOpenAddressSelect(val);
                    }}
                  />
                  <Card orientation="vertical" sx={{ px: 1 }}>
                    <CardActions
                      orientation="horizontal"
                      sx={{
                        pt: 0,
                        pb: 0,
                        px: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      onClick={() => setOpenAddressSelect(true)}
                    >
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"start"}
                        gap={1}
                      >
                        <RiMapPinLine
                          color={
                            theme.palette.mode === "light"
                              ? theme.palette.text.menuText
                              : theme.palette.text.currency
                          }
                        />
                        <Typography
                          textColor={
                            theme.palette.mode === "light"
                              ? "text.menuText"
                              : "text.secondary"
                          }
                          fontSize={"md"}
                          fontWeight={"lg"}
                        >
                          {" "}
                          {t("delivery-address")}{" "}
                        </Typography>
                      </Box>
                      <Button
                        variant="text"
                        color="neutral"
                        onClick={() => setOpenAddressSelect(true)}
                      >
                        <Typography
                          textColor={
                            theme.palette.mode === "light"
                              ? "text.menuText"
                              : "text.secondary"
                          }
                        >
                          {t("select-address")}
                        </Typography>
                      </Button>
                    </CardActions>

                    <CardContent
                      orientation="vertical"
                      sx={{ px: { md: 4, xs: 2 } }}
                    >
                      <Divider sx={{ mb: 1, width: "100%" }} />
                      <Box>
                        <Box display={"flex"} flexDirection={"column"} gap={1}>
                          {selectedDeliveryAddress?.id ? (
                            <Box>
                              <Box
                                display={"flex"}
                                alignItems={"center"}
                                gap={1}
                                color={"text.currency"}
                              >
                                <RiHomeSmileLine />
                                <Typography
                                  textColor={"text.currency"}
                                  fontSize={"md"}
                                  fontWeight={"lg"}
                                >
                                  {selectedDeliveryAddress.type}
                                </Typography>
                              </Box>
                              <Box fontWeight={"md"}>
                                <Typography>
                                  {selectedDeliveryAddress.address}
                                </Typography>
                              </Box>
                            </Box>
                          ) : (
                            <Typography
                              fontWeight={600}
                              textColor={theme.palette.danger[500]}
                            >
                              {t("please-select-delivery-address")}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              <Grid xs={12} width={"100%"}>
                <Link href="/user/coupons">
                  <Card orientation="vertical" sx={{ px: 1 }}>
                    <CardActions
                      orientation="horizontal"
                      sx={{
                        pt: 0,
                        pb: 0,
                        px: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"start"}
                        gap={1}
                      >
                        <RiCoupon2Line
                          color={
                            theme.palette.mode === "light"
                              ? theme.palette.text.menuText
                              : theme.palette.text.currency
                          }
                        />
                        <Typography
                          textColor={
                            theme.palette.mode === "light"
                              ? "text.menuText"
                              : "text.secondary"
                          }
                          fontSize={"md"}
                          fontWeight={"lg"}
                        >
                          {" "}
                          {t("add-coupon")}{" "}
                        </Typography>
                      </Box>

                      <Typography
                        component={Link}
                        href={"/user/coupons"}
                        textColor={
                          theme.palette.mode === "light"
                            ? "text.menuText"
                            : "text.secondary"
                        }
                        fontSize={"sm"}
                        fontWeight={"md"}
                      >
                        {" "}
                        {t("view-all")}{" "}
                      </Typography>
                    </CardActions>
                    {promoCode.length > 0 && (
                      <CardContent
                        orientation="vertical"
                        sx={{ px: { md: 4, xs: 2 } }}
                      >
                        <Divider sx={{ my: 1, width: "100%" }} />
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>{promoCode[0]?.promo_code}</Box>
                          <Button
                            variant="text"
                            sx={{ color: "red" }}
                            onClick={() => dispatch(setPromoCode([]))}
                          >
                            {t("remove")}
                          </Button>
                        </Box>
                      </CardContent>
                    )}
                  </Card>
                </Link>
              </Grid>

              {deliveryType === "Delivery" && (
                <Grid xs={12} width={"100%"}>
                  <Card orientation="vertical" sx={{ px: 1 }}>
                    <CardActions
                      orientation="horizontal"
                      sx={{
                        pt: 0,
                        pb: 0,
                        px: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        width={"100%"}
                        gap={1}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <RiHandCoinLine
                            color={
                              theme.palette.mode === "light"
                                ? theme.palette.text.menuText
                                : theme.palette.text.currency
                            }
                          />

                          <Typography
                            textColor={
                              theme.palette.mode === "light"
                                ? "text.menuText"
                                : "text.secondary"
                            }
                            fontSize={"md"}
                            fontWeight={"lg"}
                          >
                            {" "}
                            {t("Tip-Delivery-Boy")}{" "}
                          </Typography>
                        </Box>

                        <Typography
                          sx={{ cursor: "pointer" }}
                          onClick={() => setTip(0)}
                          fontSize={"md"}
                          fontWeight={"lg"}
                          textColor={"danger.solidBg"}
                        >
                          {t("clear-tip")}
                        </Typography>
                      </Box>
                    </CardActions>

                    <CardContent
                      orientation="vertical"
                      sx={{ px: { md: 4, xs: 2 } }}
                    >
                      <Divider sx={{ my: 1, width: "100%" }} />
                      <Box>
                        <Box
                          sx={{ display: "flex", gap: 1, alignItems: "center" }}
                        >
                          <RadioGroup
                            name="best-movie"
                            aria-labelledby="best-movie"
                            orientation="horizontal"
                            sx={{ flexWrap: "wrap", gap: 1 }}
                          >
                            {[5, 10, 15, 20, "Other"].map((name) => {
                              const checked = tip === name;
                              return (
                                <Chip
                                  key={name}
                                  variant="plain"
                                  color={checked ? "primary" : "neutral"}
                                  sx={{
                                    borderRadius: "sm",
                                    px: 2,
                                  }}
                                  startDecorator={checked && <CheckIcon />}
                                >
                                  <Radio
                                    variant="outlined"
                                    size="lg"
                                    color={checked ? "primary" : "neutral"}
                                    disableIcon
                                    overlay
                                    label={
                                      name !== "Other"
                                        ? formatePrice(name)
                                        : name
                                    }
                                    value={name}
                                    checked={checked}
                                    onChange={(event) => {
                                      if (event.target.checked) {
                                        setTip(name);
                                      }
                                    }}
                                  />
                                </Chip>
                              );
                            })}
                          </RadioGroup>
                        </Box>

                        {tip === "Other" && (
                          <Box mt={4}>
                            <Input
                              size="lg"
                              type="number"
                              startDecorator={currencySymbol}
                              endDecorator={
                                <Button
                                  onClick={(e) => {
                                    setCustomTip(customTipInputValue);
                                  }}
                                  sx={{ maxWidth: "fit-content" }}
                                >
                                  Add Tip
                                </Button>
                              }
                              value={customTipInputValue}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === "" || value < 1) {
                                  setCustomTipInputValue(1);
                                } else {
                                  setCustomTipInputValue(value);
                                }
                              }}
                              inputProps={{
                                style: {
                                  "-moz-appearance": "textfield",
                                  "-webkit-appearance": "none",
                                  margin: "1000px",
                                },
                              }}
                            />
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              <Grid xs={12} width={"100%"}>
                <Card orientation="vertical" sx={{ px: 1 }}>
                  <CardActions
                    orientation="horizontal"
                    sx={{
                      pt: 0,
                      pb: 0,
                      px: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"start"}
                      gap={1}
                    >
                      <RiStickyNoteAddLine
                        color={
                          theme.palette.mode === "light"
                            ? theme.palette.text.menuText
                            : theme.palette.text.currency
                        }
                      />
                      <Typography
                        textColor={
                          theme.palette.mode === "light"
                            ? "text.menuText"
                            : "text.secondary"
                        }
                        fontSize={"md"}
                        fontWeight={"lg"}
                      >
                        {" "}
                        {t("Add-Notes-For-Restaurants")}{" "}
                      </Typography>
                    </Box>
                  </CardActions>

                  <CardContent
                    orientation="vertical"
                    sx={{ px: { md: 4, xs: 2 } }}
                  >
                    <Divider sx={{ my: 1, width: "100%" }} />
                    <Box>
                      <Textarea
                        variant="soft"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t("Add-Notes-For-Restaurants")}
                        minRows={4}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            xs={6}
            my={4}
            sx={{
              width: {
                xs: "100%",
                sm: "50%",
              },
            }}
          >
            <CustomButton
              text={t("confirm-order")}
              variant="solid"
              customStyle={{
                px: 4,
                py: 2,
                width: { xs: "100%", md: "50%", lg: "30%" },
                color: mainColor,

                fontSize: "md",
              }}
              onClick={() => setOpen(true)}
            />
          </Grid>

          {open && (
            <PaymentModal
              openModal={open}
              setModalOpen={setOpen}
              finalTotal={finalTotal}
              deliveryType={deliveryType}
            />
          )}
        </Grid>
      )}

      {cartStoreData.data.length == 0 && (
        <Box
          maxWidth={"100%"}
          maxHeight={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Box
            component={"img"}
            src={"/images/assets/blank-cart.png"}
            width={"500px"}
            height={"100%"}
          ></Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={1}
          >
            <Typography fontSize={"lg"} fontWeight={"lg"}>
              {t("you-have-no-items-in-your-cart")}
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              href="/products"
              color="danger"
              endDecorator={<RiArrowRightLine />}
            >
              <Typography fontSize={"md"} fontWeight={"md"} color="text.danger">
                {t("brows-Menu")}
              </Typography>
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ViewCart;
