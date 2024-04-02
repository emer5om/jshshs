"use client";
import react, { useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/joy";
import CoverPage from "@/views/CoverPage";
import { getBranchId } from "@/events/getters";
import { useRouter } from "next/router";
import { HeadTitle } from "@/component/HeadTitle";
import React from "react";
import MobileAppSection from "@/component/AppDownload";
import { useSelector } from "react-redux";
import { getSettings } from "@/store/reducers/settingsSlice";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const branchId = getBranchId();
    if (branchId != 0) {
      router.replace("/home");
    }
  }, []);
  const settings = useSelector((state) => state.settings.value);
  const [setting, setSettings] = React.useState(false);
  useEffect(() => {
    getSettings();
    if (settings && settings?.web_settings.length != 0)
      setSettings(settings.web_settings[0]);
  }, [settings]);


  return (
    <>
      <HeadTitle title={""} />
      {setting && (
        <Head>
          <link rel="icon" href={setting.favicon} type="image/*" sizes="any" />
        </Head>
      )}
      <Container>
        <CoverPage />
        <Container>
          <MobileAppSection />
        </Container>
      </Container>
      {/* Footer */}
      <Box
        bgcolor="text.currency"
        color="white"
        p={2}
        sx={{
          textAlign: "center",
          alignItems: "center",
          width: "100%",
          bottom: 0, // Align it to the bottom of the viewport
          left: 0, // Align it to the left of the viewport
          right: 0, // Align it to the right of the viewport
          zIndex: 9999, // Ensure it stays above other content
          overflowX: "hidden", // Hide horizontal overflow
        }}
      >
        {/* Add your footer content here */}

        <Typography variant="body2" bgcolor="text.currency" color="white">
          {setting.copyright_details}
        </Typography>
      </Box>
    </>
  );
}
