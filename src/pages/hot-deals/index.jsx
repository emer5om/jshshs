"use client"
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import ViewDeals from '@/component/Cards/ViewDeals';
import { Box } from '@mui/joy';
import React from 'react'





const hotDeals = [
    { image: "/images/demo-images/offer-image-1.png", link: "#" },
    { image: "/images/demo-images/offer-image-2.jpg", link: "#" },
    { image: "/images/demo-images/offer-image-3.jpg", link: "#" },
    { image: "/images/demo-images/offer-images-4.jpeg", link: "#" },
    { image: "/images/demo-images/offer-image-1.png", link: "#" },
    { image: "/images/demo-images/offer-image-2.jpg", link: "#" },
    { image: "/images/demo-images/offer-image-3.jpg", link: "#" },
    { image: "/images/demo-images/offer-images-4.jpeg", link: "#" },
];

const index = () => {
    return (
        <Box>
            <Box>
                <BreadCrumb page={[{ name: "Hot Deals", link: "#" }]} />
            </Box>


            <Box>
                <ViewDeals link={"#"} images={hotDeals} />
            </Box>
        </Box>
    )
}

export default index