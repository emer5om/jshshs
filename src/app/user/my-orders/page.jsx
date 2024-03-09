import React from 'react'
import UserLayout from '../UserLayout'
import { Box } from '@mui/joy'
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb'
import Address from '@/views/Address';
import MyOrders from '@/views/MyOrders';


export const metadata = {
    title: "Your Orders | eRestro Single vendor",
    description: "Your Orders, eRestro single vendor, orders foods and stuff ",
};
const page = () => {

    return (
        <Box width={"100%"}>
            <Box mb={4}>
                <BreadCrumb page={[{ name: "My Profile", link: "/user/profile" }, { name: "My Orders", link: "#" }]} />
            </Box>


            <UserLayout>
                <MyOrders />
            </UserLayout>
        </Box>
    )
}

export default page