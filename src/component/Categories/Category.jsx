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
import { get_categories } from "@/interceptor/routes"


const Category = ({ data }) => {
    const homeStoreData = useSelector((state) => state.homepage);

    const categories = homeStoreData.categories
    console.log(categories)
    // const getCategories = () => {
    //     get_categories().then(res => {
    //         dispatch(setCategories(res.data))
    //     });
    // }
    // useEffect(() => {
    //     if (categories.length === 0) {
    //         getCategories()
    //     }
    // }, [])


    return (
        <Box>

            {/* Heading */}
            <Box display={"flex"} flexDirection={"column"}>
                <Box>
                    <SectionHeading title={"Cuisine Crafted with care"} showMore={true} showMoreLink='/categories' />
                </Box>

                <Grid container spacing={1} my={2} >
                    <Swiper
                        slidesPerView={12}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            425: {
                                slidesPerView: 2
                            },
                            768: {
                                slidesPerView: 4
                            },
                            1024: {
                                slidesPerView: 10,
                                spaceBetween: 40
                            },
                        }}
                        spaceBetween={10}
                        pagination={{ clickable: true }}
                        navigation={{ clickable: true }}
                        modules={[Autoplay, Pagination, Navigation]}
                        style={{ padding: "8px 0" }}
                    >
                        {categories.map((item, index) => {
                            return (
                                <Grid xs={3} md={1} key={index}>
                                    <SwiperSlide key={index} style={{ width: "100px" }}>
                                        <Box >
                                            <CategoryCards image={item.image} title={item.name} count={0} />
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