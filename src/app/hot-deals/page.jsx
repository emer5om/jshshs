import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import ViewDeals from '@/component/Cards/ViewDeals';
import { Box } from '@mui/joy';
import React from 'react'



export const metadata = {
    title: "Hot Deals | eRestro Single vendor",
    description: "Our Hot Deals, eRestro single vendor, orders foods and stuff ",
};


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

const page = () => {
    return (
        <Box>
            <Box>
                <BreadCrumb page={["Hot Deals"]} />
            </Box>


            <Box>
                <ViewDeals link={"#"} images={hotDeals} />
            </Box>
        </Box>
    )
}

export default page