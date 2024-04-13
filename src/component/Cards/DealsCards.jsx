"use client";

import { Box, Card, CardCover, Grid } from '@mui/joy';
import { useTheme } from '@mui/joy/styles'

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import ProductModal from "@/component/Modals/ProductModal";
import { getProducts } from "@/repository/productsRepo";
import { useSelector } from 'react-redux';

const DealsCards = ({ images }) => {

    const { t } = useTranslation()
    const layoutDirection = useSelector((state) => state.rtl.layoutDirection);

    return (

        <Box display={"flex"} flexDirection={"column"}>
            <SectionHeading
                title={t("hot-deals")}
                showMore={true}
                showMoreLink="/offers"
            />

            <Grid direction={"ltr"} container gap={3} mt={4} display={"flex"} justifyContent="center">
                <Swiper
                    className={'wi-100'}
                    slidesPerView={1}
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
                    pagination={{ clickable: true, dynamicBullets: true }}
                    autoplay={{ reverseDirection: layoutDirection == "rtl" && true, }}

                    navigation={{ clickable: true }}
                    modules={[Autoplay, Pagination, Navigation]}
                    style={{ padding: "8px 0" }}
                >
                    {images.map((item, index) => {


                        return (
                            <SwiperSlide key={index}>

                                <Content item={item} />

                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </Grid>
        </Box>
    )
}

export default DealsCards


const Content = ({ item }) => {
    const theme = useTheme()
    let link = ""
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(false)
    if (item.type == "categories") {
        link = "/categories/" + item.data[0].slug
    }
    useEffect(() => {
        init()
    }, []);

    const init = async () => {
        if (item.type === "products") {
            const data = await getProducts({ id: item.type_id })
            setData(data.data[0])
        }
    }

    return (<Box
        component={item.type == "categories" ? Link : Box}
        href={link}
        display={"flex"}
        justifyContent={"center"}
    >
        {(item.type === "products") && (data != false) && (
            <ProductModal
                modalOpen={open}
                setModalOpen={(value) => {
                    setOpen(value)
                }}
                image={data.image_sm}
                title={data.name}
                rating={data.rating}
                description={data.short_description}
                variants={data.variants}
                addOns={data.product_add_ons}
                simple={data.type}
                showButton={false}
            />
        )}
        <Card
            sx={{
                width: 250,
                height: 250,
                borderRadius: theme.radius.xl,
                boxShadow: "0px 4px 4px 0px #00000040"
            }}
            onClick={() => setOpen(true)}
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
    </Box>)
}