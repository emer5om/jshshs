import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Typography, useTheme } from "@mui/joy";

import TextDirectionLIcon from "remixicon-react/TextDirectionLIcon";
import TextDirectionRIcon from "remixicon-react/TextDirectionRIcon";
import { toggleRTL } from "@/store/reducers/rtlSlice";
import { useTranslation } from "react-i18next";

function RTLModeToggle() {
  const dispatch = useDispatch();

  const {t}= useTranslation();

  const theme = useTheme();

  const layoutDirection = useSelector((state) => state.rtl.layoutDirection);

  const toggleLayoutDirection = () => {
    const newDirection = layoutDirection === "ltr" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", newDirection); // Update HTML dir attribute
    dispatch(toggleRTL(newDirection)); // Dispatch action with new direction
  };

  return (
    <IconButton
      onClick={toggleLayoutDirection}
      color="inherit"
      sx={{ justifyContent: "start" }}
    >
      {layoutDirection == "rtl" ? (
        <Box display={"flex"} justifyContent={"center"}>
          <TextDirectionLIcon
            color={theme.palette.mode == "dark" ? "white" : "black"}
            style={{ marginRight: "5px", paddingLeft: "0px" }}
          />
          <Typography fontSize={"md"} fontWeight={"lg"}>
            {t("left-to-right")}
          </Typography>
        </Box>
      ) : (
        <Box display={"flex"} justifyContent={"center"}>
          <TextDirectionRIcon
            color={theme.palette.mode == "dark" ? "white" : "black"}
            size={"25px"}
            style={{ marginRight: "5px", paddingLeft: "0px" }}
          />
          <Typography fontSize={"md"} fontWeight={"lg"}>
            {t("right-to-left")}
          </Typography>
        </Box>
      )}
    </IconButton>
  );
}

export default RTLModeToggle;
