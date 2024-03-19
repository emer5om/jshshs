
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import NewItems from '@/component/Products/NewItems'
import Categories from '@/views/Categories';
import { Box } from '@mui/joy'
import React from 'react'
import CategoriesPage from "@/app/categories/Categories";

export const metadata = {
    title: "Food Categories | eRestro Single vendor",
    description: "Food Categories, eRestro single vendor, orders foods and stuff ",
};


const page = () => {
    return (
        <Box>
            <Box>
                <BreadCrumb page={[{ name: "Categories", link: "#" }]} />
            </Box>
           <CategoriesPage />
        </Box>
    )
}

export default page