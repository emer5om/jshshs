"use client";

import { Box, Card, CardCover, Grid } from '@mui/joy';
import { useTheme } from '@mui/joy/styles'

import Link from 'next/link';
import React from 'react'
import SectionHeading from '../SectionHeading/SectionHeading';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const DealsCards = ({ images }) => {
    const theme = useTheme()


    return (

        <Box display={"flex"} flexDirection={"column"}>
            <SectionHeading
                title={"Hot Deals"}
                showMore={true}
                showMoreLink="/hot-deals"
            />

            <Grid container gap={3} mt={4}>
                <Swiper
    className={'wi-100'}
                    slidesPerView={6}
                    breakpoints={{
                        320: {
                            slidesPerView: 1
                        },
                        425: {
                            slidesPerView: 2
                        },
                        768: {
                            slidesPerView: 3
                        },
                        1024: {
                            slidesPerView: 6
                        }
                    }}
                    spaceBetween={10}
                    pagination={{ clickable: true }}
                    navigation={{ clickable: true }}
                    modules={[Autoplay, Pagination, Navigation]}
                    style={{ padding: "8px 0" }}
                >
                    {images.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <Box
                                    component={Link}
                                    href={"#"}
                                >
                                    <Card
                                        sx={{
                                            width: 250,
                                            height: 250,
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
                                                sx={{ objectFit: "contain" }}
                                            >
                                            </Box>
                                        </CardCover>
                                    </Card>
                                </Box>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </Grid>
        </Box>
    )
}

export default DealsCards