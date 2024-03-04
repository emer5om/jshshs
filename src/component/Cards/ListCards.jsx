"use client"


import { AspectRatio, Box, Card, CardContent, CardOverflow, Grid, Typography, useTheme } from '@mui/joy'
import React from 'react'

// icons

import HeartLineIcon from "remixicon-react/HeartLineIcon"
import StarFillIcon from "remixicon-react/StarFillIcon"
import CustomButton from '../Buttons/CustomButton'

const ListCards = ({ data }) => {
    const theme = useTheme()
    return (
        <Box>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                {data.map((item, index) => {
                    return (
                        <Grid xs={12} md={4} key={index}>

                            <Card key={index} orientation="horizontal" variant="outlined"
                                sx={{
                                    width: "100%",
                                    height: { xs: "250px", md: "200px" },
                                    borderRadius: "md",
                                    "&:hover": {
                                        backgroundColor: theme.palette.primary[50],
                                        "& .img": {
                                            transform: "scale(1.07)",
                                        },
                                        boxShadow:
                                            "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",

                                    },
                                    transition: "transform 0.3s ease-in-out"
                                }}>

                                <CardOverflow sx={{ alignItems: "center" }}>
                                    <Box maxWidth={"100%"} maxHeight={"100%"} >
                                        <Box
                                            component={"img"}
                                            src={item.image}
                                            className='img'
                                            srcSet={`${item.image} 2x`}
                                            loading="lazy"
                                            alt=""
                                            height={"100px"}
                                            width={"100%"}
                                            sx={{
                                                borderTopLeftRadius: theme.radius.md,
                                                borderBottomLeftRadius: theme.radius.md,
                                                transition: "transform 0.3s ease-in-out"
                                            }}

                                        >
                                        </Box>
                                    </Box>
                                </CardOverflow>
                                <CardContent sx={{ maxWidth: { xs: "50%", md: "80%" } }}>
                                    <Box >
                                        <Box>
                                            <Box display={"flex"} alignItems={"center"} width={"100%"}>
                                                <Box display={"flex"} alignItems={"center"} width={"100%"} gap={2}>
                                                    <Box
                                                        width={"20px"}
                                                        component={"img"}
                                                        src={item.type === "veg" ? "/images/icons/veg.png" : "/images/icons/non-veg.jpg"}
                                                        alt='veg-non-veg.icon'
                                                    >
                                                    </Box>

                                                    <Box display={"flex"} alignItems={"center"} width={"100%"} gap={0.5}>
                                                        <StarFillIcon color={theme.palette.warning[400]} />
                                                        <Typography> 4.5 </Typography>
                                                    </Box>
                                                </Box>
                                                <Box>
                                                    <HeartLineIcon color={theme.palette.background.footer} />
                                                </Box>
                                                {/* images and other data */}
                                            </Box>


                                            <Box my={2}>
                                                <Typography
                                                    fontSize={theme.fontSize.sm} fontWeight={theme.fontWeight.md}
                                                    textColor={"text.currency"}
                                                    textTransform={"capitalize"}
                                                >{item.category}</Typography>
                                                <Typography
                                                    fontSize={theme.fontSize.md} fontWeight={theme.fontWeight.lg}
                                                    sx={{
                                                        textOverflow: "ellipsis",
                                                        width: "100%",
                                                        textWrap: "nowrap",
                                                        overflow: "hidden",
                                                        mb: 1
                                                    }}
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
                                            </Box>

                                            <Box display={"flex"} flexDirection={{ xs: "column", md: "row" }} alignItems={"center"} justifyContent={"space-between"}>
                                                <Box display={'flex'} alignItems={"center"} gap={1.5}>
                                                    <Typography sx={{ color: theme.palette.text.tertiary, textDecoration: "line-through" }} fontSize={theme.fontSize.xs} fontWeight={theme.fontWeight.sm}>$ {item.price}</Typography>
                                                    <Typography sx={{ color: theme.palette.text.currency }} fontSize={theme.fontSize.md} fontWeight={theme.fontWeight.lg}>$ {item.price}</Typography>
                                                </Box>
                                                <CustomButton text={"Add"} customStyle={{ px: 3, py: .5 }} />
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

export default ListCards