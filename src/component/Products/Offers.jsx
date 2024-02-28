"use client";

import { Box, Grid } from '@mui/joy';
import React from 'react'
import SectionHeading from '../SectionHeading/SectionHeading';
import { OfferCards } from '../Cards/OfferCards';

const Offers = () => {
    return (
        <Box>

            <Box my={4}>
                <SectionHeading title={"Foods On Offer"} showMore={true} showMoreLink='#' />
            </Box>

            <Box>
                <Grid container spacing={2} sx={{ flexGrow: 1 }} >
                    <Grid xs={3}>
                        <OfferCards />
                    </Grid>
                </Grid>
            </Box>

        </Box>
    )
}

export default Offers