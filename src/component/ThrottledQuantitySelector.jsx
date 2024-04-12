import React, { useState } from 'react';
import { Box, Typography, IconButton, useTheme } from '@mui/joy';
import { RiSubtractLine, RiAddLine } from "@remixicon/react";



  const ThrottledQuantitySelector = ({ initialValue, onChange, manageQty, productVariantId }) => {
    const [quantity, setQuantity] = useState(initialValue);
  const [throttleTimeout, setThrottleTimeout] = useState(null);
  const theme = useTheme();

  console.log(productVariantId);

  const handleClick = (type) => {
    if (throttleTimeout) {
      clearTimeout(throttleTimeout);
    }

    // if (type === "increment") {
    //   setQuantity(prevQuantity => prevQuantity + 1);
    // } else if (type === "decrement" && quantity > 1) {
    //   setQuantity(prevQuantity => prevQuantity - 1);
    // }

       // Update quantity based on the type, ensuring it's not less than 1
       if (type === "increment") {
        setQuantity((prevQuantity) => prevQuantity + 1);
      } else if (type === "decrement" && quantity > 1) {
        // Only decrement if quantity is greater than 1
        setQuantity((prevQuantity) => {
          const newQuantity = prevQuantity - 1;
          return newQuantity < 1 ? 1 : newQuantity;
        });
      }


    const timeout = setTimeout(() => {
      onChange(quantity);

      if (type === "increment") {
      manageQty(productVariantId, quantity + 1);
       
      } else if (type === "decrement" ) {
      const newQuantity = quantity - 1;
      const decrementedQuantity = quantity < 1 ? 1 : quantity;

      // Decrement qty
      manageQty(productVariantId, decrementedQuantity);
        }

    }, 800);

    setThrottleTimeout(timeout);
  };

  return (
    <Box
      border={"1px solid"}
      borderColor={"primary.400"}
      borderRadius={"md"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      minWidth={"fit-content"}
    >
      <IconButton onClick={() => handleClick("decrement")}>
        <RiSubtractLine  color={
                                        theme.palette.mode === "light"
                                          ? theme.palette.text.menuText
                                          : theme.palette.text.currency
                                      } />
      </IconButton>

      <Typography
        fontSize={"sm"}
        fontWeight={"md"}
      >
        {quantity}
      </Typography>

      <IconButton onClick={() => handleClick("increment")}>
        <RiAddLine  color={
                                        theme.palette.mode === "light"
                                          ? theme.palette.text.menuText
                                          : theme.palette.text.currency
                                      } />
      </IconButton>
    </Box>
  );
};

export default ThrottledQuantitySelector;
