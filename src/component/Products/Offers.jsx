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
                    <SectionHeading title={"Foods On Offer"} showMore={true} showMoreLink='/offers' />
                }
            </Box>

            <Box>
                <Grid container spacing={2} sx={{ flexGrow: 1 }} >
                    {data.map((item, index) => {
                        return (
                            <Grid xs={12} md={2} key={index}>
                                <OfferCards image={item.image} title={item.title} discount={item.discount} price={item.price} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>

        </Box>
    )
}

export default Offers