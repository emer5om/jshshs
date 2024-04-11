import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Typography } from "@mui/joy";
import SunFillIcon from "remixicon-react/SunFillIcon";
import MoonFillIcon from "remixicon-react/MoonFillIcon";
import { useTranslation } from "react-i18next";


import { setDarkMode } from "../store/reducers/darkModeSlice";
import { useColorScheme } from "@mui/joy/styles";

function DarkModeToggle() {
  const { t, i18n } = useTranslation();

  const { mode, setMode, systemMode } = useColorScheme();

  useEffect(() => {
    if (systemMode === "dark") {
      setMode(systemMode);
      dispatch(setDarkMode("dark"));
    } else if (systemMode === "light") {
      setMode(systemMode);
      dispatch(setDarkMode("light"));
    }
  }, []);

  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.value);

  const handleToggle = () => {
    if (mode == "light") {
      dispatch(setDarkMode("dark"));
      setMode("dark");
    } else if (mode == "dark") {
      dispatch(setDarkMode("light"));
      setMode("light");
    }
  };


  return (
    <IconButton
      onClick={handleToggle}
      color="inherit"
      sx={{ justifyContent: "start" }}
    >
      {isDarkMode == "dark" ? (
        <Box display={"flex"} justifyContent={"center"}>
          <SunFillIcon color={mode == "dark" ? "white" : "black" }
            size={"25px"}
            style={{ marginRight: "5px", paddingLeft: "0px" }}
          />
          <Typography fontSize={"md"} fontWeight={"lg"}>
            {t("light")}
          </Typography>
        </Box>
      ) : (
        <Box display={"flex"} justifyContent={"center"}>

        <MoonFillIcon color={mode == "light" ? "black" : "white" } size={"22px"}  style={{ marginRight: "5px", paddingLeft: "0px" }} />
        <Typography fontSize={"md"} fontWeight={"lg"}>
        {t("dark")}

      </Typography>
      </Box>
      )}
    </IconButton>
  );
}

export default DarkModeToggle;
