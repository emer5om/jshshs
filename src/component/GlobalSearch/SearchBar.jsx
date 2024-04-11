"use client";
import { Box, Grid, IconButton, Input, useTheme } from "@mui/joy";
import { RiMapPin2Line, RiSearch2Line } from "@remixicon/react";
import React from "react";
import LocationModal from "../Modals/LocationModal";
import { useTranslation } from "react-i18next";

const SearchBar = ({ onClick }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme()

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
        <Grid xs={8} sm={10}>
          <Input
            onClick={onClick}
            endDecorator={
              <RiSearch2Line
                color={theme.palette.mode === "dark" ? "white" : "black"}
              />
            }
            placeholder={t("Type-your-cravings-we'll-do-the-chasing")}
            variant="soft"
            size="lg"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBar;
