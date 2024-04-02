"use client";
import CategoryCards from '@/component/Cards/CategoryCards';
import { Box, Grid } from '@mui/joy';
import React from 'react'


const Categories = ({ data }) => {
    return (

        <Grid container maxWidth="100%" my={2} rowGap={0} spacing={2}>
        {data.length === 0 ? (
            <Grid item xs={12} textAlign="center" maxHeight={"600px"}  >
                <img src={"/categaory.png"} alt="No Data" style={{ maxHeight: "600px"}} />
            </Grid>
        ) : (
            data.map((item, index) => (
                <Grid item xs={6} md={2} key={index}>
                    <CategoryCards
                        image={item.image}
                        title={item.name}
                        count={item.count}
                        slug={item.slug}
                    />
                </Grid>
            ))
        )}
    </Grid>

     
    )
}

export default Categories