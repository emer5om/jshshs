"use client"
import React from 'react'

import { Avatar, Box, Card, CardActions, CardContent, Chip, Divider, Grid, Stack, Typography, useTheme } from '@mui/joy'
import CustomButton from '@/component/Buttons/CustomButton'


// Icon
import { RiEBike2Line, RiArticleLine, RiDownloadLine, RiMapPinLine, RiHomeSmileLine, RiMoneyDollarCircleLine } from "@remixicon/react"
import { formatePrice } from '@/helpers/functonHelpers'

const OrderDetails = () => {
    const theme = useTheme();
    return (
        <Grid container gap={2} sx={{ flexGrow: 1, my: 4, width: "100%" }}>
            <Grid xs={12} md={5.9}>
                <Box display={"flex"} flexDirection={"column"} gap={2}>
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
                                <Typography textColor={"text.currency"} fontWeight={"lg"}>
                                    Order ID: #95
                                </Typography>
                                <Typography textColor={"text.menuText"} fontWeight={"md"}>
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
                                    {formatePrice(180.00)}
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
                                    {formatePrice(180.00)}
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
                                    {formatePrice(180.00)}
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
                <Box display={"flex"} flexDirection={"column"} gap={2}>
                    <Card orientation="horizontal">
                        <CardContent
                            orientation="horizontal"
                            sx={{ alignItems: "center", justifyContent: "space-between", }}
                        >
                            <Box display={"flex"} alignItems={"center"} gap={1}>
                                <RiArticleLine color={theme.palette.text.menuText} />
                                <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.menuText"}>Download Invoice</Typography>
                            </Box>
                            <Box bgcolor={"text.menuText"} display={"flex"} alignItems={"center"} justifyContent={"center"} p={1} borderRadius={"50%"}>
                                <RiDownloadLine color={theme.palette.background.level1} />
                            </Box>
                        </CardContent>
                    </Card>

                    <Card orientation="vertical" sx={{ px: 1 }}>
                        <CardActions orientation="horizontal"
                            sx={{
                                pt: 0,
                                pb: 1,
                                px: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"start"} gap={1}>
                                <RiMapPinLine color={theme.palette.text.menuText} />
                                <Typography
                                    textColor={"text.menuText"}
                                    fontSize={"md"}
                                    fontWeight={"lg"}
                                > Delivery Address </Typography>
                            </Box>
                            <Typography
                                textColor={"text.currency"}
                                fontSize={"sm"}
                                fontWeight={"md"}
                            > Change </Typography>
                        </CardActions>

                        <CardContent orientation="vertical" sx={{ px: 2 }}>
                            <Divider sx={{ my: 1, width: "100%" }} />
                            <Box>
                                <Box display={"flex"} flexDirection={"column"} gap={1}>
                                    <Box display={"flex"} alignItems={"center"} gap={1} color={"text.currency"}>
                                        <RiHomeSmileLine />
                                        <Typography textColor={"text.currency"} fontSize={"md"} fontWeight={"lg"}>
                                            Home
                                        </Typography>
                                    </Box>
                                    <Box fontWeight={"md"}>
                                        <Typography>
                                            123 Oak Street,
                                            Los Angeles, California,
                                            United States,
                                            Zip Code: 90001
                                        </Typography>
                                    </Box>

                                    <Box display={"flex"} alignItems={"center"} gap={1}>
                                        <Box display={"flex"} alignItems={"center"} gap={0.5}>
                                            <Avatar alt="Remy Sharp" src="https://xsgames.co/randomusers/avatar.php?g=male" size='md' />
                                            <Typography fontSize={"md"} fontWeight={"md"} textColor={"text.menuText"}>
                                                Thomas Edison
                                            </Typography>
                                        </Box>
                                        <Divider orientation="vertical" />
                                        <Typography fontSize={"md"} fontWeight={"md"} textColor={"text.menuText"}>
                                            01234567890
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{
                        gap: 1
                    }}>
                        <CardActions sx={{ pt: 0, gap: 1 }}>
                            <RiArticleLine color={theme.palette.text.menuText} />
                            <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.menuText"}>Bill Details</Typography>
                        </CardActions>

                        <CardContent sx={{ px: 2 }}>
                            <Divider sx={{ my: 1 }} />

                            <Box sx={{
                                // borderBottom: `1px dashed ${theme.palette.background.level3}`,
                            }}>
                                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Typography textColor={"text.menuText"} fontWeight={"md"}>Item Total</Typography>
                                    <Typography textColor={"text.currency"} fontWeight={"lg"}> {formatePrice(380.00)}</Typography>
                                </Box>
                                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Typography textColor={"text.menuText"} fontWeight={"md"}>Delivery Partner Tip</Typography>
                                    <Typography textColor={"text.currency"} fontWeight={"lg"}> {formatePrice(20.00)}</Typography>
                                </Box>
                                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Typography textColor={"text.menuText"} fontWeight={"md"}>Delivery Charges</Typography>
                                    <Box display={"flex"} alignItems={"center"} gap={1}>
                                        <Typography textColor={"text.currency"} fontWeight={"lg"}
                                            sx={{ textDecoration: "line-through" }}
                                        > {formatePrice(20.00)}</Typography>
                                        <Typography textColor={"text.menuText"} fontWeight={"lg"}>Free</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 1 }} />

                            <Box>
                                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Typography textColor={"text.menuText"} fontWeight={"md"}>Coupon Discount</Typography>
                                    <Typography textColor={"text.currency"} fontWeight={"lg"}> {formatePrice(100.00)}</Typography>
                                </Box>
                                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Typography textColor={"text.menuText"} fontWeight={"md"}>Taxes & Charges (17%)</Typography>
                                    <Typography textColor={"text.currency"} fontWeight={"lg"}> {formatePrice(80.00)}</Typography>
                                </Box>
                            </Box>
                            <Divider sx={{ mt: 1 }} />
                        </CardContent>

                        <CardActions orientation="horizontal" sx={{ justifyContent: "space-between", pr: 2 }}>
                            <Box display={"flex"} alignItems={"center"} gap={1}>
                                <RiMoneyDollarCircleLine color={theme.palette.text.menuText} />
                                <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.menuText"}>Total Pay</Typography>
                            </Box>
                            <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.currency"}>{formatePrice(380.00)}</Typography>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
        </Grid >
    )
}

export default OrderDetails