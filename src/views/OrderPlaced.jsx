"use client";
import React, { useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/joy";
import Supprise from "@/component/Supprise";
import { useRouter } from "next/router";

const OffersView = () => {
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer);
  }, []); // This effect runs only once when the component mounts

  return (
    <Box>
      <Box my={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            maxWidth: "600px",
            margin: "auto",
          }}
        >
          {/* Use the Image component to display the 404 image */}
          <Box
            component={'img'}
          ></Box>
          <img
            src={"/order_successfull.svg"}
            alt="Order successful"
            style={{
              margin: "auto",
            }}
          />
        </Box>
        <Box
          sx={{
            maxWidth: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              textAlign={"center"}
              textColor={
                theme.palette.mode === "light"
                  ? theme.palette.text.menuText
                  : theme.palette.text.currency
              }
              fontSize={"xl"}
              fontWeight={"xl"}
            >
              Your order has been successfully placed 🎉
            </Typography>
          </Box>
        </Box>
      
      

        <Supprise />
      </Box>
    </Box>
  );
};

export default OffersView;
