"use client";

import ProductCards from '@/component/Cards/ProductCards';
import { Grid } from '@mui/joy';
import React from 'react'

const Favourites = ({ data }) => {
  return (
    <Grid container  gap={2}>
      {data.map((item, index) => {
        return (
          <Grid xs={12} md={4} key={index}>
            <ProductCards image={item.image} discount={item.discount} categoryName={item.categoryName} title={item.title} discountedPrice={item.discountedPrice} price={item.price} type={item.type} isLiked={item.isLiked}/>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Favourites