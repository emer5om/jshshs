"use client";

import { Box, Card, CardCover, Grid } from '@mui/joy';
import { useTheme } from '@mui/joy/styles'

import Link from 'next/link';
import React from 'react'
import SectionHeading from '../SectionHeading/SectionHeading';

const DealsCards = ({ images }) => {
    const theme = useTheme()


    // box-shadow: 0px 4px 4px 0px #00000040;


    return (

        <Box display={"flex"} flexDirection={"column"}>
            <SectionHeading
                title={"Hot Deals"}
                showMore={true}
                showMoreLink="#"
            />

            <Grid container gap={3} mt={4}>
                {images.map(item => {
                    return (
                        <Box
                            component={Link}
                            href={item.link}
                        >
                            <Card
                                sx={{
                                    width: 400,
                                    height: 400,
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
                                        sx={{ objectFit: "cover" }}
                                    >
                                    </Box>
                                </CardCover>
                            </Card>
                        </Box>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default DealsCards