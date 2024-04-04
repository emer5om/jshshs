"use client"
import NewItems from '@/component/Products/NewItems'
import Categories from '@/views/Categories';
import { Box } from '@mui/joy'
import React, {useEffect, useState} from 'react'
import api from "@/interceptor/api";
import {HeadTitle} from "@/component/HeadTitle";




const CategoriesPage = () => {





    return (
        <Box>
 

            <HeadTitle title={"categories"} />


            <Categories  />
            <Box  my={4}>
            </Box>
        </Box>
    )
}

export default CategoriesPage