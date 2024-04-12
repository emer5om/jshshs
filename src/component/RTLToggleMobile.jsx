import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Typography } from "@mui/joy";

import TextDirectionLIcon from "remixicon-react/TextDirectionLIcon";
import TextDirectionRIcon from "remixicon-react/TextDirectionRIcon";
import { toggleRTL } from "@/store/reducers/rtlSlice";



function RTLModeToggle() {





  const dispatch = useDispatch();



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
          <TextDirectionRIcon 
            size={"25px"}
            style={{ marginRight: "5px", paddingLeft: "0px" }}
          />
          <Typography fontSize={"md"} fontWeight={"lg"}>
            Right to Left
          </Typography>
        </Box>
      ) : (
        <Box display={"flex"} justifyContent={"center"}>

        <TextDirectionLIcon   style={{ marginRight: "5px", paddingLeft: "0px" }} />
        <Typography fontSize={"md"} fontWeight={"lg"}>
        left to Right

      </Typography>
      </Box>
      )}
    </IconButton>
  );
}

export default RTLModeToggle;
