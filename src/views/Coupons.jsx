"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "@/component/Buttons/CustomButton";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Input,
  Typography,
  useTheme,
} from "@mui/joy";

import { getPromoCodes, validatePromoCodes } from "@/interceptor/routes";
import { formatDate } from "../helpers/functonHelpers";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { setPromoCode } from "../store/reducers/promoCodeSlice";
import { useRouter } from "next/router";

const Coupons = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const [codes, setCodes] = useState([]);

  const branchData = useSelector((state) => state.branch);
  const settings = useSelector((state) => state.settings)?.value;
  const cartStoreData = useSelector((state) => state.cart);
  const promo = useSelector((state) => state.promoCode).value;

  const branch_id = branchData.id;
  const currencySymbol = settings?.currency[0];

  const get_promo_codes = async () => {
    try {
      const promoCodes = await getPromoCodes({ branch_id });
      if (!promoCodes.error) setCodes(promoCodes.data);
      else {
        toast.error(promoCodes.message);
      }
    } catch (error) {
      console.log("error occurred while working on getting promo code:", error);
    }
  };

  useEffect(() => {
    get_promo_codes();
  }, []);

  const validate_promo_codes = async (promo_code) => {
    try {
      const promoCodes = await validatePromoCodes({
        branch_id,
        promo_code,
        final_total: cartStoreData.overall_amount,
      });
      if (!promoCodes.error) {
        dispatch(setPromoCode(promoCodes.data));
        router.replace("/user/cart");
        toast.success(promoCodes.message);
      } else {
        toast.error(promoCodes.message);
      }
    } catch (error) {
      console.log("error occurred while working on getting promo code:", error);
    }
  };

  return (
    <Box>
      <Grid container spacing={1} sx={{ display: "none" }}>
        <Grid xs={12}>
          <Input
            variant="soft"
            sx={{ "--Input-decoratorChildHeight": "45px", width: "40%" }}
            endDecorator={
              <Button
                variant="text"
                color="primary"
                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                <Typography
                  fontSize={"md"}
                  fontWeight={"lg"}
                  textColor={"text.menuText"}
                >
                  Apply
                </Typography>
              </Button>
            }
          />
        </Grid>
      </Grid>

      <Grid container gap={2} mt={4}>
        {codes.map((item) => {
          return (
            <Grid xs={12} md={4} key={item.id}>
              <Card
                sx={{
                  borderRadius: "xl",
                  display: "flex",
                  flexDirection: "row",
                  maxWidth: "100%",
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? theme.palette.primary[100]
                      : theme.palette.primary[50],
                  height: 200,
                }}
              >
                <CardContent
                  sx={{ minWidth: { md: "60%", sm: "50%" }, width: "100%" }}
                >
                  <Box maxWidth={"100%"} maxHeight={"100%"}>
                    <Box
                      component={"img"}
                      src={item.image}
                      srcSet={`${item.image} 2x`}
                      loading="lazy"
                      alt=""
                      width={"auto"}
                      height={"70px"}
                      sx={{ objectFit: "cover" }}
                    ></Box>
                  </Box>
                  <Box
                    width={"100%"}
                    gap={3}
                    display={"flex"}
                    alignItems={"start"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                  >
                    <Box>
                      <Typography
                        textColor={ theme.palette.mode === "light"
 ? theme.palette.text.menuText
 : theme.palette.text.currency}      
                        fontSize={"md"}
                        fontWeight={"lg"}
                      >
                        GET UPTO {item.discount}
                        {item.discount_type === "percentage"
                          ? "%"
                          : currencySymbol}{" "}
                        OFF
                      </Typography>
                      <Typography
                        textColor={"text.currency"}
                        fontSize={"sm"}
                        fontWeight={"md"}
                      >
                        {item.message}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        textColor={"neutral.500"}
                        fontSize={"sm"}
                        fontWeight={"md"}
                      >
                        expiry Date: {formatDate(item.end_date)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>

                <Box>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Box
                      sx={{
                        background: theme.palette.background.body,
                        borderBottom: `var(--variant-borderWidth) solid`,
                        p: 2.5,
                        borderRadius: "50%",
                      }}
                      position={"absolute"}
                      zIndex={"9"}
                      top={{ md: "-10%", xs: "-7%" }}
                    ></Box>
                  </Box>
                  <Divider
                    orientation="vertical"
                    sx={{ height: "100%" }}
                  ></Divider>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Box
                      sx={{
                        background: theme.palette.background.body,
                        borderTop: `var(--variant-borderWidth) solid`,
                        p: 2.5,
                        borderRadius: "50%",
                      }}
                      position={"absolute"}
                      bottom={{ md: "-10%", xs: "-7%" }}
                    ></Box>
                  </Box>
                </Box>

                <CardContent
                  orientation="vertical"
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: "40%",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    textColor={"text.menuText"}
                    fontSize={"sm"}
                    fontWeight={"md"}
                  >
                    Coupon Code
                  </Typography>
                  <Typography
                    textColor={"text.menuText"}
                    fontSize={"lg"}
                    fontWeight={"xl"}
                  >
                    {item.promo_code}
                  </Typography>
                  <Button
                    disabled={item.id == promo[0]?.id}
                    variant="solid"
                    sx={{ px: 2, py: 1 }}
                    onClick={() => validate_promo_codes(item.promo_code)}
                  >
                    Redeem
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Coupons;
