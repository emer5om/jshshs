"use client";
import React from 'react'
import { Box, useTheme, Grid, Card, CardCover } from '@mui/joy'
import Link from 'next/link';
import {HeadTitle} from "@/component/HeadTitle";

const ViewDeals = ({ images }) => {
    const theme = useTheme()

    return (
        <Box display={"flex"} flexDirection={"column"}>
            <HeadTitle title={"hot-deals"} />
            <Grid container gap={3} mt={4}>
                {images.map((item, index) => {
                    return (
                        <Grid xs={6} md={2}>
                            <Box
                                key={index}
                                component={Link}
                                href={item.link}
                                maxWidth={"100%"}
                                maxHeight={"100%"}
                            >
                                <Card
                                    sx={{
                                        width: "100%",
                                        height: 300,
                                        borderRadius: theme.radius.xl,
                                        boxShadow: "0px 4px 4px 0px #00000040"
                                    }}
                                >
                                    <CardCover>
                                        <Box
                                            component={'img'}
                                            src={item.image}
                                            srcSet={`${item.image} 2x`}
                                            loading="lazy"
                                            alt=""
                                            sx={{ objectFit: "contain", width: '100%' }}
                                        >
                                        </Box>
                                    </CardCover>
                                </Card>
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default ViewDeals