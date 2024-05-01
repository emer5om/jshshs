import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  TabList,
  tabClasses,
  Drawer,
  Typography,
  Button,
} from "@mui/joy";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Search from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import {
  openSearchDrawer,
  closeSearchDrawer,
} from "../../store/reducers/searchDrawerSlice";
import { useRouter } from "next/router";
import { getUserData } from "@/events/getters";
import toast from "react-hot-toast";

const MobileNavigationBottomNavigation = () => {
  const [index, setIndex] = useState(null); // State to track the selected tab index
  const [isProfileOpen, setProfileOpen] = useState(false); // State to track profile drawer open/close
  const colors = ["primary", "danger", "success", "warning"];
  const router = useRouter();
  const userData = getUserData();
  const authentication = userData === false ? false : true;
  const dispatch = useDispatch();
  const isSearchOpen = useSelector((state) => state.searchDrawer.isSearchOpen);

  // Function to navigate to the home page
  const handleNavigateHome = () => {
    setProfileOpen(false);
    dispatch(closeSearchDrawer());
    router.push("/home"); // Navigate to the home page
  };

  const handleNavigateFavorites = () => {
    if (authentication === false) {
      return toast.error("Please Login First!");
    }
    dispatch(closeSearchDrawer());
    setProfileOpen(false);

    router.push("/user/favourites/");
  };

  const handleSearchButtonClick = () => {

    if (isSearchOpen) {
      dispatch(closeSearchDrawer());
    } else {
      dispatch(openSearchDrawer());
    }

    setProfileOpen(false);
  };

  const handleProfileOpen = () => {
    if (authentication === false) {
      return toast.error("Please Login First!");
    }
    setProfileOpen(!isProfileOpen);
    dispatch(closeSearchDrawer());
  };

  useEffect(() => {
    // Check which page we are on and set the index accordingly
  
    const path = router.pathname;
    if (path === "/home") {
      setIndex(0);
    } else if (path === "/user/favourites") {
      if (authentication === false) {
        setIndex(0);
        toast.error("Please Login First!");
      } else {
        setIndex(1);
      }
    }
  

  }, [authentication]);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        zIndex: 99999999999,
        width: "100%",
      }}
    >
      {/* Tabs for navigation */}
      <Tabs
        size="lg"
        aria-label="Bottom Navigation"
        value={index}
        onChange={(event, value) => setIndex(value)}
        sx={(theme) => ({
          p: 1,
          borderRadius: "16px 8px 0px 0px",
          mx: "auto",
          boxShadow: theme.shadow.sm,
          "--joy-shadowChannel": theme.vars.palette[colors[index]]?.darkChannel,
          [`& .${tabClasses.root}`]: {
            py: 1,
            flex: 1,
            transition: "0.3s",
            fontWeight: "md",
            fontSize: "md",
            [`&:not(.${tabClasses.selected}):not(:hover)`]: {
              opacity: 0.7,
            },
          },
        })}
      >
        <TabList
          variant="plain"
          size="sm"
          disableUnderline
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 0,
            borderRadius: "lg",
          }}
        >
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 0 && { color: colors[0], flexGrow: 1 })}
            sx={{
              color: "primary", // Set the text color
              "& .MuiSvgIcon-root": {
                color: "primary", // Set the icon color
                fontSize: "20px", // Set the icon size
              },
            }}
          >
            <Button
              sx={{
                backgroundColor: "transparent",
                width: "100%",
                height: "100%",
                textTransform: "none",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                paddingInline: "0px",
                flexDirection: "column",
                margin: "0px auto",

                "&:hover": {
                  backgroundColor: "transparent", // Add hover effect
                },
                "&:focus": {
                  outline: "none", // Remove focus outline
                },
              }}
              onClick={handleNavigateHome}
            >
              <HomeRoundedIcon sx={{ fontSize: "20px", marginBottom: "4px" }} />
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Home
              </Typography>
            </Button>
          </Tab>
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 1 && { color: colors[1], flexGrow: 1 })}
          >
            <Button
              sx={{
                backgroundColor: "transparent",
                width: "100%",
                height: "100%",
                textTransform: "none",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                paddingInline: "0px",
                flexDirection: "column",
                margin: "0px auto",

                "&:hover": {
                  backgroundColor: "transparent", // Add hover effect
                },
                "&:focus": {
                  outline: "none", // Remove focus outline
                },
              }}
              onClick={handleNavigateFavorites}
            >
              <FavoriteBorder sx={{ marginBottom: "4px" }} />
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Likes
              </Typography>
            </Button>
          </Tab>

          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 2 && { color: colors[2], flexGrow: 1 })}
          >
            <Button
              sx={{
                backgroundColor: "transparent",
                width: "100%",
                height: "100%",
                textTransform: "none",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                paddingInline: "0px",
                margin: "0px auto",

                flexDirection: "column",
                "&:hover": {
                  backgroundColor: "transparent", // Add hover effect
                },
                "&:focus": {
                  outline: "none", // Remove focus outline
                },
              }}
              // onClick={()=>handleSearchButtonClick()}
            >
              <Search sx={{ marginBottom: "4px" }} />{" "}
              {/* Add margin bottom to the icon */}
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Search
              </Typography>
            </Button>
          </Tab>

          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 3 && { color: colors[3], flexGrow: 1 })}
          >
            <Button
              sx={{
                backgroundColor: "transparent",
                width: "100%",
                height: "100%",
                textTransform: "none",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                paddingInline: "0px",
                margin: "0px auto",
                "&:hover": {
                  backgroundColor: "transparent", // Add hover effect
                },
                "&:focus": {
                  outline: "none", // Remove focus outline
                },
              }}
              onClick={handleProfileOpen}
            >
              <Person sx={{ marginBottom: "4px", color: "primary" }} />
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Profile
              </Typography>
            </Button>
          </Tab>
        </TabList>
      </Tabs>

      {/* Profile Drawer */}
      {/* Assuming Drawer is imported and correctly implemented */}
      {isProfileOpen && (
        <Drawer
          anchor="bottom"
          open={isProfileOpen}
          onClose={handleProfileOpen}
        >
          {/* Content of Profile Drawer */}
          <Box sx={{ p: 2 }}>
            {/* You can place your profile content here */}
            <Typography variant="h6" gutterBottom>
              Profile Drawer Content
            </Typography>
            <Button onClick={handleProfileOpen}>Close</Button>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default MobileNavigationBottomNavigation;
