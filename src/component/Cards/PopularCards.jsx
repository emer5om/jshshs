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
                        <Grid xs={12} md={2}>
                            <Card sx={{
                                width: "100%",
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


                                <CardContent>

                                    <CardActions sx={{
                                        position: "absolute",
                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                        width: "100%"
                                    }}>
                                        <Box px={1.5} py={1} >
                                            <Box
                                                width={"18px"}
                                                component={"img"}
                                                src={item.type === "veg" ? "/images/icons/veg.png" : "/images/icons/non-veg.jpg"}
                                                alt='veg-non-veg.icon'
                                            >
                                            </Box>
                                        </Box>
                                        <Box bgcolor={theme.palette.primary[400]} px={2.5} py={2} sx={{ borderRadius: "0px 16px 0px 42.5px", mt: "-1px" }}>
                                            <HeartLineIcon size={"18px"} className="likeIcon" />
                                        </Box>
                                    </CardActions>

                                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} mt={1}>
                                        <Box
                                            maxWidth={"100%"}
                                            height={"200px"}
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
                                    <Box p={2} display={"flex"} flexDirection={"column"} alignItems={"start"} justifyContent={"space-between"} gap={1}>
                                        <Typography fontSize={theme.fontSize.md} fontWeight={theme.fontWeight.lg}
                                            sx={{ textOverflow: "ellipsis", width: "100%", textWrap: "nowrap", overflow: "hidden" }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            textOverflow={"ellipsis"}
                                            
                                            overflow={"hidden"}
                                            sx={{ color: theme.palette.text.description, textWrap: "nowrap" }}
                                            fontSize={theme.fontSize.sm}
                                            fontWeight={theme.fontWeight.md}>
                                            {item.description}
                                        </Typography>
                                        <CustomButton text={"Add"} customStyle={{ px: 4, py: 0.5 }} />
                                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
                                            <Box display={"flex"} alignItems={"center"} gap={1}>
                                                <Typography sx={{ color: theme.palette.text.tertiary, textDecoration: "line-through" }} fontSize={theme.fontSize.xs} fontWeight={theme.fontWeight.sm}>$ {item.price}</Typography>
                                                <Typography sx={{ color: theme.palette.text.currency }} fontSize={theme.fontSize.md} fontWeight={theme.fontWeight.lg}>$ {item.price}</Typography>
                                            </Box>
                                            <Box display={"flex"} alignItems={"center"} gap={1}>
                                                <StarFillIcon size={theme.fontSize.sm} color={theme.palette.warning[500]} />
                                                <Typography fontSize={theme.fontSize.sm} fontWeight={theme.fontWeight.lg}>{item.rating}</Typography>
                                            </Box>
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