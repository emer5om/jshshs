"use client"

import { Box, Grid } from '@mui/joy'
import React from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import ProductCards from '../Cards/ProductCards'


// todo: add API data here


const DelightfulDishes = ({ data }) => {
    return (
        <Box my={2} display={"flex"} flexDirection={"column"} gap={2}>
            <SectionHeading title={"Delightful Dishes"} showMore={true} showMoreLink='#' />


            <Box mt={4}>
                <Grid container spacing={2}>
                    {data.map((item, index) => {
                        return (
                            <Grid xs={12} md={3} key={index}>
                                <ProductCards image={item.image} discount={item.discount} categoryName={item.categoryName} title={item.title} discountedPrice={item.discountedPrice} price={item.price} type={item.type}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </Box>
    )
}

export default DelightfulDishes