"use client";

import { Box, Grid } from '@mui/joy';
import React from 'react'
import SectionHeading from '../SectionHeading/SectionHeading';
import SpecificCategory from '../Cards/SpecificCategory';

const SpecificItem = ({ data }) => {
    return (
        <Box>
            <Box my={4}>
                <SectionHeading title={"Burgers"} showMore={true} showMoreLink='#' />
            </Box>

            <Box>
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    {data.map((item, index) => {
                        return (
                            <Grid xs={12} md={3} key={index}>
                                <SpecificCategory image={item.image} title={item.title} discountedPrice={item.discountedPrice} price={item.price} 
                                ratings={parseFloat(item.ratings)}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </Box>
    )
}

export default SpecificItem