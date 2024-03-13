import React from 'react'
import UserLayout from '../UserLayout';
import { Box, Grid } from '@mui/joy';
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import Favourites from '@/views/Favourites';
import Coupons from '@/views/Coupons';


export const metadata = {
    title: "Redeem Coupons | eRestro Single vendor",
    description: "Redeem Coupons for food items, eRestro single vendor, orders foods and stuff ",
};


const page = () => {
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

export default page