"use client";
import React, { useState } from "react";
import {
  Box,
  Avatar,
  useTheme,
  Drawer,
  IconButton,
  DialogContent,
  Stack,
  Typography,
  Button,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  Select,
  Option,
  Badge,
} from "@mui/joy";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

// icons
import MenuFillIcon from "remixicon-react/MenuFillIcon";
import CloseCircleLineIcon from "remixicon-react/CloseCircleLineIcon";
import {
  RiArrowRightLine,
  RiArrowLeftLine,
  RiNotificationLine,
  RiShoppingBag4Line,
  RiDiscountPercentLine,
  RiLayoutGrid2Fill,
  RiStackLine,
  RiGlobalLine,
  RiTranslate,
} from "@remixicon/react";
import Image from "next/image";
import LoginModal from "@/component/Modals/LoginModal";
import { setLanguage } from "@/store/reducers/languageSlice";
import { useTranslation } from "react-i18next";
import { languages } from "@/i18n";
import DarkModeToggle from "@/component/DarkModeToggleMobile";
import RTLModeToggle from "../RTLToggleMobile";
import { toggleRTL } from "@/store/reducers/rtlSlice";

const MobileNavigation = () => {
  const { t, i18n } = useTranslation();
  const authStoreData = useSelector((state) => state.authentication);

  const [loginModalState, setLoginModalState] = useState(false);

  const theme = useTheme();
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const cartStoreData = useSelector((state) => state.cart);
  const mode = useSelector((state) => state.darkMode.value);

  const logoSrc =
    mode === "dark"
      ? settings?.value?.web_settings[0]?.light_logo
      : settings?.value?.web_settings[0]?.logo;




  const [open, setOpen] = React.useState(false);
  // const [openSettings, setOpenSettings] = React.useState(false);

  const toggleDrawer = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(inOpen);
  };
  const toggleSettingsDrawer = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenSettings(inOpen);
  };

  return (
    <Box sx={{ marginBottom: { xs: "15px", sm: "10px" } }}>
      <Box
        display={"flex"}
        px={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box component={Link} href={"/"} display={"flex"} alignItems={"center"}>
          <Box sx={{ width: "150px" }}>
            <Image
              src={
                logoSrc
              }
              alt="logo"
              height={50}
              width={0}
              style={{ width: "100%" }}
              loading="lazy"
            />
          </Box>
        </Box>

        <Box
          display={"flex"}
          gap={1}
          ps={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
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
                size="sm"
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
            <>
              <Box
                component={Link}
                href={"/user/profile"}
                display={"flex"}
                alignItems={"center"}
                gap={2}
              >
                <Avatar
                  alt={authStoreData.userData.username}
                  src={authStoreData.userData.image}
                  size="sm"
                  title="profile"
                />
              </Box>
            </>
          )}

          <IconButton>
            {open ? (
              <CloseCircleLineIcon
                size={"28px"}
                color={theme.palette.primary[500]}
                fontWeight={"bolder"}
                onClick={toggleDrawer(false)}
              />
            ) : (
              <MenuFillIcon
                size={"28px"}
                color={theme.palette.primary[500]}
                fontWeight={"bolder"}
                onClick={toggleDrawer(true)}
              />
            )}
          </IconButton>
        </Box>
      </Box>

      <Drawer open={open} onClose={toggleDrawer(false)} size="lg">
        <DialogContent>
          <Box role="presentation" width={"100%"}>
            <Box
              width={"100%"}
              justifyContent={"end"}
              display={"flex"}
              alignItems={"center"}
              mt={1}
              mr={2}
              p={1}
            >
              <RiArrowRightLine
                size={theme.fontSize.xl4}
                fontWeight={"bolder"}
                onClick={toggleDrawer(false)}
              />
            </Box>

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
                {/* {['categories', 'offers', 'notifications']} */}
                <Typography
                  fontSize={"md"}
                  fontWeight={"lg"}
                  component={Link}
                  href={`/categories`}
                  startDecorator={<RiLayoutGrid2Fill />}
                  onClick={toggleDrawer(false)}
                >
                  {t("categories")}
                </Typography>
                <Typography
                  fontSize={"md"}
                  fontWeight={"lg"}
                  component={Link}
                  href={`/offers`}
                  startDecorator={<RiDiscountPercentLine />}
                  onClick={toggleDrawer(false)}
                >
                  {t("offers")}
                </Typography>
                <Typography
                  fontSize={"md"}
                  fontWeight={"lg"}
                  component={Link}
                  href={`/products`}
                  startDecorator={<RiStackLine />}
                  onClick={toggleDrawer(false)}
                >
                  {t("products")}
                </Typography>
                {/* <Typography
                  fontSize={"md"}
                  fontWeight={"lg"}
                  component={Link}
                  href={`/user/notifications`}
                  startDecorator={<RiNotificationLine />}
                  onClick={toggleDrawer(false)}
                >
                  {t('notifications')}
                </Typography> */}
                <Typography
                  fontSize={"md"}
                  fontWeight={"lg"}
                  component={Link}
                  href={`/user/cart`}
                  startDecorator={
                    <Badge
                      component={Link}
                      href={"/user/cart"}
                      badgeContent={cartStoreData.data.length}
                    >
                      <RiShoppingBag4Line                 color={theme.palette.text.primary}
 />{" "}
                    </Badge>
                  }
                  onClick={toggleDrawer(false)}
                >
                  {t("cart")}
                </Typography>
                {/* <Button
                  variant="text"
                  onClick={toggleSettingsDrawer(true)}
                  sx={{ textAlign: "start", justifyContent: "start", p: 0 }}
                >
                  <Typography
                    fontSize={"md"}
                    fontWeight={"lg"}
                    startDecorator={<RiSettings5Line />}
                  >
                    {t('settings')}
                  </Typography>
                </Button> */}

                <DarkModeToggle />
                <RTLModeToggle/>

                <Box>
                  <Dropdown>
                    <MenuButton
                      slots={{ root: IconButton }}
                      slotProps={{
                        root: { variant: "plain", color: "neutral" },
                      }}
                    >
                      <Typography
                        fontSize={"md"}
                        fontWeight={"lg"}
                        startDecorator={<RiTranslate />}
                      >
                        {t("languages")}
                      </Typography>
                    </MenuButton>
                    <Menu sx={{ zIndex: 99999, width: "80%" }}>
                      {Object.keys(languages).map((language) => {
                        return (
                          <MenuItem
                            key={language}
                            onClick={async () => {
                              await i18n.changeLanguage(language);
                              dispatch(setLanguage(language));
                              document.documentElement.setAttribute("dir", i18n.dir()); 
                              dispatch(toggleRTL(i18n.dir()))
                            }}
                          >
                            {languages[language]}
                          </MenuItem>
                        );
                      })}
                    </Menu>
                  </Dropdown>
                </Box>
              </Stack>
            </Box>
          </Box>
        </DialogContent>
      </Drawer>
    </Box>
  );
};

export default MobileNavigation;
