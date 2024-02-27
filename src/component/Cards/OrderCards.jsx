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
                sx={{ mt: 2, my: 1 }}
            >
                <AspectRatio ratio="1" sx={{ width: "180px" }}>
                    <Box
                        component={"img"}
                        src={image}
                        srcSet={`${image} 2x`}
                        loading="lazy"
                        alt=""
                        sx={{ objectFit: "cover", borderRadius: theme.radius.lg }}
                    >
                    </Box>
                </AspectRatio>
                <CardContent>
                    <Box>
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                            <Box
                                width={"24px"}
                                component={"img"}
                                src={"/images/icons/veg.png"}
                                alt='veg-non-veg.icon'
                            >
                            </Box>
                            <Typography fontSize={"xl2"} fontWeight={"md"}>
                                1 x Indian Punjabi Cuisine Thali
                            </Typography>
                        </Box>
                        <Typography fontSize={"xl"} fontWeight={"sm"} aria-describedby="card-description" mb={1}>
                            +3 more
                        </Typography>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                        <Box>
                            <Typography fontSize={"xl2"} fontWeight={"md"}>
                                You Ordered
                            </Typography>
                            <Typography fontSize={"lg"} fontWeight={"sm"}>
                                20 days ago
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