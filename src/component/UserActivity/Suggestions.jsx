"use client";

import React from 'react'

import { Box, Card, CardContent, CardOverflow, useTheme, Typography } from '@mui/joy'
import SectionHeading from '../SectionHeading/SectionHeading'

// icons

import MapPin5LineIcon from "remixicon-react/MapPin5LineIcon"
import ArrowRightCircleFillIcon from "remixicon-react/ArrowRightCircleFillIcon"
import OrderCards from '../Cards/OrderCards';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";

const Suggestions = ({ data }) => {
    const theme = useTheme()
    return (
        <Box bgcolor={theme.palette.primary[50]} px={4} py={2} borderRadius={theme.radius.xl}
            boxShadow={"8px 0px 36px 0px #002F3514"}
        >
            <Box display={"flex"} flexDirection={"column"} gap={2}>
                <SectionHeading title={"Because You Ordered"}></SectionHeading>

                <Box>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        pagination={{ clickable: true }}
                        modules={[Autoplay, Pagination, Navigation]}
                    >
                        {data.map((item, index) => {
                            return (<SwiperSlide key={index}>
                                <OrderCards image={item.image} title={item.title} titleQty={item.titleQty} others={item.other} daysAgo={item.daysAgo} type={item.type} />
                            </SwiperSlide>)
                        })}
                    </Swiper>
                </Box>

            </Box>

        </Box>
    )
}

export default Suggestions