"use client";
import { Button } from "@mui/joy";
import React from "react";

const CustomButton = ({
  variant = "outlined",
  text,
  size = "small",
  color = "primary",
  decorationDirection,
  decoration,
  loadingStatus,
  loadingStatusPosition,
  disabled = false,
  onClick,
  customStyle,
  fullWidth,
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      sx={{ color: "currency", ...customStyle }} // Change text color to red
      fullWidth={fullWidth}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
