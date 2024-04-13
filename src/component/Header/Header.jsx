"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Dropdown,
  Grid,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
  useTheme,
  ListItemDecorator,
  Apps,
} from "@mui/joy";

import TextDirectionLIcon from "remixicon-react/TextDirectionLIcon";
import TextDirectionRIcon from "remixicon-react/TextDirectionRIcon";
import ShoppingBag3LineIcon from "remixicon-react/ShoppingBag3LineIcon";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import ArrowRightLine from "remixicon-react/ArrowRightLineIcon";

import { RiMapPin2Line } from "@remixicon/react";
import NavMenuButton from "./NavMenuButton";
import Link from "next/link";
import Image from "next/image";
import {
  RiFilePaper2Line,
  RiGlobalLine,
  RiHeartLine,
  RiShutDownLine,
  RiUser3Line,
} from "@remixicon/react";

import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/store/reducers/languageSlice";
import SearchModal from "@/component/Modals/SearchModal";
import LocationModal from "../Modals/LocationModal";
import LoginModal from "@/component/Modals/LoginModal";
import { setLogout } from "@/store/reducers/authenticationSlice";
import { useRouter } from "next/router";
import { getBranchId } from "@/events/getters";
import { useTranslation } from "react-i18next";
import { languages } from "@/i18n";
import { logout } from "@/events/actions";
import DarkModeToggle from "@/component/DarkModeToggle";
import { useColorScheme } from "@mui/joy/styles";
import { toggleRTL } from "@/store/reducers/rtlSlice";

