"use client";
import React, { useEffect, useState } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Modal,
  ModalClose,
  ModalDialog,
  Radio,
  RadioGroup,
  Sheet,
  Typography,
  useTheme,
} from "@mui/joy";
import CustomButton from "../Buttons/CustomButton";
import Link from "next/link";
import StarRatings from "react-star-ratings";
import { RiAddLine, RiPencilLine, RiSubtractLine } from "@remixicon/react";
import {
  formatePrice,
  isIncluded,
  parseCustomFloat,
} from "@/helpers/functonHelpers";
import { add_to_cart } from "@/events/actions";
import { useSelector } from "react-redux";
import { isLogged } from "@/events/getters";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const ProductModal = ({
  image,
  title,
  rating,
  description,
  variants = [],
  addOns = [],
  currentQty,
  simple,
  text = "",
  buttonVariant = "solid",
  modalOpen = false,
  setModalOpen = () => {},
  showButton = true,
  cart = false,
  index = 0,
}) => {
  const [open, setOpen] = React.useState(false);
  const [qty, setQty] = React.useState(currentQty ?? 1);
  const theme = useTheme();
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  const cartStoreData = useSelector((state) => state.cart);
  // console.log(cartStoreData?.data[0]?.addon_ids);

  const [price, setPrice] = useState(0);
  const [priceOriginal, setPriceOriginal] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    const variantId = cartStoreData.data[index]?.product_variant_id;
    cartStoreData.data[index]?.product_details[0].variants.map((value) => {
      if (value.id == variantId && cart) {
        setSelectedAddons(value.add_ons_data);
      }
    });
  }, []);
  const addTocart = async () => {
    if (!isLogged()) {
      return toast.error(t("please-log-in-to-continue"));
    }
    setLoading(true);
    const state = await add_to_cart({
      product_variant_id: selectedVariant.id,
      qty: qty,
      addons: selectedAddons,
    });
    setLoading(false);
    if (!state) {
      return;
    }
    setOpen(false);
  };

  const getPrice = () => {
    if (selectedVariant) {
      let extraPrice = 0;
      selectedAddons.forEach((item) => {
        extraPrice += parseCustomFloat(item.price);
      });

      const special_price =
        parseCustomFloat(selectedVariant.special_price) + extraPrice;
      const price = parseCustomFloat(selectedVariant.price) + extraPrice;
      if (special_price === 0) {
        setPrice(price * qty);
        setPriceOriginal(price)
      } else {
        setPrice(special_price * qty);
        setPriceOriginal(special_price)

      }
    }
  };

  useEffect(() => {
    getPrice();
  }, [qty, selectedVariant, setSelectedAddons, selectedAddons]);

  const mainColor = theme.palette.text.menuText;
  const currencyColor = theme.palette.text.currency;
  return (
    <Box>
      <>
        {showButton && (
          <>
            {text == "" ? (
              <CustomButton
                text={t("add")}
                customStyle={{ px: 4, py: 0.5 }}
                variant={buttonVariant}
                onClick={() => {
                  setOpen(true);
                }}
              />
            ) : (
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                variant={buttonVariant}
              >
                <Typography
                  fontSize={"sm"}
                  fontWeight={"md"}
                  mb={1}
                  textColor={currencyColor}
                  endDecorator={<RiPencilLine color={currencyColor} />}
                >
                  {t("edit")}
                </Typography>
              </Button>
            )}
          </>
        )}
      </>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open || modalOpen}
        onClose={() => {
          setOpen(false);
          setModalOpen(false);
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: "100%",
        }}
      >
        <ModalDialog
          variant={"soft"}
          size="lg"
          maxWidth={"sm"}
          sx={{ minHeight: 580, width: 500 }}
        >
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

          {!loading && (
            <>
              <DialogTitle>
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "transparent",
                    border: "none",
                    p: 0,
                  }}
                >
                  <AspectRatio ratio="1" sx={{ minWidth: "20%", width: 100 }}>
                    <Box
                      component={"img"}
                      src={
                        image ||
                        "https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                      }
                      srcSet={
                        image ||
                        "https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                      }
                      loading="lazy"
                      alt=""
                    ></Box>
                  </AspectRatio>
                  <CardContent
                    sx={{ alignItems: { md: "start", xs: "center" } }}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      flexDirection={{ xs: "column", md: "row" }}
                      justifyContent={"space-between"}
                      width={"100%"}
                      maxWidth={"100%"}
                    >
                      <Typography
                        minWidth={"80%"}
                        width={"auto"}
                        id="card-description"
                      >
                        {title}
                      </Typography>
                      <Box
                        border={"1px solid"}
                        borderColor={theme.palette.primary[400]}
                        p={0.5}
                        sx={{ backgroundColor: theme.palette.primary[400] }}
                        borderRadius={"md"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        width={{ md: "20%", xs: "60%", lg: "30%" }}
                        gap={0.5}
                      >
                        <CustomButton
                          text={
                            <RiSubtractLine
                              //   color={mainColor}
                              color={
                                theme.palette.mode === "light"
                                  ? mainColor
                                  : theme.palette.text.currency
                              }
                            />
                          }
                          variant="soft"
                          customStyle={{
                            color: "primary.500",
                            backgroundColor: "background.body",
                          }}
                          onClick={() => {
                            if (qty > 1) {
                              setQty(qty - 1);
                            }
                          }}
                        />
                        <Typography
                          fontSize={"sm"}
                          fontWeight={"md"}
                          textColor={mainColor}
                        >
                          {qty}
                        </Typography>
                        <CustomButton
                          text={
                            <RiAddLine
                              color={
                                theme.palette.mode === "light"
                                  ? mainColor
                                  : theme.palette.text.currency
                              }
                            />
                          }
                          variant="soft"
                          customStyle={{
                            color: "primary.500",
                            backgroundColor: "background.body",
                          }}
                          onClick={() => {
                            setQty(qty + 1);
                          }}
                        />
                      </Box>
                    </Box>
                    <Typography
                      level="body-sm"
                      aria-describedby="card-description"
                    >
                      <StarRatings
                        rating={
                          rating
                            ? typeof rating == "string"
                              ? parseFloat(rating)
                              : rating
                            : 0
                        }
                        starDimension={theme.fontSize.xl}
                        starSpacing="1px"
                        starRatedColor={theme.palette.warning[400]}
                      ></StarRatings>
                    </Typography>
                    <Typography
                      fontSize={"md"}
                      fontWeight={"lg"}
                      textColor={"text.currency"}
                      mb={1}
                    >
                    {formatePrice(priceOriginal)}  {qty>1 ? ` | ${formatePrice(price)} x ${qty}` : ""}
                    </Typography>
                  </CardContent>
                </Card>
              </DialogTitle>
              <DialogContent
                sx={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <Box>
                  <Typography>{description}</Typography>
                </Box>

                <Box>
                  {(addOns.length != 0 || !simple) && (
                    <Card variant="soft" color={theme.palette.neutral[50]}>
                      {!simple && cart == false && (
                        <CardContent>
                          <Box>
                            <Typography fontSize={"md"} fontWeight={"lg"}>
                              {t("variants")}
                            </Typography>
                            <Box>
                              <RadioGroup name="radio-buttons-group">
                                <List
                                  sx={{
                                    minWidth: { md: 240, xs: "auto" },
                                    "--List-gap": "0.5rem",
                                    "--ListItem-paddingY": "1rem",
                                    "--ListItem-radius": "8px",
                                    "--ListItemDecorator-size": "32px",
                                  }}
                                >
                                  {variants.map((item, index) => (
                                    <ListItem
                                      variant="plain"
                                      key={index}
                                      sx={{
                                        pb: 0,
                                      }}
                                    >
                                      <Box
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent={"space-between"}
                                        width={"100%"}
                                      >
                                        <Typography
                                          fontSize={"sm"}
                                          fontWeight={"md"}
                                          textColor={"text.currency"}
                                        >
                                          {item.variant_values}
                                        </Typography>
                                        <Radio
                                          // overlay
                                          value={item.variant_ids}
                                          label={
                                            <Typography
                                              fontSize={"sm"}
                                              fontWeight={"md"}
                                              textColor={"text.currency"}
                                            >
                                              {formatePrice(
                                                parseCustomFloat(
                                                  item.special_price
                                                ) !== 0
                                                  ? parseCustomFloat(
                                                      item.special_price
                                                    )
                                                  : parseCustomFloat(item.price)
                                              )}
                                            </Typography>
                                          }
                                          checked={
                                            selectedVariant.id == item.id
                                          }
                                          onChange={() => {
                                            setSelectedVariant(item);
                                          }}
                                          variant="solid"
                                          sx={{ flexDirection: "row-reverse" }}
                                        />
                                      </Box>
                                    </ListItem>
                                  ))}
                                </List>
                              </RadioGroup>
                            </Box>
                          </Box>
                        </CardContent>
                      )}

                      {addOns.length != 0 && (
                        <CardContent>
                          <Box>
                            <Typography fontSize={"md"} fontWeight={"lg"}>
                              {t("extra-add-ons")}
                            </Typography>
                            <Box>
                              <List
                                sx={{
                                  minWidth: { md: 240, xs: "auto" },
                                  "--List-gap": "0.5rem",
                                  "--ListItem-paddingY": "1rem",
                                  "--ListItem-radius": "8px",
                                  "--ListItemDecorator-size": "32px",
                                }}
                              >
                                {addOns.map((item, index) => (
                                  <ListItem
                                    variant="plain"
                                    key={index}
                                    sx={{
                                      pb: 0,
                                    }}
                                  >
                                    <Box
                                      display={"flex"}
                                      alignItems={"center"}
                                      justifyContent={"space-between"}
                                      width={"100%"}
                                    >
                                      <Typography
                                        fontSize={"sm"}
                                        fontWeight={"md"}
                                        textColor={"text.currency"}
                                      >
                                        {item.title}
                                      </Typography>
                                      <Checkbox
                                        // overlay
                                        value={item.title}
                                        label={
                                          <Typography
                                            fontSize={"sm"}
                                            fontWeight={"md"}
                                            textColor={"text.currency"}
                                          >
                                            {formatePrice(item.price)}
                                          </Typography>
                                        }
                                        onChange={(event) => {
                                          const isChecked =
                                            event.target.checked;

                                          if (isChecked) {
                                            // Add item to selectedAddons if it doesn't exist
                                            if (
                                              !selectedAddons.some(
                                                (obj) => obj.id === item.id
                                              )
                                            ) {
                                              setSelectedAddons([
                                                ...selectedAddons,
                                                item,
                                              ]);
                                            }
                                          } else {
                                            // Remove item from selectedAddons if it exists
                                            setSelectedAddons(
                                              selectedAddons.filter(
                                                (obj) => obj.id !== item.id
                                              )
                                            );
                                          }
                                        }}
                                        checked={selectedAddons.some(
                                          (obj) => obj.id === item.id
                                        )}
                                        variant="solid"
                                        sx={{ flexDirection: "row-reverse" }}
                                      />
                                    </Box>
                                  </ListItem>
                                ))}
                              </List>
                            </Box>
                          </Box>
                        </CardContent>
                      )}
                    </Card>
                  )}
                </Box>
              </DialogContent>
            </>
          )}

          <DialogActions>
            <CustomButton
              text={t("add-to-cart")}
              variant="solid"
              color="primary"
              onClick={addTocart}
              disabled={loading}
              customStyle={{ px: 3, py: 1 }}
            />
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default ProductModal;
