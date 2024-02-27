"use client";
import { Box, Card, CardActions, CardContent, Typography, CardCover, Button, Grid } from '@mui/joy'
import React from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import { useTheme } from '@mui/joy/styles'

// Components
import CustomButton from '../Buttons/CustomButton';

// icons

import HeartLineIcon from "remixicon-react/HeartLineIcon"
import StarFillIcon from "remixicon-react/StarFillIcon"

const PopularCards = ({ data }) => {
    const theme = useTheme()

    return (
        <Box display={"flex"} flexDirection={"column"}>
            <SectionHeading
                title={"Popular Dishes"}
                showMore={true}
                showMoreLink="#"
            />

            <Grid container spacing={2}>
                {data.map(item => {
                    return (
                        <Grid xs={12} md={3}>
                            <Card sx={{
                                width: 400,
                                height: 523,
                                p: 0,
                                my: 4,
                                borderRadius: theme.radius.xl,
                                "&:hover": {
                                    backgroundColor: theme.palette.primary[50],
                                    "& .img": {
                                        transform: "scale(1.07)",
                                    },
                                    boxShadow:
                                        "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",

                                },
                                transition: "transform 0.3s ease-in-out"

                            }} >
                                <CardActions sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Box px={3.5} py={3} >
                                        <Box
                                            width={"24px"}
                                            component={"img"}
                                            src={item.type === "veg" ? "/images/icons/veg.png" : "/images/icons/non-veg.jpg"}
                                            alt='veg-non-veg.icon'
                                        >
                                        </Box>
                                    </Box>
                                    <Box bgcolor={theme.palette.primary[400]} px={3.5} py={3} sx={{ borderRadius: "0px 16px 0px 42.5px" }}>
                                        <HeartLineIcon size={"24px"} className="likeIcon" />
                                    </Box>
                                </CardActions>

                                <CardContent>
                                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} mt={1}>
                                        <Box
                                            width={"225px"}
                                            height={"225px"}
                                            borderRadius={"50%"}
                                            display={"flex"}
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                        >
                                            <Box
                                                component={"img"}
                                                className='img'
                                                src={item.image}
                                                srcSet="/images/demo-images/salad-1.png 2x"
                                                loading="lazy"
                                                alt=""
                                                borderRadius={"50%"}
                                                height={"100%"}
                                                width={"100%"}
                                                sx={{ transition: "transform 0.3s ease-in-out" }} // Smooth transition
                                            />
                                        </Box>
                                    </Box>
                                    <Box px={3.5} py={4} display={"flex"} alignItems={"end"} justifyContent={"space-between"}>
                                        <Box display={"flex"} alignItems={"flex-start"} flexDirection={"column"} gap={1}>
                                            <Typography fontSize={theme.fontSize.xl2} fontWeight={theme.fontWeight.lg}>
                                                {item.title}
                                            </Typography>
                                            <Typography
                                                sx={{ color: theme.palette.text.description }}
                                                fontSize={theme.fontSize.xl}
                                                fontWeight={theme.fontWeight.lg}>
                                                {item.description}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <CustomButton text={"Add"} customStyle={{ px: 4, py: 0.5 }} />
                                        </Box>
                                    </Box>

                                    <Box px={3.5} pb={3} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                        <Box>
                                            <Typography sx={{ color: theme.palette.text.currency }} fontSize={theme.fontSize.xl2} fontWeight={theme.fontWeight.lg}>$ {item.price}</Typography>
                                        </Box>
                                        <Box display={"flex"} alignItems={"center"} gap={1}>
                                            <StarFillIcon color={theme.palette.warning[500]} />
                                            <Typography fontSize={theme.fontSize.xl2} fontWeight={theme.fontWeight.lg}>{item.rating}</Typography>
                                        </Box>
                                    </Box>

                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>


        </Box>
    )
}

export default PopularCards