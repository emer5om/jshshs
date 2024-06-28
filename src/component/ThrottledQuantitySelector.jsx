import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/joy";
import { RiSubtractLine, RiAddLine } from "@remixicon/react";
import { useSelector } from "react-redux";

const ThrottledQuantitySelector = ({
  initialValue,
  onChange,
  manageQty,
  productVariantId,
  addons,
  cart_id,
  branch_id,
}) => {
  const [quantity, setQuantity] = useState(initialValue);
  const [throttleTimeout, setThrottleTimeout] = useState(null);
  const theme = useTheme();

  // Fetch cart data from the Redux store
  const cartData = useSelector((state) => state?.cart?.data);

  // Find the cart item with the matching productVariantId
  const cartItem = cartData.find(
    (item) => item.productVariantId == productVariantId
  );

  // Update local quantity state when cart item quantity changes
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.qty);
    } else {
      setQuantity(initialValue);
    }
  }, [cartItem, initialValue]);

  const handleClick = (type) => {
    if (throttleTimeout) {
      clearTimeout(throttleTimeout);
    }

    if (type === "increment") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (type === "decrement" && quantity >= 1) {
      // Only decrement if quantity is greater than 1
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        return newQuantity < 1 ? 1 : newQuantity;
      });
    }

    const timeout = setTimeout(() => {
      if (type === "increment") {
        manageQty(addons, productVariantId, quantity + 1, cart_id);
      } else if (type === "decrement") {
        const newQuantity = quantity - 1;
        const decrementedQuantity = quantity < 1 ? 1 : quantity;

        // Decrement qty

        manageQty(
          addons,
          productVariantId,
          decrementedQuantity - 1,
          cart_id,
          branch_id
        );
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
        <RiSubtractLine
          color={
            theme.palette.mode === "light"
              ? theme.palette.text.menuText
              : theme.palette.text.currency
          }
        />
      </IconButton>

      <Typography fontSize={"sm"} fontWeight={"md"}>
        {quantity}
      </Typography>

      <IconButton onClick={() => handleClick("increment")}>
        <RiAddLine
          color={
            theme.palette.mode === "light"
              ? theme.palette.text.menuText
              : theme.palette.text.currency
          }
        />
      </IconButton>
    </Box>
  );
};

export default ThrottledQuantitySelector;
