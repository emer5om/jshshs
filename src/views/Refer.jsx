"use client";

import React, { useEffect, useState } from "react";
import { Box, Chip, Typography, useTheme } from "@mui/joy";

import toast from "react-hot-toast";
import Image from "next/image";
import { useSelector } from "react-redux";
import { get_settings } from "@/interceptor/routes";
import { getUserData } from "@/events/getters";
import { useTranslation } from "react-i18next";

// import "@lottiefiles/lottie-player";

const Refer = () => {
  const theme = useTheme();
  const userData = getUserData();
  const [userRefer, setUserRefer] = useState([]);
  const { t } = useTranslation();

  const userSettings = async () => {
    const getUserSettingsX = await get_settings({ user_id: userData.id });
    setUserRefer(getUserSettingsX.data.user_data);
  };

  useEffect(() => {
    userSettings();
  }, []);

  const handleCopyClick = async (value) => {
    try {
      await navigator?.clipboard.writeText(value);
      toast("Code Copied");
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <Box marginTop={4} width={"100%"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Box maxWidth={"100%"} maxHeight={"100%"}>
          <Box width={"100%"} height={"400px"}>
            <Box
              component={"img"}
              src={"/images/assets/refer-and-earn.png"}
              height={"100%"}
              width={"100%"}
            ></Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          gap={1}
          textAlign={"center"}
        >
          <Typography
            fontSize={"xl"}
            fontWeight={"xl"}
            textColor={
              theme.palette.mode === "light"
                ? theme.palette.text.menuText
                : theme.palette.text.currency
            }
          >
            {t("Refer-And-Earn")}
          </Typography>
          <Typography fontSize={"lg"} fontWeight={"md"}>
            {t("Invite-your-friends")}
          </Typography>
          <Typography fontSize={"md"} fontWeight={"md"}>
            {t("Your-Referral-code")}
          </Typography>
          {userRefer[0]?.referral_code && (
            <Chip
              color="warning"
              sx={{
                borderStyle: "dashed",
                borderWidth: "1px",
                borderRadius: "sm",
                cursor: "pointer",
              }}
              onClick={(e) => handleCopyClick(userRefer[0]?.referral_code)}
            >
              {userRefer[0]?.referral_code}
            </Chip>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Refer;
