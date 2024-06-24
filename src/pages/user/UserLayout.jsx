"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useParams } from "next/navigation";

import {
  Grid,
  Card,
  CardOverflow,
  AspectRatio,
  CardContent,
  Typography,
  Box,
  useTheme,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  ListItemContent,
  Avatar,
  ListDivider,
  Modal,
  ModalDialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Button,
  Drawer,
  Badge,
} from "@mui/joy";
import Link from "next/link";

// icons
import ArrowRightSLineIcon from "remixicon-react/ArrowRightSLineIcon";
import Heart3LineIcon from "remixicon-react/Heart2LineIcon";
import WalletLineIcon from "remixicon-react/WalletLineIcon";
import ExchangeDollarLineIcon from "remixicon-react/FileListLineIcon";

import {
  RiP2pLine,
  RiDeleteBin5Line,
  RiShutDownLine,
  RiUserSettingsLine,
  RiShoppingBagLine,
  RiFilePaper2Line,
  RiMapPin2Line,
  RiMenuLine,
  RiAlertFill,
  RiCustomerService2Line,
  RiArrowRightLine,
  RiLayoutGrid2Fill,
  RiDiscountPercentLine,
  RiStackLine,
  RiShoppingBag4Line,
} from "@remixicon/react";
import { logout } from "@/events/actions";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { isLogged } from "@/events/getters";
import { useTranslation } from "react-i18next";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

