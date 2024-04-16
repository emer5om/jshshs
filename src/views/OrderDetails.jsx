"use client";
import React, { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import CustomButton from "@/component/Buttons/CustomButton";
import html2pdf from "html-to-pdfmake";

import { jsPDF } from "jspdf";
import { HTMLToReact } from "html-to-react";
// Icon
import {
  RiEBike2Line,
  RiArticleLine,
  RiDownloadLine,
  RiMapPinLine,
  RiHomeSmileLine,
  RiMoneyDollarCircleLine,
} from "@remixicon/react";
import { formatePrice, formatDate } from "@/helpers/functonHelpers";
import { getOrders } from "@/interceptor/routes";
import { getUserData } from "@/events/getters";
import { useTranslation } from "react-i18next";

const OrderDetails = ({ queryConstants }) => {
  const id = queryConstants.id;
  const { t } = useTranslation();

  const [order, setOrder] = useState([]);

  const getOrderDetails = async () => {
    try {
      const orderDetails = await getOrders({ id });
      if (!orderDetails.error) {
        if (orderDetails.data.length > 0) setOrder(orderDetails.data[0]);
      }
    } catch (error) {
      console.error("error occurred while getting order details:", error);
    }
  };
  const userData = getUserData();
  useEffect(() => {
    getOrderDetails();
  }, []);

  const generatePDF = async (htmlString) => {
    const pdf = new jsPDF({
      orientation: "portrait", // or 'landscape'
      unit: "px", // page units
      format: "a1", // page format
    });

    pdf.html(htmlString, {
      callback: function (pdf) {
        pdf.save("output.pdf");
      },
    });
  };

  const theme = useTheme();
  return (
    <Grid container gap={2} sx={{ flexGrow: 1, my: 4, width: "100%" }}>
      <Grid xs={12} md={5.9}>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Card sx={{ borderRadius: "lg" }}>
            <CardContent
              orientation="horizontal"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                border: `1px solid ${theme.palette.primary[300]}`,
                borderRadius: "md",
                backgroundColor: theme.palette.primary[100],
              }}
            >
              <Typography
                fontSize={"md"}
                fontWeight={"lg"}
                textColor={"text.menuText"}
              >
                {t("order")} OTP
              </Typography>
              <Typography
                fontSize={"md"}
                fontWeight={"lg"}
                textColor={"text.currency"}
              >
                {order.otp}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: "lg" }}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"flex-start"}
              py={1}
              sx={{
                borderBottom: `1px dashed ${theme.palette.background.level3}`,
              }}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={0.5}
                justifyContent={"space-between"}
                alignItems={"start"}
              >
                <Typography textColor={"text.currency"} fontWeight={"lg"}>
                  {t("order_id")}: #{order.id}
                </Typography>
                <Typography
                  textColor={
                    theme.palette.mode === "light"
                      ? theme.palette.text.menuText
                      : theme.palette.text.currency
                  }
                  fontWeight={"md"}
                >
                  {order.date_added}
                </Typography>
              </Box>
              <Box>
                <Chip
                  color="success"
                  variant="soft"
                  size="lg"
                  sx={{
                    borderRadius: "md",
                    borderColor: theme.palette.success[100],
                  }}
                >
                  {order.active_status}
                </Chip>
              </Box>
            </Box>
            <Box display={"flex"} flexDirection={"column"} gap={1}>
              {order?.order_items?.map((item, index) => {
                return (
                  <Box
                    display={"flex"}
                    flexDirection={{ md: "row", xs: "column" }}
                    alignItems={{ xs: "start", md: "center" }}
                    justifyContent={"space-between"}
                    gap={1}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"start"}
                      gap={1}
                      maxWidth={{ xs: "100%", md: "85%" }}
                    >
                      <Box
                        width={"20px"}
                        component={"img"}
                        src={
                          item.indicator == "1"
                            ? "/images/icons/Veg.svg"
                            : "/images/icons/Non_veg.svg"
                        }
                        alt="veg-non-veg.icon"
                      ></Box>

                      <Typography
                        textColor={
                          theme.palette.mode === "light"
                            ? theme.palette.text.menuText
                            : theme.palette.text.currency
                        }
                        fontSize={"md"}
                        fontWeight={"lg"}
                        textOverflow={"ellipsis"}
                        noWrap
                        width={"100%"}
                      >
                        {item.qty} x {item.product_name}
                      </Typography>
                    </Box>

                    <Typography
                      textColor={"text.currency"}
                      fontSize={"md"}
                      fontWeight={"lg"}
                    >
                      {formatePrice(item.price)}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Card>

          <Card>
            <CardContent>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <RiEBike2Line />
                <Typography
                  fontSize={"lg"}
                  fontWeight={"lg"}
                  textColor={
                    theme.palette.mode === "light"
                      ? theme.palette.text.menuText
                      : theme.palette.text.currency
                  }
                >
                  {t("delivery-boy")}
                </Typography>
              </Box>
              <Box
                sx={{
                  borderTop: `1px dashed ${theme.palette.background.level3}`,
                  borderBottom: `1px dashed ${theme.palette.background.level3}`,
                  my: 1,
                  py: 1,
                }}
              >
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <Avatar
                    alt={order.rider_name}
                    src={order.rider_image}
                    size="lg"
                  />
                  <Box display={"flex"} flexDirection={"column"} gap={0}>
                    <Typography
                      fontSize={"md"}
                      fontWeight={"md"}
                      textColor={
                        theme.palette.mode === "light"
                          ? theme.palette.text.menuText
                          : theme.palette.text.currency
                      }
                    >
                      {order.rider_name}
                    </Typography>
                    <Typography
                      fontSize={"sm"}
                      fontWeight={"md"}
                      textColor={
                        theme.palette.mode === "light"
                          ? theme.palette.text.menuText
                          : theme.palette.text.currency
                      }
                    >
                      {t("your-delivery-partner")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-end"}
              >
                {/* <CustomButton text={"Rate"} variant="soft" customStyle={{ px: 2, py: 1 }} /> */}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>

      <Divider orientation="vertical"></Divider>

      <Grid xs={12} md={5.5}>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Card orientation="horizontal">
            <CardContent
              orientation="horizontal"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <RiArticleLine  color={
                  theme.palette.mode === "light"
                    ? theme.palette.text.menuText
                    : theme.palette.text.currency
                }    />
                <Typography
                  fontSize={"md"}
                  fontWeight={"lg"}
                  textColor={
                    theme.palette.mode === "light"
                      ? theme.palette.text.menuText
                      : theme.palette.text.currency
                  }
                >
                  {t("download-invoice")}
                </Typography>
              </Box>
              <Box
                bgcolor={"text.menuText"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                p={1}
                borderRadius={"50%"}
                sx={{ cursor: "pointer" }}
                onClick={() => generatePDF(order.invoice_html)}
              >
                <RiDownloadLine color={theme.palette.background.level1} />
              </Box>
            </CardContent>
          </Card>

          <Card orientation="vertical" sx={{ px: 1 }}>
            <CardActions
              orientation="horizontal"
              sx={{
                pt: 0,
                pb: 1,
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
                <RiMapPinLine  color={
                  theme.palette.mode === "light"
                    ? theme.palette.text.menuText
                    : theme.palette.text.currency
                }    />
                <Typography
                  textColor={
                    theme.palette.mode === "light"
                      ? theme.palette.text.menuText
                      : theme.palette.text.currency
                  }
                  fontSize={"md"}
                  fontWeight={"lg"}
                >
                  {t("delivery-address")}
                </Typography>
              </Box>
            </CardActions>

            <CardContent orientation="vertical" sx={{ px: 2 }}>
              <Divider sx={{ my: 1, width: "100%" }} />
              <Box>
                <Box display={"flex"} flexDirection={"column"} gap={1}>
                  <Box fontWeight={"md"}>
                    <Typography>{order.address}</Typography>
                  </Box>

                  <Box display={"flex"} alignItems={"center"} gap={1}>
                    <Box display={"flex"} alignItems={"center"} gap={0.5}>
                      <Avatar
                        alt={userData.username}
                        src={userData.image}
                        size="md"
                      />
                      <Typography
                        fontSize={"md"}
                        fontWeight={"md"}
                        textColor={
                          theme.palette.mode === "light"
                            ? theme.palette.text.menuText
                            : theme.palette.text.currency
                        }
                      >
                        {userData.username}
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" />
                    <Typography
                      fontSize={"md"}
                      fontWeight={"md"}
                      textColor={
                        theme.palette.mode === "light"
                          ? theme.palette.text.menuText
                          : theme.palette.text.currency
                      }
                    >
                      {userData.mobile}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              gap: 1,
            }}
          >
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
                    ? theme.palette.text.menuText
                    : theme.palette.text.currency
                }
              >
                {t("bill-details")}
              </Typography>
            </CardActions>

            <CardContent sx={{ px: 2 }}>
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
                        ? theme.palette.text.menuText
                        : theme.palette.text.currency
                    }
                    fontWeight={"md"}
                  >
                    {" "}
                    {t("item-total")}{" "}
                  </Typography>
                  <Typography
                    textColor={
                      theme.palette.mode === "light"
                        ? theme.palette.text.menuText
                        : theme.palette.text.currency
                    }
                    fontWeight={"lg"}
                  >
                    {" "}
                    {formatePrice(order.total)}
                  </Typography>
                </Box>
                {/* <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Typography textColor={"text.menuText"} fontWeight={"md"}>Delivery Partner Tip</Typography>
                                    <Typography textColor={"text.currency"} fontWeight={"lg"}> {formatePrice(order.)}</Typography>
                                </Box> */}
                <Box
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
                    fontWeight={"md"}
                  >
                    {t("delivery-charges")}
                  </Typography>
                  <Box display={"flex"} alignItems={"center"} gap={1}>
                    <Typography
                      textColor={
                        theme.palette.mode === "light"
                          ? theme.palette.text.menuText
                          : theme.palette.text.currency
                      }
                      fontWeight={"lg"}
                      sx={{ textDecoration: "line-through" }}
                    >
                      {" "}
                      {formatePrice(20.0)}
                    </Typography>
                    {order?.delivery_charge <= 0 && (
                      <Typography
                        textColor={
                          theme.palette.mode === "light"
                            ? theme.palette.text.menuText
                            : theme.palette.text.currency
                        }
                        fontWeight={"lg"}
                      >
                        {t("free")}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box>
                {/* {order.discount > 0 &&
                                } */}
                <Box
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
                    fontWeight={"md"}
                  >
                    {t("coupon-discount")}
                  </Typography>
                  <Typography textColor={"text.currency"} fontWeight={"lg"}>
                    {formatePrice(order.discount)}
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
                        ? theme.palette.text.menuText
                        : theme.palette.text.currency
                    }
                    fontWeight={"md"}
                  >
                    {t("taxes-and-charges")} ({order.total_tax_percent} %)
                  </Typography>
                  <Typography textColor={"text.currency"} fontWeight={"lg"}>
                    {formatePrice(order.total_tax_amount)}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mt: 1 }} />
            </CardContent>

            <CardActions
              orientation="horizontal"
              sx={{ justifyContent: "space-between", pr: 2 }}
            >
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <RiMoneyDollarCircleLine
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
                      ? theme.palette.text.menuText
                      : theme.palette.text.currency
                  }
                >
                  {t("total-pay")}
                </Typography>
              </Box>
              <Typography
                fontSize={"md"}
                fontWeight={"lg"}
                textColor={"text.currency"}
              >
                {formatePrice(order.total_payable)}
              </Typography>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OrderDetails;
