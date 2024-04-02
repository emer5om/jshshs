"use client"

import { Box, Grid } from '@mui/joy'
import React from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import ProductCards from '../Cards/ProductCards'
import { useTranslation } from "react-i18next";
import ListCards from '../Cards/ListCards'


// todo: add API data here


const DelightfulDishes = ({ data }) => {
    const { t } = useTranslation()
    return (
        <Box my={2} display={"flex"} flexDirection={"column"} gap={2}>
            <SectionHeading title={t("delightfull-dishes")} showMore={true} showMoreLink='/products' />


            <Box mt={4}>
                <Grid container spacing={2}>
                    {/* <ListCards data={data} /> */}
                    {data.map((item, index) => {
                        const discount  = item.min_max_price.discount_in_percentage

                        return (
                            <Grid xs={12} md={6} lg={4} key={index}>
                                <ProductCards  image={item.image_sm} discount={discount} categoryName={item.category_name} title={item.name} discountedPrice={item.
                                    variants[0].special_price != 0 ? item.variants[0]
                                    .special_price  : item.variants[0]
                                    .price} price={ item.min_max_price.max_price} type={item.type} product={item}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </Box>
    )
}

export default DelightfulDishes