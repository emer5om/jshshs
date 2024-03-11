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

const data = [
    {
        image: "/images/demo-images/salad-1.png",
        id: "001",
        dateTime: "02, August 2023 03:06 PM",
        status: "pending",
        type: "veg",
        qty: "1",
        name: "Indian Punjabi Cuisine Thali ( 750 GM )",
        amount: "100.50"
    },
    {
        image: "/images/demo-images/salad-1.png",
        id: "002",
        dateTime: "02, August 2023 03:06 PM",
        status: "preparing",
        type: "veg",
        qty: "1",
        name: "Item Name",
        amount: "100.50"
    },
    {
        image: "/images/demo-images/salad-1.png",
        id: "002",
        dateTime: "02, August 2023 03:06 PM",
        status: "delivered",
        type: "veg",
        qty: "1",
        name: "Item Name",
        amount: "100.50"
    },
    {
        image: "/images/demo-images/salad-1.png",
        id: "002",
        dateTime: "02, August 2023 03:06 PM",
        status: "cancelled",
        type: "veg",
        qty: "1",
        name: "Item Name",
        amount: "100.50"
    },
    {
        image: "/images/demo-images/salad-1.png",
        id: "002",
        dateTime: "02, August 2023 03:06 PM",
        status: "confirmed",
        type: "veg",
        qty: "1",
        name: "Item Name",
        amount: "100.50"
    },
    {
        image: "/images/demo-images/salad-1.png",
        id: "002",
        dateTime: "02, August 2023 03:06 PM",
        status: "out for delivery",
        type: "veg",
        qty: "1",
        name: "Item Name",
        amount: "100.50"
    },
]

const page = () => {

    return (
        <Box width={"100%"}>
            <Box mb={4}>
                <BreadCrumb page={[{ name: "My Profile", link: "/user/profile" }, { name: "My Orders", link: "#" }]} />
            </Box>


            <UserLayout>
                <MyOrders data={data} />
            </UserLayout>
        </Box>
    )
}

export default page