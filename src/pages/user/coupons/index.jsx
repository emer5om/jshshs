"use client"
import React from 'react'
import { Box, Grid } from '@mui/joy';
import dynamic from "next/dynamic";

import Coupons from '@/views/Coupons';
import {validateView} from "@/helpers/authGuard";

const BreadCrumb = dynamic(() => import("@/component/BreadCrumb/BreadCrumb"), {
    ssr: false
  });


const index = () => {
    return (
        <Box width={"100%"}>
            <Box mb={4}>
                <BreadCrumb page={[{ name: "My Cart", link: "/user/cart" }, { name: "Add Coupon", link: "#" }]} />
            </Box>


            <Box>
                <Coupons />

            </Box>
        </Box>
    )
}

export default validateView(index)