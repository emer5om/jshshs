"use client";
import React from "react";
import {
  Box,
  Card,
  TextField,
  IconButton,
  SearchIcon,
  Input,
  InputAdornment,
  CardCover,
  Avatar,
  Grid,
  Typography,
  Button,
  useTheme,
} from "@mui/joy";

import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { GpsFixed, LocationCity } from "@mui/icons-material";
import Footer from "@/component/Footer/Index"
const CoverPage = () => {
  const theme = useTheme();
  return (
    <>
      <Box display="flex" position= 'relative' flexDirection="column" minHeight="100vh">
        {/* Navbar */}
        <Box
          display="flex"
          gap={1}
          py={2}
          justifyContent="space-between"
          alignItems="center"
          bgcolor={theme.palette.primary.main}
          color={theme.palette.primary.contrastText}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              maxWidth: "100%",
              width: "200px",
              height: "65px",
            }}
          >
            <img
              src="/images/logo.png"
              alt="eRestro Single Vendor Logo"
              sx={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Box>

          <Box>
            <Button
              variant={"solid"}
              color={"primary"}
              
              sx={{
                py: 1,
                borderRadius: "var(--border-radius-lg)", 
                color: theme.palette.text.primary, // Change the text color to white
                // Adjust the value as needed for the desired roundness
                "&.MuiButton-contained": {
                  borderRadius: "var(--border-radius-lg)", // Ensure rounded corners for contained state as well
                },
              }}
            >
              Register
            </Button>
          </Box>
        </Box>

        {/* Hero Section */}
        <Box flex="1" my={4}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ my: { md: 16, xs: 1 } }}>
                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "2.0rem", md: "2.5rem" },
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                    mb: 1,
                  }}
                >
                  Taste the Difference Explore Our{" "}
                  <span style={{ color: theme.palette.text.currency }}>
                    Menu!
                  </span>
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "400",
                    color: theme.palette.text.tertiary,
                    mb: 2,
                  }}
                >
                  Where Each Plate Weaves a Story of Culinary Mastery and
                  Passionate Craftsmanship
                </Typography>
                <Box sx={{ mb: 2, maxWidth: { md: "80%", xs: "100%" } }}>
                  <Input
                    startDecorator={<LocationCity />}
                    placeholder="Choose a location"
                    endDecorator={
                      <Box display={"flex"} alignItems={"center"} gap={1}>
                        <IconButton>
                          <GpsFixed />
                        </IconButton>
                        <Button>Search</Button>
                      </Box>
                    }
                    sx={{
                      "--Input-minHeight": "50px",
                    }}
                  ></Input>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  maxWidth: "100%",
                  height: { xs: "350px", md: "500px" },
                  border: 0,
                }}
              >
                <CardCover>
                  <img
                    src="/images/cover_image_hero.png"
                    loading="lazy"
                    alt=""
                    style={{
                      objectFit: "contain",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                  />
                </CardCover>
              </Card>
            </Grid>
          </Grid>
        </Box>

 

      <img
      
        src="/images/food-items-hero.svg"
        alt="Your image"
        style={{
          position: 'absolute',
          top: '428px',
          left: "-400px",
          width: '100%',
          height: '44%',
        }}
      />
    </Box> 
      

<Box sx={{py:6}}>
    <Grid container spacing={4}>

  <Grid item xs={12} md={6}>
    <Box sx={{ display: 'flex', flexDirection: 'column', }}>

    <Typography level="h4" sx={{ mb: 2, color: theme.palette.text.currency}}>
      Our Story & Services
    </Typography>

      <Typography
                  variant="h1"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "2.0rem", md: "2.5rem" },
                    fontWeight: "bold",
                    lineHeight:1.2,
                    color: theme.palette.text.primary,
                    mb: 4,
                  }}
                >
                         Our Culinary Journey And Services

                </Typography>


      <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "400",
                    color: theme.palette.text.tertiary,
                    mb: 4,
                  }}
                >
                         Rooted in passion, we curate unforgettable dining experiences and offer exceptional services, blending culinary artistry with warm hospitality.

                </Typography>

