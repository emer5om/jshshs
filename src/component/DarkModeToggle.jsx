import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/joy";
import SunFillIcon from "remixicon-react/SunFillIcon";
import MoonFillIcon from "remixicon-react/MoonFillIcon";

import { setDarkMode } from "../store/reducers/darkModeSlice";
import { useColorScheme } from "@mui/joy/styles";

function DarkModeToggle() {
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
    <IconButton onClick={handleToggle} color="inherit" sx={{}}>
      {isDarkMode == "dark" ? (
        <MoonFillIcon
          color={mode == "light" ? "black" : "white"}
          size={"20px"}
        />
      ) : (
        <SunFillIcon color={mode == "dark" ? "white" : "black"} size={"20px"} />
      )}
    </IconButton>
  );
}

export default DarkModeToggle;
