import React from 'react'
import { Box } from '@mui/joy';
import Offers from '@/component/Products/Offers';
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';

export const metadata = {
    title: "Foods on Offer | eRestro Single vendor",
    description: "Foods On Offer, eRestro single vendor, orders foods and stuff ",
};

const offerFoodData = [
    {
        image: "/images/demo-images/offer-food-1.png",
        title: "Meat Sandwich",
        discount: "10",
        price: "10.00",
    },
    {
        image: "/images/demo-images/offer-food-2.png",
        title: "Cheesy Pizza",
        discount: "10",
        price: "50.60",
    },
    {
        image: "/images/demo-images/offer-food-3.png",
        title: "Hot & Spicy Maggie",
        discount: "5",
        price: "8.60",
    },
    {
        image: "/images/demo-images/offer-food-2.png",
        title: "Margherita Pizza",
        discount: "10",
        price: "50.60",
    },
    {
        image: "/images/demo-images/offer-food-4.png",
        title: "Veg Biryani",
        discount: "15",
        price: "15.90",
    },
    {
        image: "/images/demo-images/offer-food-2.png",
        title: "Mexican Pizza",
        discount: "10",
        price: "50.60",
    },
    {
        image: "/images/demo-images/offer-food-3.png",
        title: "Hot & Spicy Maggie",
        discount: "5",
        price: "8.60",
    },
    {
        image: "/images/demo-images/offer-food-2.png",
        title: "Margherita Pizza",
        discount: "10",
        price: "50.60",
    },
    {
        image: "/images/demo-images/offer-food-4.png",
        title: "Veg Biryani",
        discount: "15",
        price: "15.90",
    },
    {
        image: "/images/demo-images/offer-food-2.png",
        title: "Mexican Pizza",
        discount: "10",
        price: "50.60",
    },
    {
        image: "/images/demo-images/offer-food-2.png",
        title: "Margherita Pizza",
        discount: "10",
        price: "50.60",
    },
    {
        image: "/images/demo-images/offer-food-4.png",
        title: "Veg Biryani",
        discount: "15",
        price: "15.90",
    },
    {
        image: "/images/demo-images/offer-food-2.png",
        title: "Mexican Pizza",
        discount: "10",
        price: "50.60",
    },
    {
        image: "/images/demo-images/offer-food-2.png",
        title: "Margherita Pizza",
        discount: "10",
        price: "50.60",
    },
    {
        image: "/images/demo-images/offer-food-4.png",
        title: "Veg Biryani",
        discount: "15",
        price: "15.90",
    },
    {
        image: "/images/demo-images/offer-food-2.png",
        title: "Mexican Pizza",
        discount: "10",
        price: "50.60",
    },
];

const page = () => {
    return (
        <Box>
            <Box>
                <BreadCrumb page={[{name:"Foods On Offer", link: "#"}]} />
            </Box>


            <Box>
                <Offers data={offerFoodData} showMore={false}></Offers>
            </Box>
        </Box>
    )
}

export default page