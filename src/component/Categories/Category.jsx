"use client";

import { Box, Typography, Grid } from '@mui/joy';
import React, { useEffect } from 'react'
import SectionHeading from "../SectionHeading/SectionHeading"
import CategoryCards from "../Cards/CategoryCards"

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../store/reducers/categorySlice';


// APIs
// import { get_categories } from "@/interceptor/routes"
import { useTranslation } from "react-i18next";


const Category = () => {
    const homeStoreData = useSelector((state) => state.homepage);

    const categories = homeStoreData.categories
    const { t } = useTranslation()

    const layoutDirection = useSelector((state) => state.rtl.layoutDirection);


    return (
        <Box>

            {/* Heading */}
            <Box display={"flex"} flexDirection={"column"}>
                <Box>
                    <SectionHeading title={t("cuisine-crafted-with-care")} showMore={true} showMoreLink='/categories' />
                </Box>

                <Grid direction={"ltr"} container spacing={1} my={2} >
                    <Swiper
                        slidesPerView={2}
                        breakpoints={{
                      
                            320: {
                                slidesPerView: 2,
                            },
                            425: {
                                slidesPerView: 2
                            },
                            768: {
                                slidesPerView: 4
                            },
                            1024: {
                                slidesPerView: 6,
                            },
                            1240: {
                                slidesPerView: 10,
                            },

                            1440: {
                                slidesPerView: 8,
                                // spaceBetween: 40
                            }
                        }}
                        spaceBetween={10}
                        navigation={{ clickable: true }}
                        autoplay={{ reverseDirection: layoutDirection == "rtl" && true, }}

                        modules={[Autoplay, Pagination, Navigation]}
                        style={{ padding: "8px 0" }}
                    >
                        {categories.map((item, index) => {

                            return (
                                <Grid xs={3} md={1} key={index}>
                                    <SwiperSlide key={index} style={{ width: "100px" }}>
                                        <CategoryCards image={item.image} title={item.name} slug={item.slug} count={0} />
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