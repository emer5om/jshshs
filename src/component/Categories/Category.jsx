"use client";

import { Box, Typography, Grid } from '@mui/joy';
import React from 'react'
import SectionHeading from "../SectionHeading/SectionHeading"
import CategoryCards from "../Cards/CategoryCards"


// const data = [{image: ""}]

const Category = ({ data }) => {
    return (
        <Box>

            {/* Heading */}
            <Box display={"flex"} flexDirection={"column"}>
                <Box>
                    <SectionHeading title={"Cuisine Crafted with care"} />
                </Box>

                <Grid container spacing={2} my={5}>
                    {data.map(item => {
                        return (
                            <Grid xs={4} md={2}>
                                <Box >
                                    <CategoryCards image={item.image} title={item.title} count={item.count} />
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>


        </Box>
    )
}

export default Category