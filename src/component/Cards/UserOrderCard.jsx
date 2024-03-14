"use client";
import { Box, Card, CardActions, CardContent, Chip, Divider, Grid, Typography, useTheme } from '@mui/joy';
import React from 'react'

// icons

import { RiArrowRightCircleFill } from "@remixicon/react"
import { BorderStyle } from '@mui/icons-material';
import CustomButton from '../Buttons/CustomButton';
import Link from 'next/link';

const UserOrderCard = ({ status, image, id, date, qty, name, amount, type }) => {
    const theme = useTheme();
    return (
        <Card sx={{ maxWidth: "100%" }}>
            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                maxWidth: "100%"
            }}>
                <Box display={"flex"} alignItems={"flex-start"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                        <Box maxHeight={"100%"} maxWidth={"100%"}>
                            <Box
                                component={"img"}
                                src={image}
                                srcSet={`${image} 2x`}
                                loading="lazy"
                                alt={name}
                                height={"70px"}
                                width={"70px"}
                                borderRadius={"md"}
                            >
                            </Box>
                        </Box>
                        <Box>
                            <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.currency"}>
                                Order ID: #{id}
                            </Typography>
                            <Typography fontSize={"sm"} fontWeight={"md"}>
                                {date}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Chip
                            color={
                                status == "pending" ? "neutral"
                                    : (status == "preparing" || status == "confirmed" ? "warning"
                                        : (status == "delivered" ? "success"
                                            : (status == "cancelled" ? "danger"
                                                : (status === "out for delivery" ? "primary"
                                                    : "neutral"
                                                )
                                            )
                                        )
                                    )
                            }
                            sx={{ borderRadius: "sm" }}>
                            {status}
                        </Chip>
                    </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"}
                    flexDirection={{ xs: "column", md: "row" }}
                    justifyContent={"space-between"}
                    maxWidth={"100%"}
                    sx={{
                        borderTop: `1px dashed ${theme.palette.background.level3}`,
                        borderBottom: `1px dashed ${theme.palette.background.level3}`,
                        py: 2,
                    }}
                >
                    <Box display={"flex"} flexDirection={{ xs: "column", md: "row" }} alignItems={"center"} gap={1} width={"95%"}>
                        <Box minWidth={"20px"} maxWidth={"20px"} maxHeight={"20px"}>
                            <Box
                                width={"100%"}
                                component={"img"}
                                src={type === "veg" ? "/images/icons/veg.png" : "/images/icons/non-veg.jpg"}
                                alt='veg-non-veg.icon'
                            />
                        </Box>
                        <Box display={"flex"} alignItems={"center"} gap={1} width={"100%"}>
                            <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.menuText"}> {qty ?? 0} x </Typography>
                            <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.menuText"}
                                textOverflow={"ellipsis"} overflow={"hidden"}
                                sx={{ textWrap: "nowrap", maxWidth: "85%" }}
                            >
                                {name ?? "Item Name"}
                            </Typography>
                        </Box>
                    </Box>
                    <Box component={Link} href={"/user/my-orders/1"} minWidth={{ md: "5%", xs: "100%" }} alignItems={"center"} display={"flex"} justifyContent={"center"}>
                        <RiArrowRightCircleFill color={theme.palette.text.menuText} />
                    </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}
                    sx={{
                        borderBottom: `1px dashed ${theme.palette.background.level3}`,
                        py: 2
                    }}
                >
                    <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.menuText"} >Total Pay</Typography>
                    <Typography fontSize={"md"} fontWeight={"lg"} textColor={"text.currency"}>  {amount ?? "00.00"}</Typography>
                </Box>

            </CardContent>
            <CardActions sx={{ width: "100%" }}>
                <Grid container sx={{ width: "100%" }} spacing={1}>
                    <Grid xs={6}>
                        <CustomButton color="danger" variant="soft" text={"Cancel"} fullWidth={true} customStyle={{ px: 1, py: 1 }} />
                    </Grid>
                    <Grid xs={6}>
                        <CustomButton color="success" variant="outlined" text={"Rate"} fullWidth={true} customStyle={{ px: 1, py: 1 }} />
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

export default UserOrderCard