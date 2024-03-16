"use client";

import { Card, CardCover, CardContent, Typography, Box } from '@mui/joy';
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {formatePrice} from "@/helpers/functonHelpers";

// shape is for is it rectangle or square 
export const OfferCards = ({ shape = "square", title, discount, price, image }) => {
    if(typeof price == "string"){
        price = parseFloat(price)
    }
    return (
        <Card sx={{
            minHeight: 250, width: shape === "square" ? "100%" : "700px",
            borderRadius: shape === "square" ? "xl" : "md"
        }}>
            <CardCover>
                <Box
                    component={LazyLoadImage}
                    src={image}
                    srcSet={`${image} 2x`}
                    loading="lazy"
                    alt={image}
                >
                </Box>
            </CardCover>
            <CardCover
                sx={{
                    background:
                        'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                }}
            />
            <CardContent sx={{ justifyContent: 'flex-end' }}>
                <Box display={"flex"} alignItems={"start"} justifyContent={"space-between"} flexDirection={"column"} gap={1}>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                        <Typography textColor={"background.level1"} fontSize={"xl"} fontWeight={"md"} textOverflow={"ellipsis"} sx={{ textWrap: "nowrap", overflow: "hidden" }}>
                            {title}
                        </Typography>
                        <Typography textColor={"neutral.50"} fontSize={"sm"} fontWeight={"sm"}>
                            price
                        </Typography>
                    </Box>

                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                        {(discount) ? <>
                            <Typography textColor="neutral.300" >
                                {discount}% OFF
                            </Typography>
                        </> : <div>

                        </div>}

                        <Typography textColor={"warning.400"} fontSize={"xl"} fontWeight={"md"}>
                            {(price)}
                        </Typography>
                    </Box>
                </Box>

            </CardContent>
        </Card>
    )
}
