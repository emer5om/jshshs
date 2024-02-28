"use client";

import { Card, CardCover, CardContent, Typography, Box } from '@mui/joy';
import React from 'react'

// shape is for is it rectangle or square 
export const OfferCards = ({ shape = "square", title, discount, price }) => {
    return (
        <Card sx={{ minHeight: 300, width: shape === "square" ? 300 : "500px", borderRadius: "xl" }}>
            <CardCover>
                <img
                    src="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
                    srcSet="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x"
                    loading="lazy"
                    alt=""
                />
            </CardCover>
            <CardCover
                sx={{
                    background:
                        'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                }}
            />
            <CardContent sx={{ justifyContent: 'flex-end' }}>
                <Box display={"flex"} alignItems={"baseline"} justifyContent={"space-between"}>
                    <Box>
                        <Typography textColor={"background.level1"} fontSize={"xl"} fontWeight={"md"}>
                            Cheese Pizza
                        </Typography>
                        <Typography
                            textColor="neutral.300"
                        >
                            20% OFF
                        </Typography>
                    </Box>

                    <Box>
                        <Typography textColor={"warning.400"} fontSize={"xl"} fontWeight={"md"}> $120 </Typography>
                    </Box>
                </Box>

            </CardContent>
        </Card>
    )
}
