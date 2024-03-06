"use client"
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation';

import { Grid, Card, CardOverflow, AspectRatio, CardContent, Typography, Box, useTheme, Stack, List, ListItem, ListItemButton, ListItemDecorator, ListItemContent, Avatar, ListDivider } from '@mui/joy'
import Link from 'next/link'

// icons
import ArrowRightSLineIcon from "remixicon-react/ArrowRightSLineIcon"
import Heart3LineIcon from "remixicon-react/Heart2LineIcon"
import WalletLineIcon from "remixicon-react/WalletLineIcon"
import ExchangeDollarLineIcon from "remixicon-react/FileListLineIcon"
import { RiP2pLine, RiDeleteBin5Line, RiShutDownLine, RiUserSettingsLine, RiShoppingBagLine, RiFilePaper2Line, RiMapPin2Line } from "@remixicon/react"

const UserLayout = ({ children }) => {
    const theme = useTheme()

    const router = usePathname();
    return (
        <Grid container spacing={{ xs: 0, md: 2 }} >
            <Grid xs={12} md={3}>
                <Card sx={{ border: "none", px: 0, width: "100%" }}>
                    <CardContent>
                        <Grid container spacing={{ md: 2, xs: 0 }} >
                            <Grid xs={12} >
                                <Box bgcolor={"primary.400"} height={"55px"} width={"100%"}
                                    sx={{ borderTopRightRadius: theme.radius.xl, borderTopLeftRadius: theme.radius.xl }}>
                                </Box>
                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{
                                    position: "relative",
                                    top: { xs: "-20%", md: "-25%" }
                                }}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            width: "90%",
                                            borderRadius: "xl",
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Box
                                            display={"flex"} justifyContent={"center"} alignItems={"center"}
                                        >
                                            <Box
                                                component={Avatar}
                                                size={"lg"}
                                                src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                                                srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                                                loading="lazy"
                                                alt=""
                                            >
                                            </Box>
                                        </Box>
                                        <Box
                                            display={"flex"} flexDirection={"column"} justifyContent={"center"} width={"100%"}>
                                            <Typography fontSize={"lg"} fontWeight={"lg"}
                                                textOverflow={"ellipsis"} overflow={"hidden"}
                                                sx={{ textWrap: "nowrap", maxWidth: "80%" }}
                                            >
                                                James Carter
                                                James Carter
                                                James Carter
                                            </Typography>
                                            <Typography fontSize={"sm"} fontWeight={"md"}
                                                textOverflow={"ellipsis"} overflow={"hidden"}
                                                sx={{ textWrap: "nowrap", maxWidth: "80%" }}
                                            >
                                                user@testmail.com
                                            </Typography>
                                        </Box>
                                    </Card>
                                </Box>
                            </Grid>
                            <Grid xs={12}>
                                <Card size='sm'>
                                    <Stack >
                                        <List sx={{ gap: 1 }}>
                                            <ListItem component={Link} href={"/user/profile"}>
                                                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}  >
                                                    <Box display={"flex"} alignItems={"center"} gap={1}>
                                                        <ListItemDecorator>
                                                            <Box
                                                                bgcolor={router === "/user/profile" ?
                                                                    "text.currency" :
                                                                    "primary.300"}
                                                                borderRadius={"50%"} display={"flex"} p={0.5} alignItems={"center"} justifyContent={"center"}>
                                                                <RiUserSettingsLine color={
                                                                    router === "/user/profile" ?
                                                                        "white" :
                                                                        theme.palette.text.menuText} />
                                                            </Box>
                                                        </ListItemDecorator>
                                                        <ListItemContent>
                                                            <Typography textColor={"text.menuText"} fontWeight={"md"}>
                                                                Profile
                                                            </Typography>
                                                        </ListItemContent>
                                                    </Box>
                                                    <ArrowRightSLineIcon color={theme.palette.text.menuText} />
                                                </Box>
                                            </ListItem>

                                            <ListDivider inset={"gutter"} sx={{ backgroundColor: "text.menuText" }} />

                                            <ListItem component={Link} href={"/user/favourites"}>
                                                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}  >
                                                    <Box display={"flex"} alignItems={"center"} gap={1}>
                                                        <ListItemDecorator>
                                                            <Box
                                                                bgcolor={router === "/user/favourites" ?
                                                                    "text.currency" : "primary.300"}
                                                                borderRadius={"50%"} display={"flex"} p={0.5} alignItems={"center"} justifyContent={"center"}>
                                                                <Heart3LineIcon color={router === "/user/favourites" ?
                                                                    "white" : theme.palette.text.menuText} />
                                                            </Box>
                                                        </ListItemDecorator>
                                                        <ListItemContent>
                                                            <Typography textColor={"text.menuText"} fontWeight={"md"}>
                                                                Favorite
                                                            </Typography>
                                                        </ListItemContent>
                                                    </Box>
                                                    <ArrowRightSLineIcon color={theme.palette.text.menuText} />
                                                </Box>
                                            </ListItem>

                                            <ListDivider inset={"gutter"} sx={{ backgroundColor: "text.menuText" }} />

                                            <ListItem component={Link} href={"/user/wallet"}>
                                                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}  >
                                                    <Box display={"flex"} alignItems={"center"} gap={1}>
                                                        <ListItemDecorator>
                                                            <Box bgcolor={router === "/user/wallet" ?
                                                                "text.currency" : "primary.300"} borderRadius={"50%"} display={"flex"} p={0.5} alignItems={"center"} justifyContent={"center"}>
                                                                <WalletLineIcon color={router === "/user/wallet" ?
                                                                    "white" : theme.palette.text.menuText} />
                                                            </Box>
                                                        </ListItemDecorator>
                                                        <ListItemContent>
                                                            <Typography textColor={"text.menuText"} fontWeight={"md"}>
                                                                Wallet
                                                            </Typography>
                                                        </ListItemContent>
                                                    </Box>
                                                    <ArrowRightSLineIcon color={theme.palette.text.menuText} />
                                                </Box>
                                            </ListItem>

                                            <ListDivider inset={"gutter"} sx={{ backgroundColor: "text.menuText" }} />

                                            <ListItem>
                                                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}  >
                                                    <Box display={"flex"} alignItems={"center"} gap={1}>
                                                        <ListItemDecorator>
                                                            <Box bgcolor={router === "/user/transactions" ?
                                                                "text.currency" : "primary.300"} borderRadius={"50%"} display={"flex"} p={0.5} alignItems={"center"} justifyContent={"center"}>
                                                                <ExchangeDollarLineIcon color={router === "/user/transactions" ?
                                                                    "white" : theme.palette.text.menuText} />
                                                            </Box>
                                                        </ListItemDecorator>
                                                        <ListItemContent>
                                                            <Typography textColor={"text.menuText"} fontWeight={"md"}>
                                                                Transactions
                                                            </Typography>
                                                        </ListItemContent>
                                                    </Box>
                                                    <ArrowRightSLineIcon color={theme.palette.text.menuText} />
                                                </Box>
                                            </ListItem>

                                            <ListDivider inset={"gutter"} sx={{ backgroundColor: "text.menuText" }} />

                                            {/*  */}
                                            <ListItem>
                                                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}  >
                                                    <Box display={"flex"} alignItems={"center"} gap={1}>
                                                        <ListItemDecorator>
                                                            <Box bgcolor={router === "/user/refer" ?
                                                                "text.currency" : "primary.300"} borderRadius={"50%"} display={"flex"} p={0.5} alignItems={"center"} justifyContent={"center"}>

                                                                <RiP2pLine color={router === "/user/refer" ?
                                                                    "white" : theme.palette.text.menuText} />
                                                            </Box>
                                                        </ListItemDecorator>
                                                        <ListItemContent>
                                                            <Typography textColor={"text.menuText"} fontWeight={"md"}>
                                                                Refer and Earn
                                                            </Typography>
                                                        </ListItemContent>
                                                    </Box>
                                                    <ArrowRightSLineIcon color={theme.palette.text.menuText} />
                                                </Box>
                                            </ListItem>

                                            <ListDivider inset={"gutter"} sx={{ backgroundColor: "text.menuText" }} />


                                            {/*  */}
                                            <ListItem>
                                                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}  >
                                                    <Box display={"flex"} alignItems={"center"} gap={1}>
                                                        <ListItemDecorator>
                                                            <Box bgcolor={"primary.300"} borderRadius={"50%"} display={"flex"} p={0.5} alignItems={"center"} justifyContent={"center"}>

                                                                <RiDeleteBin5Line color={theme.palette.text.menuText} />
                                                            </Box>
                                                        </ListItemDecorator>
                                                        <ListItemContent>
                                                            <Typography textColor={"text.menuText"} fontWeight={"md"}>
                                                                Delete Your Account
                                                            </Typography>
                                                        </ListItemContent>
                                                    </Box>
                                                    <ArrowRightSLineIcon color={theme.palette.text.menuText} />
                                                </Box>
                                            </ListItem>

                                            <ListDivider inset={"gutter"} sx={{ backgroundColor: "text.menuText" }} />


                                            <ListItem>
                                                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                                    <Box display={"flex"} alignItems={"center"} gap={1}>
                                                        <ListItemDecorator>
                                                            <Box bgcolor={"primary.300"} borderRadius={"50%"} display={"flex"} p={0.5} alignItems={"center"} justifyContent={"center"}>

                                                                <RiShutDownLine color={theme.palette.text.menuText} />
                                                            </Box>
                                                        </ListItemDecorator>
                                                        <ListItemContent>
                                                            <Typography textColor={"text.menuText"} fontWeight={"md"}>
                                                                Log Out
                                                            </Typography>
                                                        </ListItemContent>
                                                    </Box>
                                                    <ArrowRightSLineIcon color={theme.palette.text.menuText} />
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
            <Grid xs={12} md={9}>
                <Grid container >
                    <Grid xs={12} width={"100%"}>
                        <Card sx={{ border: "none", px: 0 }}>
                            <CardContent sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 1 }} >
                                <Box component={Link} href={"#"} display={"flex"} alignItems={"center"} gap={1}
                                    border={"1px #C7C2C2 solid"} borderRadius={"md"} px={3} py={1}
                                    boxShadow={"0px 4px 4px -2px #18274B14"}
                                >
                                    <Box bgcolor={"primary.300"} borderRadius={"50%"} display={"flex"} alignItems={"center"} justifyContent={"center"} p={1} >
                                        <RiShoppingBagLine color={theme.palette.text.menuText} />
                                    </Box>
                                    <Typography fontSize={"lg"} fontWeight={"md"} textColor={"text.menuText"}>
                                        Cart
                                    </Typography>
                                </Box>
                                <Box component={Link} href={"#"} display={"flex"} alignItems={"center"} gap={1}
                                    border={"1px #C7C2C2 solid"} borderRadius={"md"} px={3} py={1}
                                    boxShadow={"0px 4px 4px -2px #18274B14"}
                                >
                                    <Box bgcolor={"primary.300"} borderRadius={"50%"} display={"flex"} alignItems={"center"} justifyContent={"center"} p={1} >
                                        <RiFilePaper2Line color={theme.palette.text.menuText} />
                                    </Box>
                                    <Typography fontSize={"lg"} fontWeight={"md"} textColor={"text.menuText"}>
                                        My Orders
                                    </Typography>
                                </Box>
                                <Box component={Link} href={"#"} display={"flex"} alignItems={"center"} gap={1}
                                    border={"1px #C7C2C2 solid"} borderRadius={"md"} px={3} py={1}
                                    boxShadow={"0px 4px 4px -2px #18274B14"}
                                >
                                    <Box bgcolor={"primary.300"} borderRadius={"50%"} display={"flex"} alignItems={"center"} justifyContent={"center"} p={1} >
                                        <RiMapPin2Line color={theme.palette.text.menuText} />
                                    </Box>
                                    <Typography fontSize={"lg"} fontWeight={"md"} textColor={"text.menuText"}>
                                        Address
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
        </Grid>
    )
}

export default UserLayout