const Header = () => {
  const { t, i18n } = useTranslation();

  const router = useRouter();
  useEffect(() => {
    const branchId = getBranchId();

    if (branchId === 0) {
      router.push("/");
    }
  }, []);
  const settings = useSelector((state) => state.settings);
  const city = useSelector((state) => state.selectedCity.value);
  const Thememode = useSelector((state) => state.darkMode.value);

  const logoSrc =
    Thememode === "dark"
      ? settings?.value?.web_settings[0]?.light_logo
      : settings?.value?.web_settings[0]?.logo;

  const dispatch = useDispatch();

  const authStoreData = useSelector((state) => state.authentication);
  const cartStoreData = useSelector((state) => state.cart);

  // const userDetails = [[0, 1]]

  const [menuIndex, setMenuIndex] = React.useState(null);
  const itemProps = {
    onClick: () => setMenuIndex(null),
  };

  const [loginModalState, setLoginModalState] = useState(false);

  const createHandleLeaveMenu = (index) => (getIsOnButton) => {
    setTimeout(() => {
      const isOnButton = getIsOnButton();
      if (!isOnButton) {
        setMenuIndex((latestIndex) => {
          if (index === latestIndex) {
            return null;
          }
          return latestIndex;
        });
      }
    }, 200);
  };

  const layoutDirection = useSelector((state) => state.rtl.layoutDirection);

  const toggleLayoutDirection = () => {
    const newDirection = layoutDirection === "ltr" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", newDirection); // Update HTML dir attribute
    dispatch(toggleRTL(newDirection)); // Dispatch action with new direction
  };

  const theme = useTheme();
  const categories = useSelector((state) => state.homepage).categories;
  return (
    <Grid container spacing={2} px={8} alignItems={"center"}>
      <Grid xs={7} md={9} display={"flex"}>
        <Grid
          container
          spacing={4}
          maxWidth={"100%"}
          width={"100%"}
          alignItems={"center"}
        >
          <Grid xs={3} display="flex" alignItems="center">
            <Grid xs={3} display="flex" alignItems="center">
              <Link href="/home" underline="none" color="inherit">
                <Image
                  src={logoSrc}
                  alt="logo"
                  height={50}
                  width={0}
                  style={{ width: "100%" }}
                  loading="lazy"
                />
              </Link>
            </Grid>
          </Grid>

          <Grid xs={9}>
            <Box display={"flex"} gap={8}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={1}
              >
                <LocationModal />
              </Box>
              <Box
                display={"flex"}
                gap={{ md: 2, lg: 4 }}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Link href="/home" underline="none" color="inherit">
                  <Typography fontSize={20} fontWeight={"bolder"}>
                    {t("home")}
                  </Typography>
                </Link>

                <Dropdown>
                  <MenuButton
                    slotProps={{ root: { variant: "plain", color: "neutral" } }}
                    sx={{
                      bgcolor: "transparent",
                      border: "none",
                      "&:hover": {
                        bgcolor: "neutral.plainHoverBg",
                      },
                    }}
                  >
                    <Typography
                      fontSize={20}
                      fontWeight={"bolder"}
                      display={"flex"}
                      alignItems={"center"}
                      gap={1}
                    >
                      {t("menu")}
                      <ArrowDownSLineIcon color={theme.palette.primary[500]} />
                    </Typography>
                  </MenuButton>

                  <Menu
                    placement="bottom-end"
                    invertedColors
                    aria-labelledby="apps-menu-demo"
                    sx={{
                      "--List-padding": "0.5rem",
                      "--ListItemDecorator-size": "3rem",
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 190px)",
                      gap: 1,
                    }}
                  >
                    <Link href="/categories" underline="none" color="inherit">
                      <MenuItem sx={{ borderRadius: "md" }}>
                        {t("see-all")}
                        <ArrowRightLine color={theme.palette.primary[500]} />
                      </MenuItem>
                    </Link>

                    {categories.map((category) => (
                      <Grid xs={4} key={category.slug}>
                        <Link href={"/categories/" + category.slug}>
                          <MenuItem sx={{ borderRadius: "md" }} {...itemProps}>
                            {category.name}
                          </MenuItem>
                        </Link>
                      </Grid>
                    ))}
                  </Menu>
                </Dropdown>

                <Link href="/products" underline="none" color="inherit">
                  <Typography fontSize={20} fontWeight={"bolder"}>
                    {t("products")}
                  </Typography>
                </Link>
                <Link href="/offers" underline="none" color="inherit">
                  <Typography fontSize={20} fontWeight={"bolder"}>
                    {t("offers")}
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={5} md={3}>
        <Box
          display={"flex"}
          gap={2}
          alignItems={"center"}
          justifyContent={"end"}
        >
          <Box display={"inline-flex"} alignItems={"center"} gap={2}>
            <SearchModal displayStyle={"icon"} />

            <IconButton onClick={toggleLayoutDirection} color="inherit" sx={{}}>
              {layoutDirection == "rtl" ? (
                <TextDirectionRIcon
                  color={theme.palette.mode == "dark" ? "white" : "black"}
                  size={"20px"}
                />
              ) : (
                <TextDirectionLIcon
                  color={theme.palette.mode == "dark" ? "white" : "black"}
                  size={"20px"}
                />
              )}
            </IconButton>

            <Badge
              component={Link}
              href={"/user/cart"}
              badgeContent={cartStoreData.data.length}
            >
              <ShoppingBag3LineIcon
                size={"20px"}
                color={theme.palette.text.primary}
              />
            </Badge>

            <DarkModeToggle />

            <Dropdown>
              <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: "plain", color: "neutral" } }}
              >
                <RiGlobalLine size={"20px"} />
              </MenuButton>
              <Menu>
                {Object.keys(languages).map((language) => {
                  return (
                    <MenuItem
                      key={language}
                      onClick={async () => {
                        await i18n.changeLanguage(language);
                        dispatch(setLanguage(language));
                        document.documentElement.setAttribute(
                          "dir",
                          i18n.dir()
                        );
                        dispatch(toggleRTL(i18n.dir()));
                      }}
                    >
                      {languages[language]}
                    </MenuItem>
                  );
                })}
              </Menu>
            </Dropdown>
          </Box>

          <Box display={"flex"} alignItems={"center"} gap={2}>
            {!authStoreData.isLogged ? (
              <>
                <LoginModal
                  loginModalState={loginModalState}
                  onClose={() => {
                    setLoginModalState(false);
                  }}
                />
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
                  onClick={() => {
                    setLoginModalState(true);
                  }}
                >
                  {t("login")}
                </Button>
              </>
            ) : (
              <Dropdown>
                <MenuButton
                  variant="plain"
                  sx={{
                    display: "flex",
                    maxWidth: "100%",
                    width: "80%",
                    alignItems: "center",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  endDecorator={
                    <Box width={"30px"} mt={"5px"}>
                      <ArrowDownSLineIcon
                        size={"28px"}
                        color={theme.palette.primary[500]}
                      />
                    </Box>
                  }
                >
                  <Box
                    width={"100%"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    title={authStoreData.userData.username}
                  >
                    <Avatar
                      alt={authStoreData.userData.username}
                      size="sm"
                      src={authStoreData.userData.image}
                    />

                    <Typography
                      noWrap
                      textOverflow={"ellipsis"}
                      fontSize={"md"}
                      fontWeight={"md"}
                    >
                      {" "}
                      {authStoreData.userData.username}{" "}
                    </Typography>
                  </Box>
                </MenuButton>
                <Menu>
                  <MenuItem
                    component={Link}
                    href="/user/profile"
                    sx={{
                      "&:hover .MuiTypography-root": {
                        color:
                          theme.palette.Thememode === "light"
                            ? theme.palette.text.menuText
                            : theme.palette.text.secondary,
                      },
                    }}
                  >
                    <Typography
                      fontSize={"sm"}
                      fontWeight={"md"}
                      startDecorator={<RiUser3Line size={theme.fontSize.lg} />}
                    >
                      {t("my-profile")}
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    href="/user/my-orders"
                    sx={{
                      "&:hover .MuiTypography-root": {
                        color:
                          theme.palette.Thememode === "light"
                            ? theme.palette.text.menuText
                            : theme.palette.text.secondary,
                      },
                    }}
                  >
                    <Typography
                      fontSize={"sm"}
                      fontWeight={"md"}
                      startDecorator={
                        <RiFilePaper2Line size={theme.fontSize.lg} />
                      }
                    >
                      {t("my-orders")}
                    </Typography>
                  </MenuItem>

                  <MenuItem
                    component={Link}
                    href={"/user/favourites"}
                    sx={{
                      "&:hover .MuiTypography-root": {
                        color:
                          theme.palette.Thememode === "light"
                            ? theme.palette.text.menuText
                            : theme.palette.text.secondary,
                      },
                    }}
                  >
                    <Typography
                      fontSize={"sm"}
                      fontWeight={"md"}
                      startDecorator={<RiHeartLine size={theme.fontSize.lg} />}
                    >
                      {t("favourites")}
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    href="/user/address"
                    sx={{
                      "&:hover .MuiTypography-root": {
                        color:
                          theme.palette.Thememode === "light"
                            ? theme.palette.text.menuText
                            : theme.palette.text.secondary,
                      },
                    }}
                  >
                    <Typography
                      fontSize={"sm"}
                      fontWeight={"md"}
                      startDecorator={
                        <RiMapPin2Line size={theme.fontSize.lg} />
                      }
                    >
                      {t("address")}
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&:hover .MuiTypography-root": {
                        color: theme.palette.danger[500],
                      },
                    }}
                  >
                    <Typography
                      fontSize={"sm"}
                      fontWeight={"md"}
                      startDecorator={
                        <RiShutDownLine size={theme.fontSize.lg} />
                      }
                      onClick={() => {
                        logout();
                      }}
                    >
                      {t("logout")}
                    </Typography>
                  </MenuItem>
                </Menu>
              </Dropdown>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Header;
