import React from 'react'
import UserLayout from '../UserLayout';
import { Box } from '@mui/joy';
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import Favourites from '@/views/Favourites';


export const metadata = {
    title: "Your Favourite Food Items | eRestro Single vendor",
    description: "Your Favourite Food Items, eRestro single vendor, orders foods and stuff ",
};

const dishesData = [
    {
        image: "/images/demo-images/dish-1.jpeg",
        type: "veg",
        rating: "5.0",
        isLiked: true,
        categoryName: "Healthy Salad",
        title: "Good Food",
        price: 120.0,
        discountedPrice: 100,
        discount: "20%",
    },
    {
        image: "/images/demo-images/dish-2.png",
        type: "non-veg",
        rating: "4.8",
        isLiked: true,
        categoryName: "Pizza",
        title: "Peperoni Pizza",
        price: 100.0,
        discountedPrice: 90,
        discount: "10%",
    },
    {
        image: "/images/demo-images/dish-3.png",
        type: "non-veg",
        rating: "4.9",
        isLiked: true,
        categoryName: "Burger",
        title: "Big MAC",
        price: 100.0,
        discountedPrice: 80,
        discount: "30%",
    },

];

const page = () => {
    return (
        <Box width={"100%"}>
            <Box mb={4}>
                <BreadCrumb page={[{ name: "My Profile", link: "/user/profile" }, { name: "Favourites", link: "#" }]} />
            </Box>


            <UserLayout>
                <Favourites data={dishesData} />
            </UserLayout>
        </Box>
    )
}

export default page