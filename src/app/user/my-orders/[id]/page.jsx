import React from 'react'
import { Box } from '@mui/joy'
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb'
import Address from '@/views/Address';
import MyOrders from '@/views/MyOrders';
import UserLayout from '../../UserLayout';
import OrderDetails from '@/views/OrderDetails';


export const metadata = {
    title: "Your Order's Details | eRestro Single vendor",
    description: "Your Order's Details, eRestro single vendor, orders foods and stuff ",
};



export async function generateStaticParams() {
    const posts = [
        { id: "1" },
        { id: "2" },
        { id: "3" },
        { id: "4" },
    ]

    return posts.map((post) => ({
        id: post.id,
    }))
}

export default function ({ params }) {

    return (
        <Box width={"100%"}>
            <Box mb={4}>
                <BreadCrumb page={[{ name: "My Profile", link: "/user/profile" }, { name: "My Orders", link: "/user/my-orders" }, { name: "Order Details", link: "#" }]} />
            </Box>


            <UserLayout>
                <OrderDetails />
            </UserLayout>
        </Box>
    )
}

