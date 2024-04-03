"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Textarea,
  Typography,
  useTheme,
} from "@mui/joy";
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

// icons

import {
  RiAlertFill,
  RiArrowRightCircleFill,
  RiStarFill,
} from "@remixicon/react";
import { BorderStyle } from "@mui/icons-material";
import CustomButton from "../Buttons/CustomButton";
import Link from "next/link";
import { formatePrice } from "@/helpers/functonHelpers";
import toast from "react-hot-toast";
import api from "@/interceptor/api";
import { setProductRating } from "@/events/actions";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const UserOrderCard = ({
  status,
  image,
  id,
  date,
  qty,
  name,
  amount,
  type,
  onCancel,
}) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [openReview, setOpenReview] = useState(false);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  //   const [value, setValue] = useState(0);

  const userData = useSelector((state) => state.authentication).userData;

  const [ratingValue, setRatingValue] = useState(0);
  const [message, setMessage] = useState("");

  const handleRating = (rate) => {
    setRatingValue(rate);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const setRating = await setProductRating({
        // user_id: userData.id,
        product_id: id,
        rating: ratingValue,
        message: message,
      });

      if (setRating.error) toast.error(setRating.message);
      else toast.success(setRating.message);

      console.log("Rating submitted successfully");
    } catch (error) {
      // Handle error
      console.error("Error while submitting rating:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          maxWidth: "100%",
        }}
      >
        <Box
          display={"flex"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Box maxHeight={"100%"} maxWidth={"100%"}>
              <Box
                component={"img"}
                src={image}
                srcSet={`${image} 2x`}
                loading="lazy"
                alt={name}
                height={"70px"}
                width={"70px"}
                borderRadius={"md"}
              ></Box>
            </Box>
            <Box>
              <Typography
                fontSize={"md"}
                fontWeight={"lg"}
                textColor={"text.currency"}
              >
                {t("order_id")}: #{id}
              </Typography>
              <Typography fontSize={"sm"} fontWeight={"md"}>
                {date}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Chip
              color={
                status == "pending"
                  ? "neutral"
                  : status == "preparing" || status == "confirmed"
                  ? "warning"
                  : status == "delivered"
                  ? "success"
                  : status == "cancelled"
                  ? "danger"
                  : status === "out for delivery"
                  ? "primary"
                  : "neutral"
              }
              sx={{ borderRadius: "sm" }}
            >
              {status}
            </Chip>
          </Box>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent={"space-between"}
          maxWidth={"100%"}
          sx={{
            borderTop: `1px dashed ${theme.palette.background.level3}`,
            borderBottom: `1px dashed ${theme.palette.background.level3}`,
            py: 2,
          }}
        >
          <Box
            display={"flex"}
            flexDirection={{ xs: "row", md: "row" }}
            alignItems={"center"}
            gap={1}
            width={"95%"}
          >
            <Box minWidth={"20px"} maxWidth={"20px"} maxHeight={"20px"}>
              <Box
                width={"100%"}
                component={"img"}
                src={
                  type === "veg"
                    ? "/images/icons/veg.png"
                    : "/images/icons/non-veg.jpg"
                }
                alt="veg-non-veg.icon"
              />
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={1} width={"100%"}>
              <Typography
                fontSize={"md"}
                fontWeight={"lg"}
                textColor={
                  theme.palette.mode === "light"
                    ? theme.palette.text.menuText
                    : theme.palette.text.currency
                }
              >
                {" "}
                {qty ?? 0} x{" "}
              </Typography>
              <Typography
                fontSize={"md"}
                fontWeight={"lg"}
                textColor={
                  theme.palette.mode === "light"
                    ? theme.palette.text.menuText
                    : theme.palette.text.currency
                }
                textOverflow={"ellipsis"}
                overflow={"hidden"}
                sx={{ textWrap: "nowrap", maxWidth: "85%" }}
              >
                {name ?? "Item Name"}
              </Typography>
            </Box>
          </Box>
          <Box
            component={Link}
            href={`/user/my-orders/${id}`}
            minWidth={{ md: "5%", xs: "100%" }}
            alignItems={"center"}
            display={"flex"}
            justifyContent={"center"}
          >
            <RiArrowRightCircleFill
              color={
                theme.palette.mode === "light"
                  ? theme.palette.text.menuText
                  : theme.palette.text.currency
              }
            />
          </Box>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            borderBottom: `1px dashed ${theme.palette.background.level3}`,
            py: 2,
          }}
        >
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
          <Typography
            fontSize={"md"}
            fontWeight={"lg"}
            textColor={"text.currency"}
          >
            {" "}
            {formatePrice(amount) ?? formatePrice(0.0)}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ width: "100%" }}>
        <Grid container sx={{ width: "100%" }} spacing={1}>
          <Grid xs={6}>
            <CustomButton
              color="danger"
              variant="soft"
              onClick={() => setOpen(true)}
              text={t("cancel")}
              fullWidth={true}
              customStyle={{ px: 1, py: 1 }}
            />
          </Grid>
          <Grid xs={6}>
            <CustomButton
              color="success"
              variant="outlined"
              onClick={() => setOpenReview(true)}
              text={t("rate")}
              fullWidth={true}
              customStyle={{ px: 1, py: 1 }}
            />
          </Grid>
        </Grid>
      </CardActions>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="soft" role="alertdialog" size="lg">
          <DialogTitle sx={{ alignItems: "center" }}>
            <RiAlertFill />
            {t("confirmation")}
          </DialogTitle>
          <Divider sx={{ alignSelf: "center", width: "100%" }} />
          <DialogContent>{t("Are-you-sure-you-want-to-Cancel")}</DialogContent>

          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              width: "100%",
            }}
          >
            <Textarea
              name="Soft"
              placeholder={t("add-reason")}
              variant="soft"
              minRows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              sx={{ width: "100%" }}
            />
          </DialogActions>

          <DialogActions>
            <Button
              variant="solid"
              disabled={loading}
              color="danger"
              onClick={async () => {
                setLoading(true);
                try {
                  const formData = new FormData();
                  formData.append("order_id", id);
                  formData.append("status", "cancelled");
                  formData.append("reason", reason);
                  const res = await api.post("/update_order_status", formData);
                  if (res.data.error) {
                    toast.error(res.data.message);
                    return;
                  }
                  setLoading(false);
                  toast.success(res.data.message);
                  onCancel();
                } catch (error) {
                  setLoading(false);
                  console.log(error);
                  setOpen(false);
                }
              }}
            >
              {loading ? `${t("please-wait")}` : `${t("yes")}`}
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              disabled={loading}
              onClick={() => setOpen(false)}
            >
{t("cancel")}            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      <Modal open={openReview} onClose={() => setOpenReview(false)}>
        <ModalDialog variant="soft" role="alertdialog" size="lg">
          <ModalClose />
          <DialogTitle sx={{ alignItems: "center" }}>
            <RiStarFill /> {t("rate-product")}
          </DialogTitle>
          <Divider sx={{ alignSelf: "center", width: "100%" }} />
          <DialogContent>
            <Box
              display="flex"
              justifyContent="center"
              gap={2}
              alignItems="center"
            >
              <Box
                component={"img"}
                src={image}
                srcSet={`${image} 2x`}
                loading="lazy"
                alt={name}
                height={"120px"}
                width={"120px"}
                borderRadius={"md"}
              ></Box>
              <Typography
                fontSize={"md"}
                fontWeight={"lg"}
                textColor={
                  theme.palette.mode === "light"
                    ? theme.palette.text.menuText
                    : theme.palette.text.currency
                }
                sx={{ maxWidth: "85%" }}
              >
                {name ?? "Item Name"}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Rating onClick={handleRating} initialValue={ratingValue} />
            </Box>
            <Textarea
              placeholder="Comment"
              onChange={(event) => setMessage(event.target.value)}
              minRows={2}
              size="lg"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              disabled={loading}
              color="success"
              onClick={handleSubmit}
            >
              {loading ? "Please Wait" : "Review"}
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              disabled={loading}
              onClick={() => setOpenReview(false)}
            >
              {t("cancel")}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Card>
  );
};

export default UserOrderCard;
