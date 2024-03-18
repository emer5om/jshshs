"use client"
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import NewItems from '@/component/Products/NewItems'
import Categories from '@/views/Categories';
import { Box } from '@mui/joy'
import React, {useEffect, useState} from 'react'
import api from "@/interceptor/api";



const categoryData = [
    {
        image: "/images/demo-images/category-1.png",
        title: "Main Dish",
        count: "100",
    },
    {
        image: "/images/demo-images/category-2.png",
        title: "Break fast",
        count: "50",
    },
    {
        image: "/images/demo-images/category-3.png",
        title: "Dessert",
        count: "200",
    },
    {
        image: "/images/demo-images/category-4.png",
        title: "Chinese Food",
        count: "25",
    },
    {
        image: "/images/demo-images/category-5.png",
        title: "South Indian",
        count: "30",
    },
    {
        image: "/images/demo-images/category-6.png",
        title: "Beverages",
        count: "300",
    },
    {
        image: "/images/demo-images/category-1.png",
        title: "Main Dish",
        count: "100",
    },
    {
        image: "/images/demo-images/category-2.png",
        title: "Break fast",
        count: "50",
    },
    {
        image: "/images/demo-images/category-3.png",
        title: "Dessert",
        count: "200",
    },
    {
        image: "/images/demo-images/category-4.png",
        title: "Chinese Food",
        count: "25",
    },
    {
        image: "/images/demo-images/category-1.png",
        title: "Main Dish",
        count: "100",
    },
    {
        image: "/images/demo-images/category-2.png",
        title: "Break fast",
        count: "50",
    },
    {
        image: "/images/demo-images/category-3.png",
        title: "Dessert",
        count: "200",
    },
    {
        image: "/images/demo-images/category-4.png",
        title: "Chinese Food",
        count: "25",
    },
];


const CategoriesPage = () => {
    const initialQuery = {
        limit: 10,
        offset: 0

    }
    const [query, setQuery] = useState(initialQuery)
    Object.keys()
    const request = () => {

        api.post("/get_categories", )
    }
    useEffect(() => {
        request()
    })



    return (
        <Box>



            <Categories data={categoryData} />
            <Box>Show More</Box>
            <Box  my={4}>
            </Box>
        </Box>
    )
}

export default CategoriesPage