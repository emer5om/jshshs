

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Search from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";

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
  useTheme,
  Stack,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import {
  openSearchDrawer,
  closeSearchDrawer,
} from "../../store/reducers/searchDrawerSlice";
import { useRouter } from "next/router";
import { getUserData } from "@/events/getters";
import toast from "react-hot-toast";
import {
  RiMapPin2Line,
  RiShutDownLine,
  RiFilePaper2Line,
} from "@remixicon/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ExchangeDollarLineIcon from "remixicon-react/FileListLineIcon";
import { logout } from "@/events/actions";

const TabButton = ({ icon, label, onClick }) => (
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
      "&:hover": { backgroundColor: "transparent" },
      "&:focus": { outline: "none" },
    }}
    onClick={onClick}
  >
    {icon}
    <Typography
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {label}
    </Typography>
  </Button>
);

const MobileNavigationBottomNavigation = () => {
  const [index, setIndex] = useState(0);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const router = useRouter();
  const authentication = useSelector((state) => state.authentication.isLogged);
  const dispatch = useDispatch();
  const isSearchOpen = useSelector((state) => state.searchDrawer.isSearchOpen);
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0); // Define lastScrollPosition

  const handleNavigate = (path) => () => {
    setProfileOpen(false);
    dispatch(closeSearchDrawer());
    router.push(path);
  };

  const handleSearchButtonClick = () => {
    dispatch(isSearchOpen ? closeSearchDrawer() : openSearchDrawer());
    setProfileOpen(false);
    if (isSearchOpen) {
      setIndex(2);
    } else {
      const currentPath = router.pathname;
      if (currentPath === "/home") {
        setIndex(0);
      } else if (currentPath === "/user/favourites") {
        setIndex(1);
      }
    }
  };

  const handleProfileOpen = () => {
    if (!authentication) {
      toast.error("Please Login First!");
      dispatch(closeSearchDrawer());
      return;
    }
    setProfileOpen((prev) => !prev);
    dispatch(closeSearchDrawer());
  };

  useEffect(() => {
    const path = router.pathname;
    if (path === "/home") {
      setIndex(0);
    } else if (path === "/user/favourites") {
      if (!authentication) {
        toast.error("Please Login First!");
        setIndex(0);
      } else {
        setIndex(1);
      }
    }
  }, [router.pathname, authentication]);

  const handleTabChange = (event, newValue) => {
    if (!authentication && newValue !== 0 && newValue !== 2) {
      toast.error("Please Login First!");
      return;
    }
    setIndex(newValue);
  };

  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      setIsVisible(currentScrollPosition < lastScrollPosition);
      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPosition]);

  return (
    <Box
      sx={{ position: "fixed", bottom: 0, zIndex: 999, width: "100%", 
      transition: "transform 0.3s",
      transform: isVisible ? "translateY(0)" : "translateY(100%)",
    }}
    >
      <Tabs
        size="lg"
        aria-label="Bottom Navigation"
        value={index}
        onChange={handleTabChange}
        sx={(theme) => ({
          p: 1,
          backgroundColor:
            theme.palette.mode == "dark"
              ? theme.palette.body
              : theme.palette.primary[500],
          borderRadius: "16px 8px 0px 0px",
          mx: "auto",
          boxShadow: theme.shadow.sm,
          "--joy-shadowChannel":
            theme.vars.palette[
              ["primary", "danger", "success", "warning"][index]
            ]?.darkChannel,
          [`& .${tabClasses.root}`]: {
            py: 1,
            flex: 1,
            transition: "0.3s",
            fontWeight: "md",
            fontSize: "md",
            [`&:not(.${tabClasses.selected}):not(:hover)`]: { opacity: 0.7 },
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
          {[
            {
              icon: (
                <HomeRoundedIcon
                  sx={{
                    fontSize: "20px",
                    marginBottom: "4px",
                    color:
                      theme.palette.mode == "dark"
                        ? theme.palette.common.white
                        : theme.palette.common.black,
                  }}
                />
              ),
              // label: "Home",
              onClick: handleNavigate("/home"),
            },
            {
              icon: (
                <FavoriteBorder
                  sx={{
                    marginBottom: "4px",
                    color:
                      theme.palette.mode == "dark"
                        ? theme.palette.common.white
                        : theme.palette.common.black,
                  }}
                />
              ),
              // label: "Likes",
              onClick: authentication
                ? handleNavigate("/user/favourites/")
                : () => toast.error("Please Login First!"),
            },
            {
              icon: (
                <Search
                  sx={{
                    marginBottom: "4px",
                    color:
                      theme.palette.mode == "dark"
                        ? theme.palette.common.white
                        : theme.palette.common.black,
                  }}
                />
              ),
              // label: "Search",
              onClick: handleSearchButtonClick,
            },
            {
              icon: (
                <Person
                  sx={{
                    marginBottom: "4px",
                    color:
                      theme.palette.mode == "dark"
                        ? theme.palette.common.white
                        : theme.palette.common.black,
                  }}
                />
              ),
              // label: "Profile",

              onClick: authentication
              ? handleNavigate("/user/profile/")
              : () => toast.error("Please Login First!"),

              // onClick: handleProfileOpen,
            },
          ].map((item, idx) => (
            <Tab
              key={idx}
              disableIndicator
              orientation="vertical"
              {...(index === idx && {
                color: ["primary", "danger", "success", "warning"][idx],
                flexGrow: 1,
              })}
            >
              <TabButton {...item} />
            </Tab>
          ))}
        </TabList>
      </Tabs>
      {isProfileOpen && (
        <Drawer
          size="sm"
          anchor="bottom"
          open={isProfileOpen}
          onClose={handleProfileOpen}
        >
          <Box
            width={"100%"}
            justifyContent={"center"}
            display={"flex"}
            alignItems={"left"}
            textAlign={"start"}
            my={4}
            px={4}
          >
            <Stack spacing={4} width={"100%"}>
              <Typography
                fontSize={"md"}
                fontWeight={"lg"}
                component={Link}
                href={"/user/my-orders"}
                startDecorator={<RiFilePaper2Line />}
                onClick={handleProfileOpen}
              >
                {t("my-orders")}
              </Typography>

              <Typography
                fontSize={"md"}
                fontWeight={"lg"}
                component={Link}
                href={"/user/transactions"}
                startDecorator={<ExchangeDollarLineIcon />}
                onClick={handleProfileOpen}
              >
                {t("transactions")}
              </Typography>

              <Typography
                fontSize={"md"}
                fontWeight={"lg"}
                component={Link}
                href={"/user/address"}
                startDecorator={
                  <RiMapPin2Line color={theme.palette.text.primary} />
                }
                onClick={handleProfileOpen}
              >
                {t("addresses")}
              </Typography>

              <Typography
                fontSize={"md"}
                fontWeight={"lg"}
                component={Link}
                href={"/user/address"}
                startDecorator={
                  <RiShutDownLine color={theme.palette.text.primary} />
                }
                onClick={() => {
                  handleProfileOpen();
                  router.replace("/");
                  logout();
                }}
              >
                {t("logout")}
              </Typography>
            </Stack>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default MobileNavigationBottomNavigation;



