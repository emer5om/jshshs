"use client"
import React from 'react'

import { Grid, Card, CardOverflow, AspectRatio, CardContent, Typography, Box, useTheme, Stack, List, ListItem, ListItemButton, ListItemDecorator, ListItemContent } from '@mui/joy'
import Link from 'next/link'

// icons
import ArrowRightSLineIcon from "remixicon-react/ArrowRightSLineIcon"
import Heart3LineIcon from "remixicon-react/Heart2LineIcon"
import WalletLineIcon from "remixicon-react/WalletLineIcon"
import ExchangeDollarLineIcon from "remixicon-react/FileListLineIcon"
import { RiP2pLine, RiDeleteBin5Line, RiShutDownLine, RiUserSettingsLine, RiShoppingBagLine, RiFilePaper2Line, RiMapPin2Line } from "@remixicon/react"

const UserLayout = ({ children }) => {
    const theme = useTheme()
    return (
        <Grid container spacing={{ xs: 0, md: 2 }} >
            <Grid xs={12} md={3}>
                <Card sx={{ border: "none", px: 0, width: "100%" }}>
                    <CardContent>
                        <Grid container spacing={{ md: 2, xs: 0 }} >
                            <Grid xs={12} >
                                <Box bgcolor={"primary.400"} height={"90px"} width={"100%"}
                                    sx={{ borderTopRightRadius: theme.radius.xl, borderTopLeftRadius: theme.radius.xl }}>
                                </Box>
                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{
                                    position: "relative",
                                    top: "-25%"
                                }}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            width: "70%",
                                            borderRadius: "xl",
                                            display: "flex",
                                            flexDirection: { xs: "column", md: "row" },
                                            alignItems: "center"
                                        }}
                                    >
                                        <Box
                                            component={"img"}
                                            src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                                            srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                                            loading="lazy"
                                            alt=""
                                            height={{ xs: "150px", md: "90px" }}
                                            width={"100%"}
                                            borderRadius={"50%"}
                                        >
                                        </Box>
                                        <Box
                                            display={"flex"} flexDirection={"column"} justifyContent={"center"} width={"100%"}>
                                            <Typography fontSize={"lg"} fontWeight={"lg"}>
                                                James Carter
                                            </Typography>
                                            <Typography fontSize={"sm"} fontWeight={"md"}>
                                                user@testmail.com
                                            </Typography>
                                        </Box>
                                    </Card>
                                </Box>
                            </Grid>
                            <Grid xs={12}>
                                <Card size='sm'>
                                    <Stack spacing={3} >
                                        <List sx={{ gap: 2 }}>
                                            <ListItem >
                                                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} pb={1} borderBottom={"0.5px gray dashed"}>
                                                    <Box display={"flex"} alignItems={"center"} gap={1}>
                                                        <ListItemDecorator>
                                                            <Box bgcolor={"primary.300"} borderRadius={"50%"} display={"flex"} p={0.5} alignItems={"center"} justifyContent={"center"}>
                                                                <RiUserSettingsLine color={theme.palette.text.menuText} />
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
                                            <ListItem >
                                                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} pb={1} borderBottom={"0.5px gray dashed"}>
                                                    <Box display={"flex"} alignItems={"center"} gap={1}>
                                                        <ListItemDecorator>
                                                            <Box bgcolor={"primary.300"} borderRadius={"50%"} display={"flex"} p={0.5} alignItems={"center"} justifyContent={"center"}>
                                                                <Heart3LineIcon color={theme.palette.text.menuText} />
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
                                            <ListItem>
                                                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} pb={1} borderBottom={"0.5px gray dashed"}>
                                                    <Box display={"flex"} alignItems={"center"} gap={1}>
                                                        <ListItemDecorator>
                                                            <Box bgcolor={"primary.300"} borderRadius={"50%"} display={"flex"} p={0.5} alignItems={"center"} justifyContent={"center"}>
                                                                <WalletLineIcon color={theme.palette.text.menuText} />
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
                                            <ListItem>
                                                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} pb={1} borderBottom={"0.5px gray dashed"}>
                                                    <Box display={"flex"} alignItems={"center"} gap={1}>
                                                        <ListItemDecorator>
                                                            <Box bgcolor={"primary.300"} borderRadius={"50%"} display={"flex"} p={0.5} alignItems={"center"} justifyContent={"center"}>
                                                                <ExchangeDollarLineIcon color={theme.palette.text.menuText} />
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
                                            {/*  */}
                                            <ListItem>
                                                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} pb={1} borderBottom={"0.5px gray dashed"}>
                                                    <Box display={"flex"} alignItems={"center"} gap={1}>
                                                        <ListItemDecorator>
                                                            <Box bgcolor={"primary.300"} borderRadius={"50%"} display={"flex"} p={0.5} alignItems={"center"} justifyContent={"center"}>

                                                                <RiP2pLine color={theme.palette.text.menuText} />
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

                                            {/*  */}
                                            <ListItem>
                                                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"} pb={1} borderBottom={"0.5px gray dashed"}>
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