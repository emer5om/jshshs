"use client";
import CategoryCards from '@/component/Cards/CategoryCards';
import { Box, Grid } from '@mui/joy';
import React from 'react'

const Categories = ({ data }) => {
    return (

        <Grid container maxWidth={"100%"} my={2} rowGap={0} spacing={2}>
            {data.map((item, index) => {
                return (
                    <Grid item xs={6} md={2} key={index} >
                        <CategoryCards image={item.image} title={item.title} count={item.count} />
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default Categories