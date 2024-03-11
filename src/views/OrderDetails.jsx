"use client"
import React from 'react'

import { Avatar, Box, Card, CardContent, Chip, Divider, Grid, Typography, useTheme } from '@mui/joy'


// Icon
import { RiEBike2Line } from "@remixicon/react"
import CustomButton from '@/component/Buttons/CustomButton'

const OrderDetails = () => {
    const theme = useTheme();
    return (
        <Grid container gap={{ xs: 0, md: 2 }} sx={{ flexGrow: 1, my: 4 , width: "100%"}}>
            <Grid xs={12} md={5.9}>
                <Box display={"flex"} flexDirection={"column"} gap={3}>
                    <Card sx={{ borderRadius: "lg" }}>
                        <CardContent
                            orientation="horizontal"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                p: 2,
                                border: `1px solid ${theme.palette.primary[300]}`,
                                borderRadius: "md",
                                backgroundColor: theme.palette.primary[100],
                            }}
                        >
                            <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.menuText"}>
                                Order OTP
                            </Typography>
                            <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.currency"}>
                                123456
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ borderRadius: "lg" }}>
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"flex-start"}
                            py={1}
                            sx={{ borderBottom: `1px dashed ${theme.palette.background.level3}` }}
                        >
                            <Box display={"flex"} flexDirection={"column"} gap={0.5} justifyContent={"space-between"} alignItems={"start"}>
                                <Typography>
                                    Order ID: #95
                                </Typography>
                                <Typography>
                                    04, August 2023 03:06 PM
                                </Typography>
                            </Box>
                            <Box>
                                <Chip color="success"
                                    variant="soft"
                                    size='lg'
                                    sx={{
                                        borderRadius: "md",
                                        borderColor: theme.palette.success[100]
                                    }}>
                                    Delivered
                                </Chip>
                            </Box>
                        </Box>
                        <Box display={"flex"} flexDirection={"column"} gap={1}>
                            <Box display={"flex"} flexDirection={{ md: "row", xs: "column" }} alignItems={{ xs: "start", md: "center" }} justifyContent={"space-between"} gap={1}>
                                <Box display={"flex"} alignItems={"center"} justifyContent={"start"} gap={1} maxWidth={{ xs: "100%", md: "85%" }}>
                                    <Box
                                        width={"20px"}
                                        component={"img"}
                                        src={"/images/icons/veg.png"}
                                        // src={item.type === "veg" ? "/images/icons/veg.png" : "/images/icons/non-veg.jpg"}
                                        alt='veg-non-veg.icon'
                                    >
                                    </Box>

                                    <Typography
                                        textColor={"text.menuText"}
                                        fontSize={"md"}
                                        fontWeight={"lg"}
                                        textOverflow={"ellipsis"}
                                        noWrap
                                        width={"100%"}
                                    >
                                        2 x Indian Punjabi Cuisine Thali ( 750 GM )
                                        2 x Indian Punjabi Cuisine Thali ( 750 GM )
                                        2 x Indian Punjabi Cuisine Thali ( 750 GM )
                                    </Typography>
                                </Box>

                                <Typography
                                    textColor={"text.currency"}
                                    fontSize={"md"}
                                    fontWeight={"lg"}
                                >
                                    $180.00
                                </Typography>
                            </Box>

                            <Box display={"flex"} flexDirection={{ md: "row", xs: "column" }} alignItems={{ xs: "start", md: "center" }} justifyContent={"space-between"} gap={1}>
                                <Box display={"flex"} alignItems={"center"} justifyContent={"start"} gap={1} maxWidth={{ xs: "100%", md: "85%" }}>
                                    <Box
                                        width={"20px"}
                                        component={"img"}
                                        src={"/images/icons/veg.png"}
                                        // src={item.type === "veg" ? "/images/icons/veg.png" : "/images/icons/non-veg.jpg"}
                                        alt='veg-non-veg.icon'
                                    >
                                    </Box>

                                    <Typography
                                        textColor={"text.menuText"}
                                        fontSize={"md"}
                                        fontWeight={"lg"}
                                        textOverflow={"ellipsis"}
                                        noWrap
                                        width={"100%"}
                                    >
                                        2 x Indian Punjabi Cuisine Thali ( 750 GM )
                                        2 x Indian Punjabi Cuisine Thali ( 750 GM )
                                        2 x Indian Punjabi Cuisine Thali ( 750 GM )
                                        2 x Indian Punjabi Cuisine Thali ( 750 GM )
                                    </Typography>
                                </Box>

                                <Typography
                                    textColor={"text.currency"}
                                    fontSize={"md"}
                                    fontWeight={"lg"}
                                >
                                    $180.00
                                </Typography>
                            </Box>

                            <Box display={"flex"} flexDirection={{ md: "row", xs: "column" }} alignItems={{ xs: "start", md: "center" }} justifyContent={"space-between"} gap={1}>
                                <Box display={"flex"} alignItems={"center"} justifyContent={"start"} gap={1} maxWidth={{ xs: "100%", md: "80%" }}>
                                    <Box
                                        width={"20px"}
                                        component={"img"}
                                        src={"/images/icons/veg.png"}
                                        // src={item.type === "veg" ? "/images/icons/veg.png" : "/images/icons/non-veg.jpg"}
                                        alt='veg-non-veg.icon'
                                    >
                                    </Box>

                                    <Typography
                                        textColor={"text.menuText"}
                                        fontSize={"md"}
                                        fontWeight={"lg"}
                                        textOverflow={"ellipsis"}
                                        noWrap
                                        width={"100%"}
                                    >
                                        2 x Indian Punjabi Cuisine Thali ( 750 GM )
                                        2 x Indian Punjabi Cuisine Thali ( 750 GM )
                                        2 x Indian Punjabi Cuisine Thali ( 750 GM )
                                    </Typography>
                                </Box>

                                <Typography
                                    textColor={"text.currency"}
                                    fontSize={"md"}
                                    fontWeight={"lg"}
                                >
                                    $180.00
                                </Typography>
                            </Box>
                        </Box>

                    </Card>

                    <Card>
                        <CardContent>
                            <Box display={"flex"} gap={1} alignItems={"center"}>
                                <RiEBike2Line />
                                <Typography fontSize={"lg"} fontWeight={"lg"} textColor={"text.menuText"}>
                                    Delivery Boy
                                </Typography>
                            </Box>
                            <Box sx={{
                                borderTop: `1px dashed ${theme.palette.background.level3}`,
                                borderBottom: `1px dashed ${theme.palette.background.level3}`,
                                my: 1,
                                py: 1
                            }}>
                                <Box display={"flex"} alignItems={"center"} gap={1}>
                                    <Avatar alt="Remy Sharp" src="https://xsgames.co/randomusers/avatar.php?g=pixel" size='lg' />
                                    <Box display={"flex"} flexDirection={"column"} gap={0}>
                                        <Typography fontSize={"md"} fontWeight={"md"} textColor={"text.menuText"}>
                                            Joe Mama
                                        </Typography>
                                        <Typography fontSize={"sm"} fontWeight={"md"} textColor={"text.menuText"}>
                                            Your Delivery Partner
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"flex-end"}>
                                <CustomButton text={"Rate"} variant="soft" customStyle={{ px: 2, py: 1 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>

            <Divider orientation="vertical"></Divider>

            <Grid xs={12} md={5.5}>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </Grid>
        </Grid >
    )
}

export default OrderDetails