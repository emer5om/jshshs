"use client";
import React, { useEffect } from "react";
import { Container, Grid, Box, Typography, Stack } from "@mui/joy";
import Link from "next/link";
import FacebookCircleLineIcon from "remixicon-react/FacebookCircleLineIcon";
import InstagramFillIcon from "remixicon-react/InstagramFillIcon";
import TwitterLineIcon from "remixicon-react/TwitterLineIcon";
import YoutubeLineIcon from "remixicon-react/YoutubeLineIcon";
import { useTheme } from "@mui/joy/styles";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Index = () => {
  const settings = useSelector((state) => state.settings.value);
  const [setting, setSettings] = React.useState(false);

  useEffect(() => {
    if (settings && settings?.web_settings.length != 0)
      setSettings(settings.web_settings[0]);
  }, [settings]);
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Grid mt={8} container sx={{px:{xs:1,sm:4, md:4}}} bgcolor={theme.palette.background.footer}>
      <Grid
        xs={12}
        sx={{ height: "100%", padding: {xs:1,sm:2}, color: "white", width: "100%" }}
      >
        <Box sx={{ marginTop: {xs:2 }, textAlign: { xs: "center", md: "left" } }}>
          <Grid container spacing={4} m={0} width={"100%"} color={"white"}>
            <Grid xs={12} md={6}>
              <Box
                display={"flex"}
                alignItems={"flex-start"}
                flexDirection={"column"}
              >
                <Box display={"flex"} alignItems={"center"}>
  <img
    src={setting.light_logo}
    alt="logo"
    height={50}
    style={{ maxWidth: "100%" }} // Set maxWidth to prevent stretching
    loading="lazy"
  />
</Box>

                <Box mt={2}>
                  <Typography level="title-sm" textColor={"white"}>
                    {setting && setting.app_short_description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} md={6} color={"white"} spacing={12} gap={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "center", md: "baseline" },
                }}
                gap={{ xs: 2 }}
              >
                <Box
                  mx={{ xs: 0, sm: 4, md: 5, lg: 12 }}
                  sx={{
                    textAlign: { xs: "center", md: "left" },
                    minWidth: { md: "110px" },
                  }}
                >
                  <Typography
                    id="decorated-list-demo"
                    level="body-lg"
                    fontWeight={"bolder"}
                    mb={2}
                    textColor={"white"}
                  >
                    {t("main-menu")}
                  </Typography>
                  <Stack gap={2}>
                    <Link href={"/home"}>
                      <Typography textColor={"white"}>{t("home")}</Typography>
                    </Link>
                    <Link href={"/categories"}>
                      <Typography textColor={"white"}>
                        {t("categories")}
                      </Typography>
                    </Link>
                    <Link href={"/terms-conditions"}>
                      <Typography textColor={"white"}>
                        {t("terms-condition")}
                      </Typography>
                    </Link>
                    <Link href={"/privacy-policy"}>
                      <Typography textColor={"white"}>
                        {t("privacy-policy")}
                      </Typography>
                    </Link>
                    <Link href={"/about"}>
                      <Typography textColor={"white"}>{t("about")}</Typography>
                    </Link>
                    <Link href={"/contact-us"}>
                      <Typography textColor={"white"}>
                        {t("contact-us")}
                      </Typography>
                    </Link>
                  </Stack>
                </Box>
                <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                  <Typography
                    id="decorated-list-demo"
                    level="body-lg"
                    fontWeight={"bolder"}
                    mb={2}
                    textColor={"white"}
                  >
                    {t("contact-us")}
                  </Typography>
                  <Stack gap={2}>
                    {setting && setting.support_email && (
                      <Link href={"mailto:" + setting.support_email}>
                        <Typography textColor={"white"}>
                          {setting.support_email}
                        </Typography>
                      </Link>
                    )}
                    {setting && setting.support_number && (
                      <Link href={"tel:" + setting.support_number}>
                        <Typography textColor={"white"}>
                          {setting.support_number}
                        </Typography>
                      </Link>
                    )}
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4} width={"100%"} m={0} color={"white"}>
            <Grid xs={12} md={5}>
              <Box
                display={"flex"}
                gap={2}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Link href={setting.facebook_link ? setting.facebook_link : ""}>
                  <Box
                    sx={{
                      border: "1px solid",
                      borderRadius: "100%",
                      color: "white",
                    }}
                    justifyContent={"center"}
                    height={"35px"}
                    width={"35px"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <FacebookCircleLineIcon className="noRotate" size={25} />
                  </Box>
                </Link>
                <Link
                  href={setting.instagram_link ? setting.instagram_link : ""}
                >
                  <Box
                    sx={{
                      border: "1px solid",
                      borderRadius: "100%",
                      color: "white",
                    }}
                    justifyContent={"center"}
                    height={"35px"}
                    width={"35px"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <InstagramFillIcon className="noRotate" size={25} />
                  </Box>
                </Link>
                <Link href={setting.youtube_link ? setting.youtube_link : ""}>
                  <Box
                    sx={{
                      border: "1px solid",
                      borderRadius: "100%",
                      color: "white",
                    }}
                    justifyContent={"center"}
                    height={"35px"}
                    width={"35px"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <TwitterLineIcon className="noRotate" size={25} />
                  </Box>
                </Link>
                <Link href={setting.youtube_link ? setting.youtube_link : ""}>
                  <Box
                    sx={{
                      border: "1px solid",
                      borderRadius: "100%",
                      color: "white",
                    }}
                    justifyContent={"center"}
                    height={"35px"}
                    width={"35px"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <YoutubeLineIcon className="noRotate" />
                  </Box>
                </Link>
              </Box>
            </Grid>
            <Grid xs={12} md={7}>
              <Typography
                textColor={"#ffff"}
                sx={{ textAlign: { xs: "center", md: "left" } }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: setting && setting.copyright_details,
                  }}
                />
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Index;
