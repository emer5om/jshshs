"use client"

import React from 'react'
import { AspectRatio, Link, Card, CardContent, Chip, Typography, Box, useTheme } from '@mui/joy';
import CustomButton from '../Buttons/CustomButton';

// type for veg or nonVeg
const OrderCards = ({ image, type, title, titleQty, others, daysAgo }) => {
    const theme = useTheme()
    return (
        <div>

            <Card
                variant="outlined"
                orientation="horizontal"
                sx={{ mt: 1, my: 1 }}
            >
                <Box >
                    <Box
                        component={"img"}
                        src={image}
                        srcSet={`${image} 2x`}
                        loading="lazy"
                        alt=""
                        sx={{ objectFit: "cover", borderRadius: theme.radius.lg, width: "150px",height: "150px" }}
                    >
                    </Box>
                </Box>
                <CardContent>
                    <Box>
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                            <Box
                                width={"20px"}
                                component={"img"}
                                src={type === "veg" ? "/images/icons/Veg.svg" : "/images/icons/Non_veg.svg"}
                                alt='veg-non-veg.icon'
                            >
                            </Box>
                            <Typography fontSize={"xl"} fontWeight={"xl"}>
                                {titleQty} x {title}
                            </Typography>
                        </Box>
                        <Typography fontSize={"md"} fontWeight={"md"} aria-describedby="card-description" mb={1}>
                            +{others} more
                        </Typography>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                        <Box>
                            <Typography fontSize={"xl"} fontWeight={"xl"}>
                                You Ordered
                            </Typography>
                            <Typography fontSize={"sm"} fontWeight={"md"}>
                                {daysAgo}
                            </Typography>
                        </Box>
                        <CustomButton text={"Re-Order"} customStyle={{ px: 2, py: 1 }} />
                    </Box>

                </CardContent>
            </Card>

        </div>
    )
}

export default OrderCards