"use client";
import { Box, Card, CardActions, CardContent, Typography } from '@mui/joy';
import React from 'react'

// icons

import { RiArrowRightCircleFill } from "@remixicon/react"

const UserOrderCard = () => {
    return (
        <Card>
            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                <Box display={"flex"} alignItems={"flex-start"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                        <Box maxHeight={"100%"} maxWidth={"100%"}>
                            <Box
                                component={"img"}
                                src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                                srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                                loading="lazy"
                                alt=""
                                height={"100px"}
                                width={"100px"}
                                borderRadius={"md"}
                            >
                            </Box>
                        </Box>
                        <Box>
                            <Typography> some name </Typography>
                            <Typography> some time </Typography>
                        </Box>
                    </Box>
                    <Box>
                        Pending
                    </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                        <Box maxWidth={"100%"} maxHeight={"100%"}>
                            <Box
                                width={"20px"}
                                component={"img"}
                                src={"/images/icons/veg.png"}
                                // src={item.type === "veg" ? "/images/icons/veg.png" : "/images/icons/non-veg.jpg"}
                                alt='veg-non-veg.icon'
                            />
                        </Box>
                        <Typography> 2 x Indian Punjabi Cuisine Thali ( 750 GM ) </Typography>
                    </Box>
                    <Box>
                        <RiArrowRightCircleFill />
                    </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography>Total Pay</Typography>
                    <Typography> $ 180.00</Typography>
                </Box>

            </CardContent>
            <CardActions>
                
            </CardActions>
        </Card>
    )
}

export default UserOrderCard