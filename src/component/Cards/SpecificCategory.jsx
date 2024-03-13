"use client";

import React from 'react'
import { Card, AspectRatio, CardContent, Typography, Box, useTheme } from '@mui/joy';
import StarRatings from "react-star-ratings"
import CustomButton from '../Buttons/CustomButton';
import { LazyLoadImage } from 'react-lazy-load-image-component';


function SpecificCategory({ image, title, ratings, price, discountedPrice }) {
    const theme = useTheme();

    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                maxWidth: "100%",
                transition: "transform 0.3s ease-in-out",
                borderRadius: "lg",
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder', backgroundColor: "warning.50" },
            }}
        >
            <AspectRatio ratio="1" sx={{ minWidth: "30%", maxHeight: "100%" }}>
                <Box
                    component={LazyLoadImage}
                    src={image}
                    srcSet={`${image} 2x`}
                    loading="lazy"
                    alt={image}
                    maxWidth={"100%"}
                    sx={{ objectFit: "cover" }}
                    borderRadius={"lg"}
                >
                </Box>
            </AspectRatio>
            <CardContent sx={{ minWidth: "60%" }}>
                <Box
                    display={"flex"}
                    alignItems={"start"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    width={"100%"}
                    height={"100%"}
                >
                    <Box>
                        <Typography fontSize={"lg"} fontWeight={"md"} textOverflow={"ellipsis"} sx={{ textWrap: "nowrap", overflow: "hidden" }}>
                            {title}
                        </Typography>
                    </Box>
                    <Box display={"flex"} alignItems={"end"} justifyContent={"space-between"} width={"100%"} >
                        <Box>
                            <StarRatings rating={ratings} starDimension={theme.fontSize.xl} starSpacing='1px' starRatedColor={theme.palette.warning[400]} ></StarRatings>

                            <Box display={"flex"} alignItems={"end"} gap={2} width={"100%"} >
                                <Typography fontSize={"sm"} fontWeight={"md"} textColor={"neutral.500"} sx={{textDecoration: "line-through"}}>
                                    $ {discountedPrice > 0 && price}
                                </Typography>
                                <Typography fontSize={"md"} fontWeight={"xl"} textColor={"text.currency"}>
                                    $ {discountedPrice > 0 ? discountedPrice : price}
                                </Typography>
                            </Box>
                        </Box>
                        <CustomButton text={"Add"} customStyle={{ px: 3, py: 1 }} />
                    </Box>
                </Box>
            </CardContent>
        </Card>

    )
}

export default SpecificCategory