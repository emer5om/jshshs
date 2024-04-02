"use client"
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import PopularDishes from '@/views/PopularDishes';
import { Box } from '@mui/joy'
import React from 'react'
import {HeadTitle} from "@/component/HeadTitle";
import Products from "@/views/Products";

const index = () => {
    
  return (
    <Box>
        <HeadTitle title={"popular-dishes"} />
      <Box>
        <BreadCrumb page={[{name:"Popular Dishes", link: "#"}]} />
      </Box>


      <Box my={4}>
          <Products />
      </Box>

    </Box>
  )
}

export default index