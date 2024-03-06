import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import NewItems from '@/component/Products/NewItems'
import { Box } from '@mui/joy'
import React from 'react'


const newProducts = [
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
        image: "/images/demo-images/new-items-1.jpeg",
        title: "Spring Rolls",
        discount: "5",
        price: "50.60",
    },
    {
        image: "/images/demo-images/new-items-2.jpeg",
        title: "Mix Salad",
        discount: "7",
        price: "20.60",
    },
    {
        image: "/images/demo-images/new-items-3.jpeg",
        title: "Arabic Items",
        discount: "9",
        price: "120.60",
    },
    {
        image: "/images/demo-images/new-items-4.jpeg",
        title: "Grilled Veggies & Paneer",
        discount: "19",
        price: "150.60",
    },
    {
        image: "/images/demo-images/new-items-6.png",
        title: "Hot & Spicy Biryani",
        discount: "15",
        price: "140.60",
    },
];

const page = () => {
    return (
        <Box>
            <Box>
                <BreadCrumb page={[{name:"Foods On Offer", link: "#"}]} />
            </Box>


            <Box>
                <NewItems data={newProducts} showMore={false}></NewItems>
            </Box>
        </Box>
    )
}

export default page