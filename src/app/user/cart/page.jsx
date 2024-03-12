import React from 'react'
import UserLayout from '../UserLayout';
import { Box } from '@mui/joy';
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import Favourites from '@/views/Favourites';
import ViewCart from '@/views/ViewCart';


export const metadata = {
    title: "My Cart | eRestro Single vendor",
    description: "My Cart Items, eRestro single vendor, orders foods and stuff ",
};

const page = () => {
    return (
        <Box width={"100%"}>
            <Box mb={4}>
                <BreadCrumb page={[{ name: "My Cart", link: "#" }]} />
            </Box>


            <Box my={4}>
                <ViewCart />
            </Box>
        </Box>
    )
}

export default page