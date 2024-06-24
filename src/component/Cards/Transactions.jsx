"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  useTheme,
  Grid,
  CardCover,
} from "@mui/joy";
import { format } from "date-fns";
import { get_transactions } from "@/interceptor/routes";
// icons
import { RiMoneyDollarCircleLine } from "@remixicon/react";
import toast from "react-hot-toast";
import { formatePrice } from "@/helpers/functonHelpers";

const Transactions = ({ id, status, date, type, message, amount }) => {
  const theme = useTheme();

  console.log("datedate",date)

  const currentDate = new Date();

  const formattedDate = format(currentDate, "yyyy-MM-dd");

  return (
    <Card sx={{ borderRadius: "lg", width: "100%" }}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Typography
            textColor={
              theme.palette.mode === "light"
                ? theme.palette.text.menuText
                : theme.palette.text.currency
            }
            fontSize={"md"}
            fontWeight={"lg"}
          >
            ID:
          </Typography>
          <Typography
            textColor={
              theme.palette.mode === "light"
                ? theme.palette.text.menuText
                : theme.palette.text.currency
            }
            fontSize={"md"}
            fontWeight={"lg"}
          >
            #{id}
          </Typography>
        </Box>
        <Box>
          <Chip
            color={
              status === "success"
                ? "success"
                : status === "pending"
                ? "warning"
                : status === "canceled" || status === "failed"
                ? "danger"
                : "primary"
            }
            disabled={false}
            size="lg"
            sx={{ borderRadius: "md", textTransform: "capitalize" }}
          >
            {status ?? "pending"}
          </Chip>
        </Box>
      </Box>

      <CardContent
        sx={{
          borderTop: `1px ${theme.palette.text.menuText} dashed`,
          borderBottom: `1px ${theme.palette.text.menuText} dashed`,
        }}
      >
        <Box>
          <Typography
            textColor={
              theme.palette.mode === "light"
                ? theme.palette.text.menuText
                : theme.palette.text.currency
            }
            fontSize={"md"}
            fontWeight={"lg"}
          >
            Date
          </Typography>
          <Typography
            textColor={
              theme.palette.mode === "light"
                ? theme.palette.text.menuText
                : theme.palette.text.currency
            }
            fontSize={"sm"}
            fontWeight={"md"}
            sx={{ opacity: "95%" }}
          >
            {format(date, "yyyy-MM-dd")}
          </Typography>
        </Box>
        <Box>
          <Typography
            textColor={
              theme.palette.mode === "light"
                ? theme.palette.text.menuText
                : theme.palette.text.currency
            }
            fontSize={"md"}
            fontWeight={"lg"}
          >
            Type
          </Typography>
          <Typography
            textColor={
              theme.palette.mode === "light"
                ? theme.palette.text.menuText
                : theme.palette.text.currency
            }
            fontSize={"sm"}
            fontWeight={"md"}
            sx={{ opacity: "95%" }}
          >
            {type ?? "Credit"}
          </Typography>
        </Box>
        <Box>
          <Typography
            textColor={
              theme.palette.mode === "light"
                ? theme.palette.text.menuText
                : theme.palette.text.currency
            }
            fontSize={"md"}
            fontWeight={"lg"}
          >
            Message
          </Typography>
          <Typography
            textColor={
              theme.palette.mode === "light"
                ? theme.palette.text.menuText
                : theme.palette.text.currency
            }
            fontSize={"sm"}
            fontWeight={"md"}
            sx={{ opacity: "95%" }}
          >
            {message ?? "Payment Success"}
          </Typography>
        </Box>
      </CardContent>

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} alignItems={"center"} gap={0.5}>
          <RiMoneyDollarCircleLine
            color={
              theme.palette.mode === "light"
                ? theme.palette.text.menuText
                : theme.palette.text.currency
            }
          />
          <Typography
            textColor={
              theme.palette.mode === "light"
                ? theme.palette.text.menuText
                : theme.palette.text.currency
            }
            fontSize={"md"}
            fontWeight={"lg"}
          >
            Total Pay
          </Typography>
        </Box>
        <Box>
          <Typography
            textColor={"text.currency"}
            fontSize={"md"}
            fontWeight={"lg"}
          >
            {formatePrice(amount) ?? "00.00"}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default Transactions;
