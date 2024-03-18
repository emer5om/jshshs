"use client";

import { Box, Grid } from '@mui/joy';
import React from 'react'
import SectionHeading from '../SectionHeading/SectionHeading';
import { OfferCards } from '../Cards/OfferCards';

const Offers = ({ data, showMore = true }) => {
    return (
        <Box>

            <Box my={4}>
                {showMore &&
                    <SectionHeading title={data.title} showMore={true} showMoreLink='/offers' />
                }
            </Box>

            <Box>
                <Grid container spacing={2} sx={{ flexGrow: 1 }} >
                    {data.product_details.map((item, index) => {
                        const discount  = item.min_max_price.discount_in_percentage
                        console.log(discount)
                        return (
                            <Grid xs={12} md={2} key={index}>
                                <OfferCards image={item.image_sm} title={item.name} discount={discount} product={item} price={item.
                                    variants[0].special_price != 0 ? item.variants[0]
                                    .special_price  : item.variants[0]
                                    .price
                                } />
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>

        </Box>
    )
}

export default Offers