"use client";

import { Box, Typography, Grid } from '@mui/joy';
import React from 'react'
import SectionHeading from "../SectionHeading/SectionHeading"
import CategoryCards from "../Cards/CategoryCards"

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";



// const data = [{image: ""}]

const Category = ({ data }) => {

    return (
        <Box>

            {/* Heading */}
            <Box display={"flex"} flexDirection={"column"}>
                <Box>
                    <SectionHeading title={"Cuisine Crafted with care"} />
                </Box>

                <Grid container spacing={1} my={2} >
                    <Swiper
                        slidesPerView={12}
                        breakpoints={{
                            320: {
                                slidesPerView: 1
                            },
                            425: {
                                slidesPerView: 2
                            },
                            768: {
                                slidesPerView: 4
                            },
                            1024: {
                                slidesPerView: 12
                            },
                        }}
                        spaceBetween={10}
                        pagination={{ clickable: true }}
                        navigation={{ clickable: true }}
                        modules={[Autoplay, Pagination, Navigation]}
                        style={{ padding: "8px 0" }}
                    >
                        {data.map((item, index) => {
                            return (
                                <Grid xs={3} md={1}>
                                    <SwiperSlide key={index}>
                                        <Box >
                                            <CategoryCards image={item.image} title={item.title} count={item.count} />
                                        </Box>
                                    </SwiperSlide>
                                </Grid>
                            )
                        })}

                    </Swiper>
                </Grid>
            </Box>


        </Box>
    )
}

export default Category