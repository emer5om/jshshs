"use client";

import { useTheme, Card, CardContent, AspectRatio, Typography, Link, Chip, Box, CardActions } from '@mui/joy';
import React from 'react'
import CustomButton from '../Buttons/CustomButton';


// icons

import StarFillIcon from "remixicon-react/StarFillIcon"
import HeartLineIcon from "remixicon-react/HeartLineIcon"
import { RiHeartFill } from "@remixicon/react"
import ProductModal from '../Modals/ProductModal';


const ProductCards = ({ image, type, rating, isLiked, categoryName, title, price, discountedPrice, discount }) => {

    const theme = useTheme()

    return (
        <Card
            variant="outlined"
            sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                transition: "transform 0.3s ease-in-out",
                '&:hover': {
                    boxShadow: 'md',
                    borderColor: 'neutral.outlinedHoverBorder',
                    backgroundColor: theme.palette.primary[50]
                },
            }}
        >
            <Box display={"flex"} gap={2}>
                <Box maxWidth={250} maxHeight={"150px"}>
                    <Box
                        component={"img"}
                        src={image}
                        srcSet={`${image} 2x`}
                        loading="lazy"
                        alt=""
                        width={"100%"}
                        height={"150px"}
                        borderRadius={"md"}
                        minWidth={"20%"}
                        sx={{ objectFit: "cover" }}
                    ></Box>
                    <Box position={"absolute"} top={"75%"} left={"5%"}>
                        <Typography fontSize={"md"} fontWeight={"lg"} textColor={"background.body"}>
                            {discount} OFF
                        </Typography>
                    </Box>
                </Box>

                <Box width={"100%"}>

                    <Box display={"flex"} alignItems={"center"} width={"100%"}>
                        <Box display={"flex"} alignItems={"center"} width={"100%"} gap={1}>
                            <Box
                                width={"20px"}
                                component={"img"}
                                src={type === "veg" ? "/images/icons/veg.png" : "/images/icons/non-veg.jpg"}
                                alt='veg-non-veg.icon'
                            >
                            </Box>

                            <Box display={"flex"} alignItems={"center"} width={"100%"}>
                                <StarFillIcon color={theme.palette.warning[400]} />
                                <Typography> {rating ?? 0} </Typography>
                            </Box>
                        </Box>
                        <Box>
                            {isLiked ?
                                <RiHeartFill color={theme.palette.danger[500]} />
                                :
                                <HeartLineIcon color={theme.palette.background.footer} />
                            }
                        </Box>
                        {/* images and other data */}
                    </Box>

                    <Box mt={1}>
                        <Typography fontSize={"sm"} fontWeight={"md"} textColor={"text.tertiary"}>
                            {categoryName}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography fontSize={"lg"} fontWeight={"md"} >
                            {title}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography fontSize={"md"} fontWeight={"xl"} textColor={"text.currency"}>
                            {(discountedPrice) ? discountedPrice : price}
                        </Typography>
                    </Box>

                    <Box display={"flex"} flexDirection={"row"} justifyContent={"end"}>
                        <ProductModal />
                    </Box>
                </Box>

            </Box>
        </Card>
    )
}

export default ProductCards