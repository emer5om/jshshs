"use client";
import { Box, Grid, IconButton, Input, useTheme } from "@mui/joy";
import { RiMapPin2Line, RiSearch2Line } from "@remixicon/react";
import React from "react";
import LocationModal from "../Modals/LocationModal";
import { useTranslation } from "react-i18next";

const SearchBar = ({ onClick }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        my: [2, null, 4], // 2 for default, null for sm, 4 for md
        width: "100%",
      }}
    >
      {/* sx={{display: {xs: "block", md: "none"}}} */}

      <Grid
        container
        sx={{
          flexGrow: 1,
          alignItems: "center",
          display: "flex",
          justifyContent: "space-around",
          gap: { xs: 2, md: 2 },
        }}
      >
        <Grid xs={1}>
          <IconButton variant="plain">
            <LocationModal />
          </IconButton>
        </Grid>
        <Grid xs={8} onClick={onClick} sm={10}>
         
          <Input
            disabled={true}
            className="MUIInput"
            sx={{
              
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000000",
              },
            }}
            endDecorator={
              <RiSearch2Line
                color={theme.palette.mode === "dark" ? "white" : "black"}
              />
            }
            placeholder={t("Type-your-cravings-we'll-do-the-chasing")}
            variant="soft"
            size="lg"
          />

          {/* <div
        
    style={{
      // border: "1px solid #ccc", // Add border to create box-like appearance
      borderRadius: "4px", // Add border radius for rounded corners
      display: "flex", // Ensure the div behaves like a flex container
      alignItems: "center", // Align items vertically
      padding: "12px", // Add padding for spacing inside the box
      justifyContent:"space-between",
      backgroundColor: theme.palette.neutral.softBg, // Apply background color from theme
      flexWrap: "wrap", // Make text wrap when it overflows
      overflowX:true
    }}
  >
   
    <span
    >{t("Type-your-cravings-we'll-do-the-chasing")}</span>
    <RiSearch2Line
      style={{
        marginRight: "8px", // Add margin to separate the icon from the input
        color: theme.palette.mode === "dark" ? "white" : "black",
      }}
    />
  </div> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBar;
