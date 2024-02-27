"use client";
import React from 'react'
import {
    Sheet,
    Container,
    Grid,
    Box,
    Text,
    Badge,
    Avatar,
    Button,
    Divider,
    Typography,
    Link,
    Stack,
    ListItem,
    List
} from '@mui/joy';
import { Img } from '@/component/Img';
import FacebookCircleLineIcon from 'remixicon-react/FacebookCircleLineIcon';
import InstagramFillIcon from 'remixicon-react/InstagramFillIcon';
import TwitterLineIcon from 'remixicon-react/TwitterLineIcon';
import YoutubeLineIcon from 'remixicon-react/YoutubeLineIcon';

import { useTheme } from '@mui/joy/styles';
const index = () => {
    const theme = useTheme();
    return (
        <Grid mt={8} container px={8} bgcolor={theme.palette.background.footer}>
            <Grid xs={12} sx={{ height: "100%", padding: 2, color: "white", width: "100%" }}>
                <Box sx={{ marginTop: 8, textAlign: { xs: "center", md: "left" } }}>
                    <Grid container spacing={4} width={"100%"} color={"white"} >
                        <Grid xs={12} md={6}>
                            <Box display={"flex"} alignItems={"flex-start"} flexDirection={"column"}>
                                <Box display={"flex"} alignItems={"center"}>
                                    <Img src="/images/erestro-light.svg" alt="" />
                                    <Img src="/images/erestro-light-text.svg" alt="" />
                                </Box>
                                <Box mt={2}>
                                    <Typography level="title-sm" textColor={"white"}>
                                        Savor the artistry where every dish is a culinary masterpiece
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid xs={12} md={6} color={"white"} spacing={12} gap={12}>
                            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "center", md: "baseline" } }} gap={{ xs: 2, md: 12 }}>
                                {/* 1 */}
                                <Box >
                                    <Typography
                                        id="decorated-list-demo"
                                        level="body-lg"
                                        fontWeight={"bolder"}
                                        mb={1}
                                        textColor={"white"}
                                    >
                                        Useful Links
                                    </Typography>
                                    <List aria-labelledby="decorated-list-demo"  >
                                        <ListItem sx={{ paddingLeft: { xs: 1, md: 0 } }}>
                                            <Typography textColor={"white"}>
                                                About us
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{ paddingLeft: { xs: 1, md: 0 } }}>
                                            <Typography textColor={"white"}>
                                                Events
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{ paddingLeft: { xs: 1, md: 0 } }}>
                                            <Typography textColor={"white"}>
                                                Blogs
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{ paddingLeft: { xs: 1, md: 0 } }}>
                                            <Typography textColor={"white"}>
                                                FAQ
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </Box>

                                {/* 2 */}
                                <Box mx={{ xs: 0, md: 8 }}>
                                    <Typography
                                        id="decorated-list-demo"
                                        level="body-lg"
                                        fontWeight={"bolder"}
                                        mb={1}
                                        textColor={"white"}
                                    >
                                        Main Menu
                                    </Typography>
                                    <List aria-labelledby="decorated-list-demo">
                                        <ListItem sx={{ paddingLeft: { xs: 1, md: 0 } }}>
                                            <Typography textColor={"white"}>
                                                Home
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{ paddingLeft: { xs: 1, md: 0 } }}>
                                            <Typography textColor={"white"}>
                                                Office
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{ paddingLeft: { xs: 1, md: 0 } }}>
                                            <Typography textColor={"white"}>
                                                Menus
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{ paddingLeft: { xs: 1, md: 0 } }}>
                                            <Typography textColor={"white"}>
                                                Reservation
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </Box>

                                {/* 3 */}
                                <Box>
                                    <Typography
                                        id="decorated-list-demo"
                                        level="body-lg"
                                        fontWeight={"bolder"}
                                        mb={1}
                                        textColor={"white"}
                                    >
                                        Contact Us
                                    </Typography>
                                    <List aria-labelledby="decorated-list-demo" sx={{ textAlign: "center" }}>
                                        <ListItem sx={{ paddingLeft: { xs: 1, md: 0 } }}>
                                            <Typography textColor={"white"}>
                                                example@mail.com
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{ paddingLeft: { xs: 1, md: 0 } }}>
                                            <Typography textColor={"white"}>
                                                +91 123 456 7890
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{ paddingLeft: { xs: 1, md: 0 } }}>
                                            <Typography textColor={"white"}>
                                                Social Media
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </Box>

                            </Box>
                        </Grid>
                    </Grid>


                    <Grid container spacing={4} width={"100%"} color={"white"} >
                        <Grid xs={12} md={5}>
                            <Box display={"flex"} gap={2} alignItems={"center"} >
                                <Box sx={{ border: "1px solid", p: 1, borderRadius: "100%" }} display={"flex"} alignItems={"center"}>
                                    <FacebookCircleLineIcon />
                                </Box>
                                <Box sx={{ border: "1px solid", p: 1, borderRadius: "100%" }} display={"flex"} alignItems={"center"}>
                                    <InstagramFillIcon />
                                </Box>
                                <Box sx={{ border: "1px solid", p: 1, borderRadius: "100%" }} display={"flex"} alignItems={"center"}>
                                    <TwitterLineIcon />
                                </Box>
                                <Box sx={{ border: "1px solid", p: 1, borderRadius: "100%" }} display={"flex"} alignItems={"center"}>
                                    <YoutubeLineIcon />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid xs={12} md={7}>
                            <Typography textColor={"#ffff"}>
                                Copyright &#169; 2023 Infinitie Technologies | All rights reserved
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}

export default index