const UserLayout = ({ children }) => {
  const theme = useTheme();
  const cartStoreData = useSelector((state) => state.cart);

  const path = usePathname();
  const router = useRouter();

  const userData = useSelector((state) => state.authentication).userData;

  const [open, setOpen] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
  const { t } = useTranslation();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(inOpen);
  };

  useEffect(() => {
    if (!isLogged()) {
      router.replace("/");
    }
  }, []);

  return (
    <Grid container spacing={{ xs: 0, md: 1 }}>
      <Grid xs={12} md={3}>
        <Card sx={{ border: "none", width: "100%" }}>
          <CardContent>
            <Grid container>
              <Grid xs={12}>
                <Box
                  bgcolor={"primary.400"}
                  height={"55px"}
                  width={"100%"}
                  sx={{
                    borderTopRightRadius: theme.radius.xl,
                    borderTopLeftRadius: theme.radius.xl,
                  }}
                ></Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    position: "relative",
                    top: { xs: "-20%", md: "-25%" },
                  }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      width: "90%",
                      borderRadius: "xl",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      component={Link}
                      href={"/user/profile"}
                    >
                      <Box
                        component={Avatar}
                        size={"lg"}
                        src={userData.image}
                        srcSet={userData.image}
                        loading="lazy"
                        alt=""
                      ></Box>
                    </Box>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      width={"100%"}
                    >
                      <Typography
                        fontSize={"lg"}
                        fontWeight={"lg"}
                        textOverflow={"ellipsis"}
                        overflow={"hidden"}
                        sx={{ textWrap: "nowrap", maxWidth: "80%" }}
                      >
                        {userData.username}
                      </Typography>
                      <Typography
                        fontSize={"sm"}
                        fontWeight={"md"}
                        textOverflow={"ellipsis"}
                        overflow={"hidden"}
                        sx={{ textWrap: "nowrap", maxWidth: "80%" }}
                      >
                        {userData.mobile}
                      </Typography>
                    </Box>

                    <Box>
                      <RiMenuLine onClick={toggleDrawer(true)} />
                    </Box>

                    <Drawer
                      open={openDrawer}
                      onClose={toggleDrawer(false)}
                      size="lg"
                    >
                      <DialogContent>
                        <Box role="presentation" width={"100%"}>
                          <Box
                            width={"100%"}
                            justifyContent={"end"}
                            display={"flex"}
                            alignItems={"center"}
                            mt={1}
                            p={1}
                          >
                            <RiArrowRightLine
                              className="remixicon"
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
                                href={`/user/favourites`}
                                startDecorator={
                                  <FavoriteBorder
                                    color={
                                      path === "/user/favourites"
                                        ? "white"
                                        : theme.palette.text.menuText
                                    }
                                  />
                                }
                                onClick={toggleDrawer(false)}
                              >
                                {t("favourites")}
                              </Typography>
                              <Typography
                                fontSize={"md"}
                                fontWeight={"lg"}
                                component={Link}
                                href={"/user/transactions"}
                                startDecorator={<ExchangeDollarLineIcon />}
                                onClick={toggleDrawer(false)}
                              >
                                {t("transactions")}
                              </Typography>
                              <Typography
                                fontSize={"md"}
                                fontWeight={"lg"}
                                component={Link}
                                href={"/user/address"}
                                startDecorator={
                                  <RiMapPin2Line
                                    color={theme.palette.text.primary}
                                  />
                                }
                                onClick={toggleDrawer(false)}
                              >
                                {t("addresses")}
                              </Typography>
                              <Typography
                                fontSize={"md"}
                                fontWeight={"lg"}
                                component={Link}
                                href={"/user/my-orders"}
                                startDecorator={<RiFilePaper2Line />}
                                onClick={toggleDrawer(false)}
                              >
                                {t("my-orders")}
                              </Typography>

                              <Typography
                                fontSize={"md"}
                                fontWeight={"lg"}
                                startDecorator={<RiDeleteBin5Line />}
                                onClick={() => {
                                  toggleDrawer(false);
                                  setOpenDeleteAccount(true);
                                }}
                              >
                                {t("Delete-Your-Account")}
                              </Typography>
                            </Stack>
                          </Box>
                        </Box>
                      </DialogContent>
                    </Drawer>
                  </Card>
                </Box>
              </Grid>

              <Grid className={"grid-container-custom"} xs={12}>
                <Card size="sm">
                  <Stack>
                    <List sx={{ gap: 1 }}>
                      <ListItem component={Link} href={"/user/favourites"}>
                        <Box
                          width={"100%"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Box display={"flex"} alignItems={"center"} gap={1}>
                            <ListItemDecorator>
                              <Box
                                bgcolor={
                                  path === "/user/favourites"
                                    ? "text.currency"
                                    : "primary.300"
                                }
                                borderRadius={"50%"}
                                display={"flex"}
                                p={0.5}
                                alignItems={"center"}
                                justifyContent={"center"}
                              >
                                <Heart3LineIcon
                                  color={
                                    path === "/user/favourites"
                                      ? "white"
                                      : theme.palette.text.menuText
                                  }
                                />
                              </Box>
                            </ListItemDecorator>
                            <ListItemContent>
                              <Typography
                                textColor={
                                  theme.palette.mode === "light"
                                    ? theme.palette.text.menuText
                                    : theme.palette.text.secondary
                                }
                                fontWeight={"md"}
                              >
                                {t("favourites")}
                              </Typography>
                            </ListItemContent>
                          </Box>
                          <ArrowRightSLineIcon
                            color={
                              theme.palette.mode === "light"
                                ? theme.palette.text.menuText
                                : theme.palette.text.currency
                            }
                          />
                        </Box>
                      </ListItem>

                      <ListDivider
                        inset={"gutter"}
                        sx={{ backgroundColor: "Background.level3" }}
                      />

                      <ListItem component={Link} href={"/user/transactions"}>
                        <Box
                          width={"100%"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Box display={"flex"} alignItems={"center"} gap={1}>
                            <ListItemDecorator>
                              <Box
                                bgcolor={
                                  path === "/user/transactions"
                                    ? "text.currency"
                                    : "primary.300"
                                }
                                borderRadius={"50%"}
                                display={"flex"}
                                p={0.5}
                                alignItems={"center"}
                                justifyContent={"center"}
                              >
                                <ExchangeDollarLineIcon
                                  color={
                                    path === "/user/transactions"
                                      ? "white"
                                      : theme.palette.text.menuText
                                  }
                                />
                              </Box>
                            </ListItemDecorator>
                            <ListItemContent>
                              <Typography
                                textColor={
                                  theme.palette.mode === "light"
                                    ? theme.palette.text.menuText
                                    : theme.palette.text.secondary
                                }
                                fontWeight={"md"}
                              >
                                {t("transactions")}
                              </Typography>
                            </ListItemContent>
                          </Box>
                          <ArrowRightSLineIcon
                            color={
                              theme.palette.mode === "light"
                                ? theme.palette.text.menuText
                                : theme.palette.text.currency
                            }
                          />
                        </Box>
                      </ListItem>

                      <ListDivider
                        inset={"gutter"}
                        sx={{ backgroundColor: "Background.level3" }}
                      />

                      {/*  */}
                      <ListItem component={Link} href={"/user/refer"}>
                        <Box
                          width={"100%"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Box display={"flex"} alignItems={"center"} gap={1}>
                            <ListItemDecorator>
                              <Box
                                bgcolor={
                                  path === "/user/refer"
                                    ? "text.currency"
                                    : "primary.300"
                                }
                                borderRadius={"50%"}
                                display={"flex"}
                                p={0.5}
                                alignItems={"center"}
                                justifyContent={"center"}
                              >
                                <RiP2pLine
                                  color={
                                    path === "/user/refer"
                                      ? "white"
                                      : theme.palette.text.menuText
                                  }
                                />
                              </Box>
                            </ListItemDecorator>

                            <ListItemContent>
                              <Typography
                                textColor={
                                  theme.palette.mode === "light"
                                    ? theme.palette.text.menuText
                                    : theme.palette.text.secondary
                                }
                                fontWeight={"md"}
                              >
                                {t("refer")}
                              </Typography>
                            </ListItemContent>
                          </Box>
                          <ArrowRightSLineIcon
                            color={
                              theme.palette.mode === "light"
                                ? theme.palette.text.menuText
                                : theme.palette.text.currency
                            }
                          />
                        </Box>
                      </ListItem>

                      <ListDivider
                        inset={"gutter"}
                        sx={{ backgroundColor: "Background.level3" }}
                      />

                      <ListItem
                        onClick={() => setOpenDeleteAccount(true)}
                        sx={{
                          "&:hover": { cursor: "pointer" },
                        }}
                      >
                        <Box
                          width={"100%"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Box display={"flex"} alignItems={"center"} gap={1}>
                            <ListItemDecorator>
                              <Box
                                bgcolor={"primary.300"}
                                borderRadius={"50%"}
                                display={"flex"}
                                p={0.5}
                                alignItems={"center"}
                                justifyContent={"center"}
                              >
                                <RiDeleteBin5Line
                                  color={theme.palette.text.menuText}
                                />
                              </Box>
                            </ListItemDecorator>
                            <ListItemContent>
                              <Typography
                                textColor={
                                  theme.palette.mode === "light"
                                    ? theme.palette.text.menuText
                                    : theme.palette.text.secondary
                                }
                                fontWeight={"md"}
                              >
                                {t("Delete-Your-Account")}
                              </Typography>
                            </ListItemContent>
                          </Box>
                          <ArrowRightSLineIcon
                            color={
                              theme.palette.mode === "light"
                                ? theme.palette.text.menuText
                                : theme.palette.text.currency
                            }
                          />
                        </Box>
                      </ListItem>

                      <ListDivider
                        inset={"gutter"}
                        sx={{ backgroundColor: "Background.level3" }}
                      />

                      <ListItem
                        onClick={() => setOpen(true)}
                        sx={{
                          "&:hover": { cursor: "pointer" },
                        }}
                      >
                        <Box
                          width={"100%"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Box display={"flex"} alignItems={"center"} gap={1}>
                            <ListItemDecorator>
                              <Box
                                bgcolor={"primary.300"}
                                borderRadius={"50%"}
                                display={"flex"}
                                p={0.5}
                                alignItems={"center"}
                                justifyContent={"center"}
                              >
                                <RiShutDownLine
                                  color={theme.palette.text.menuText}
                                />
                              </Box>
                            </ListItemDecorator>
                            <ListItemContent>
                              <Typography
                                textColor={
                                  theme.palette.mode === "light"
                                    ? theme.palette.text.menuText
                                    : theme.palette.text.secondary
                                }
                                fontWeight={"md"}
                              >
                                {t("logout")}
                              </Typography>
                            </ListItemContent>
                          </Box>
                          <ArrowRightSLineIcon
                            color={
                              theme.palette.mode === "light"
                                ? theme.palette.text.menuText
                                : theme.palette.text.currency
                            }
                          />
                        </Box>
                      </ListItem>
                    </List>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid sx={{ marginTop: { xs: 2, sm: 2, md: 0 } }} xs={12} md={9}>
        <Grid container>
          <Grid className={"grid-container-custom"} xs={12} width={"100%"}>
            <Card sx={{ border: "none", px: 0 }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 1,
                  marginLeft: 1,
                }}
              >
                <Box
                  component={Link}
                  href={"/user/cart"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  border={"1px #C7C2C2 solid"}
                  borderRadius={"md"}
                  px={3}
                  py={1}
                  boxShadow={"0px 4px 4px -2px #18274B14"}
                >
                  <Box
                    bgcolor={"primary.300"}
                    borderRadius={"50%"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    p={1}
                  >
                    <RiShoppingBagLine color={theme.palette.text.menuText} />
                  </Box>
                  <Typography
                    fontSize={"lg"}
                    fontWeight={"md"}
                    textColor={
                      theme.palette.mode === "light"
                        ? theme.palette.text.menuText
                        : theme.palette.text.secondary
                    }
                  >
                    {t("cart")}
                  </Typography>
                </Box>

                <Box
                  component={Link}
                  href={"/user/my-orders"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  border={"1px #C7C2C2 solid"}
                  borderRadius={"md"}
                  px={3}
                  py={1}
                  boxShadow={"0px 4px 4px -2px #18274B14"}
                >
                  <Box
                    bgcolor={
                      path === "/user/my-orders"
                        ? "text.currency"
                        : "primary.300"
                    }
                    borderRadius={"50%"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    p={1}
                  >
                    <RiFilePaper2Line
                      color={
                        path === "/user/my-orders"
                          ? "white"
                          : theme.palette.text.menuText
                      }
                    />
                  </Box>
                  <Typography
                    fontSize={"lg"}
                    fontWeight={"md"}
                    textColor={
                      theme.palette.mode === "light"
                        ? theme.palette.text.menuText
                        : theme.palette.text.secondary
                    }
                  >
                    {t("my-orders")}
                  </Typography>
                </Box>
                <Box
                  component={Link}
                  href={"/user/address"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  border={"1px #C7C2C2 solid"}
                  borderRadius={"md"}
                  px={3}
                  py={1}
                  boxShadow={"0px 4px 4px -2px #18274B14"}
                >
                  <Box
                    bgcolor={
                      path === "/user/address" ? "text.currency" : "primary.300"
                    }
                    borderRadius={"50%"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    p={1}
                  >
                    <RiMapPin2Line
                      color={
                        path === "/user/address"
                          ? "white"
                          : theme.palette.text.menuText
                      }
                    />
                  </Box>
                  <Typography
                    fontSize={"lg"}
                    fontWeight={"md"}
                    textColor={
                      theme.palette.mode === "light"
                        ? theme.palette.text.menuText
                        : theme.palette.text.secondary
                    }
                  >
                    {t("addresses")}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} maxWidth={"100%"} width={"100%"}>
            {children}
          </Grid>
        </Grid>
      </Grid>

      {/* Logout */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="soft" role="alertdialog" size="lg">
          <DialogTitle sx={{ alignItems: "center" }}>
            <RiAlertFill />
            {t("confirmation")}
          </DialogTitle>
          <Divider sx={{ alignSelf: "center", width: "100%" }} />
          <DialogContent>{t("are-you-sure-you-want-to-logout")}</DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => {
                setOpen(false);
                router.replace("/");
                logout();
              }}
            >
              {t("yes")}
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              {t("cancel")}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      {/* Delete */}
      <Modal
        open={openDeleteAccount}
        onClose={() => setOpenDeleteAccount(false)}
      >
        <ModalDialog variant="soft" role="alertdialog" size="lg">
          <DialogTitle sx={{ alignItems: "center" }}>
            <RiAlertFill />
            {t("confirmation")}
          </DialogTitle>
          <Divider sx={{ alignSelf: "center", width: "100%" }} />
          <DialogContent>
            {t("Are-you-sure-you-want-to-delete-your-Account")}
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpenDeleteAccount(false)}
            >
              {t("yes")}
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={() => setOpenDeleteAccount(false)}
            >
              {t("cancel")}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Grid>
  );
};

export default UserLayout;
