import React, { useEffect } from "react";
import { Box, Container, Grid, Typography, Link, useTheme } from "@mui/joy";
import { useSelector } from "react-redux";
import { getSettings } from "@/store/reducers/settingsSlice";

const MobileAppSection = () => {
  const settings = useSelector((state) => state.settings.value);
  const theme = useTheme();

  const [state, setState] = React.useState(false);
  useEffect(() => {
    if (settings && settings?.web_settings.length != 0)
      setState(settings.web_settings[0]);
  }, [settings]);

  return (
    <>
      {state && state.app_download_section && (
        <Box
          sx={{
            backgroundColor: theme.palette.background,
            my: 4,
            borderRadius: 2,
            py: 4,
          }}
        >
          {state.app_download_section_appstore_url !== "" &&
            state.app_download_section_playstore_url !==
              "app_download_section_playstore_url" && (
              <Grid container>
                <Grid
                  item
                  sm={12}
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    maxHeight: {
                      sm: "600px", // Limit the width to 400px on small screens
                      md: "600px", // Limit the width to 400px on small screens
                    },
                    height: {
                      md: "600px", // Limit the width to 400px on small screens
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      maxWidth: {
                        sm: "400px", // Limit the width to 400px on small screens
                        md: "600px", // Limit the width to 400px on small screens
                      },
                      maxHeight: {
                        sm: "400px", // Limit the width to 400px on small screens
                        md: "600px", // Limit the width to 400px on small screens
                      },
                    }}
                  >
                    <img
                      src="/homescreen.svg"
                      alt="Mobile App"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        display: "flex",
                      }}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    {/*<Typography variant="h1" gutterBottom>*/}
                    <h1>{state.app_download_section_title}</h1>

                    {/*</Typography>*/}
                    <Typography
                      variant="h3"
                      color="text.secondary"
                      gutterBottom
                    >
                      {state.app_download_section_tagline}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {state.app_download_section_short_description}
                    </Typography>

                    <Box sx={{ mt: 3 }}>
                      {state.app_download_section_appstore_url !== "" && (
                        <Link
                          href={state.app_download_section_appstore_url}
                          sx={{ mx: 2 }}
                          target="_blank"
                          rel="noopener"
                        >
                          <img
                            src="/app-store.webp"
                            alt="App Store"
                            style={{ width: 150, marginRight: 1 }}
                          />
                        </Link>
                      )}
                      {state.app_download_section_playstore_url !== "" && (
                        <Link
                          href={state.app_download_section_playstore_url}
                          target="_blank"
                          rel="noopener"
                        >
                          <img
                            src="/google-play-store.webp"
                            alt="Google Play Store"
                            style={{ width: 150 }}
                          />
                        </Link>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            )}
        </Box>
      )}
    </>
  );
};

export default MobileAppSection;
