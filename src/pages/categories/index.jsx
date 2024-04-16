
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import { Box } from '@mui/joy'
import React from 'react'
import CategoriesPage from "@/pages/categories/Categories";
import {useTranslation} from "react-i18next";



const index = () => {
    const {t} = useTranslation()
    console.log("categories index.jsx");
    return (
        <Box>
            <Box>
                {/* <BreadCrumb page={[{ name: t("categories"), link: "#" }]} /> */}
            </Box>
           <CategoriesPage />
        </Box>
    )
}

export default index