<Box>


      <Button
              variant={"solid"}
              color={"primary"}
              
              sx={{
                py: 1.5,
                px:4,
                borderRadius: "var(--border-radius-lg)", 
                color: theme.palette.text.primary, // Change the text color to white
                // Adjust the value as needed for the desired roundness
                "&.MuiButton-contained": {
                  borderRadius: "var(--border-radius-lg)", // Ensure rounded corners for contained state as well
                },
              }}
            >
              Explore
            </Button>
</Box>

    
    </Box>
  </Grid>

  {/* <Grid item xs={12} md={6}>
    <Grid container spacing={4} justifyContent="center">
      <Grid item>
        <Box>
          <Typography level="h5" sx={{ mb: 1 }}>
            Catering
          </Typography>
          <Typography level="body2" sx={{ color: 'text.secondary' }}>
            Delight your guests with our flawless and presentation
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box>
          <Typography level="h5" sx={{ mb: 1 }}>
            Fast Delivery
          </Typography>
          <Typography level="body2" sx={{ color: 'text.secondary' }}>
            We deliver your order promptly to your door
          </Typography>
        </Box>
      </Grid>
    </Grid>
    <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
      <Grid item>
        <Box>
          <Typography level="h5" sx={{ mb: 1 }}>
            Online Ordering
          </Typography>
          <Typography level="body2" sx={{ color: 'text.secondary' }}>
            Explore menu &amp; order with ease using our Online Ordering
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box>
          <Typography level="h5" sx={{ mb: 1 }}>
            Gift Cards
          </Typography>
          <Typography level="body2" sx={{ color: 'text.secondary' }}>
            Give the gift of exceptional dining with Food Gift Cards
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Grid> */}

<Grid item xs={12} md={6}>
    
<Grid container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
  <Grid xs={8}>
  <Card
  variant="outlined"
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: 4,
  }}
>
  <CardGiftcardIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
  <Typography level="h6" component="div" mb={1}>
    GIFT CARDS
  </Typography>
  <Typography level="body2" sx={{ color: 'text.secondary' }}>
    Give the gift of exceptional dining with Foodi Gift Cards
  </Typography>
</Card>
  </Grid>
  <Grid xs={8}>
  <Card
  variant="outlined"
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: 4,
  }}
>
  <CardGiftcardIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
  <Typography level="h6" component="div" mb={1}>
    GIFT CARDS
  </Typography>
  <Typography level="body2" sx={{ color: 'text.secondary' }}>
    Give the gift of exceptional dining with Foodi Gift Cards
  </Typography>
</Card>
  </Grid>
</Grid>

<Grid container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
  <Grid xs={8}>
  <Card
  variant="outlined"
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: 4,
  }}
>
  <CardGiftcardIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
  <Typography level="h6" component="div" mb={1}>
    GIFT CARDS
  </Typography>
  <Typography level="body2" sx={{ color: 'text.secondary' }}>
    Give the gift of exceptional dining with Foodi Gift Cards
  </Typography>
</Card>
  </Grid>
  <Grid xs={8}>
  <Card
  variant="outlined"
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: 4,
  }}
>
  <CardGiftcardIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
  <Typography level="h6" component="div" mb={1}>
    GIFT CARDS
  </Typography>
  <Typography level="body2" sx={{ color: 'text.secondary' }}>
    Give the gift of exceptional dining with Foodi Gift Cards
  </Typography>
</Card>  </Grid>
</Grid>
    </Grid>

</Grid>
</Box>


        {/* Footer */}
        <Box
      bgcolor={theme.palette.text.currency}
      color="white"
      p={2}
      sx={{
        textAlign: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* Add your footer content here */}
      <Typography variant="body2" bgcolor={theme.palette.text.currency} color={theme.palette.common.white}>
        &copy; 2024 Infinitie Technologies | All rights reserved
      </Typography>
    </Box>
    </>
  );
};

export default CoverPage;
