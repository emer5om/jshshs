"use client"
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import NewItems from '@/component/Products/NewItems'
import Categories from '@/views/Categories';
import { Box } from '@mui/joy'
import React, {useEffect, useState} from 'react'
import api from "@/interceptor/api";
import {HeadTitle} from "@/component/HeadTitle";




const CategoriesPage = () => {
    const initialQuery = {
        limit: 500,
        offset: 0
    }
    const [query, setQuery] = useState(initialQuery)
    const [result, setResult] = useState([])

    const request = () => {
        const formData = new FormData()
        Object.keys(query).map(item => {
            formData.append(item, query[item])
        })
        formData.append("branch_id", "7")
        api.post("/get_categories", formData).then(res => {
            setResult(res.data.data)
        })
    }
    useEffect(() => {
        request()
    }, [query])



    return (
        <Box>

            <HeadTitle title={"categories"} />


            <Categories data={result} />
            <Box  my={4}>
            </Box>
        </Box>
    )
}

export default CategoriesPage