"use client";

import { Box, Grid } from '@mui/joy';
import React from 'react'
import SectionHeading from '../SectionHeading/SectionHeading';
import { OfferCards } from '../Cards/OfferCards';

const NewItems = ({ data, showMore = true }) => {
    return (
        <Box>

            <Box my={4}>
                {showMore &&
                    <SectionHeading title={data.title} showMore={true} showMoreLink='/new-products' />
                }
            </Box>

            <Box>
                <Grid container spacing={2} sx={{ flexGrow: 1 }} >
                    {data.product_details.map((item, index) => {
                        const discount  = item.min_max_price.discount_in_percentage

                        return (
                            <Grid xs={12} md={3} key={index}>
                                <OfferCards image={item.image_sm} title={item.name} product={item} discount={discount} price={item.
                                    variants[0].special_price != 0 ? item.variants[0]
                                    .special_price  : item.variants[0]
                                    .price} shape='rectangle' />
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>

        </Box>
    )
}

export default NewItems