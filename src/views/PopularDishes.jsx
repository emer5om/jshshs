"use client";

import React, { useState } from 'react'
import { Box } from '@mui/joy';
import Filter from '@/component/Filter/Filter';
import PopularCards from '@/component/Cards/PopularCards';
import ListCards from '@/component/Cards/ListCards';



const popularCardData = [
    {
        category: "salad",
        type: "veg",
        isLiked: false,
        image: "/images/demo-images/salad-1.png",
        title: "Fattoush Salad",
        description: "A refreshing salad with mixed greens, tomatoes, cucumbers, radishes, and crispy pita chips, dressed in a zesty vinaigrette.",
        price: "100.00",
        rating: "5.0",
    },
    {
        category: "noodles",
        type: "veg",
        isLiked: false,
        image: "/images/demo-images/noodles.png",
        title: "Pan-Fried Noodles",
        description: "Delicious stir-fried noodles with a colorful mix of vegetables, seasoned to perfection for a delightful Asian-inspired dish.",
        price: "50.00",
        rating: "4.9",
    },
    {
        category: "burger",
        type: "non-veg",
        isLiked: false,
        image: "/images/demo-images/pizza-1.png",
        title: "Spicy Burger",
        description: "A mouthwatering spicy burger featuring a juicy patty, cheese, lettuce, tomatoes, and a kick of spicy sauce, all in a soft bun.",
        price: "70.00",
        rating: "4.8",
    },
    {
        category: "burger",
        type: "non-veg",
        isLiked: false,
        image: "/images/demo-images/pizza-1.png",
        title: "Spicy Burger",
        description: "Another variation of our popular spicy burger, with an extra layer of cheese and a unique blend of spices for an unforgettable taste.",
        price: "90.00",
        rating: "4.7",
    },
    {
        category: "salad",
        type: "veg",
        isLiked: false,
        image: "/images/demo-images/salad-1.png",
        title: "Fattoush Salad",
        description: "A refreshing salad with mixed greens, tomatoes, cucumbers, radishes, and crispy pita chips, dressed in a zesty vinaigrette.",
        price: "100.00",
        rating: "5.0",
    },
    {
        category: "noodles",
        type: "veg",
        isLiked: false,
        image: "/images/demo-images/noodles.png",
        title: "Pan-Fried Noodles",
        description: "Delicious stir-fried noodles with a colorful mix of vegetables, seasoned to perfection for a delightful Asian-inspired dish.",
        price: "50.00",
        rating: "4.9",
    },
    {
        category: "burger",
        type: "non-veg",
        isLiked: false,
        image: "/images/demo-images/pizza-1.png",
        title: "Spicy Burger",
        description: "A mouthwatering spicy burger featuring a juicy patty, cheese, lettuce, tomatoes, and a kick of spicy sauce, all in a soft bun.",
        price: "70.00",
        rating: "4.8",
    },
    {
        category: "burger",
        type: "non-veg",
        isLiked: false,
        image: "/images/demo-images/pizza-1.png",
        title: "Spicy Burger",
        description: "Another variation of our popular spicy burger, with an extra layer of cheese and a unique blend of spices for an unforgettable taste.",
        price: "90.00",
        rating: "4.7",
    },
    {
        category: "salad",
        type: "veg",
        isLiked: false,
        image: "/images/demo-images/salad-1.png",
        title: "Fattoush Salad",
        description: "A refreshing salad with mixed greens, tomatoes, cucumbers, radishes, and crispy pita chips, dressed in a zesty vinaigrette.",
        price: "100.00",
        rating: "5.0",
    },
    {
        category: "noodles",
        type: "veg",
        isLiked: false,
        image: "/images/demo-images/noodles.png",
        title: "Pan-Fried Noodles",
        description: "Delicious stir-fried noodles with a colorful mix of vegetables, seasoned to perfection for a delightful Asian-inspired dish.",
        price: "50.00",
        rating: "4.9",
    },
    {
        category: "burger",
        type: "non-veg",
        isLiked: false,
        image: "/images/demo-images/pizza-1.png",
        title: "Spicy Burger",
        description: "A mouthwatering spicy burger featuring a juicy patty, cheese, lettuce, tomatoes, and a kick of spicy sauce, all in a soft bun.",
        price: "70.00",
        rating: "4.8",
    },
    {
        category: "burger",
        type: "non-veg",
        isLiked: false,
        image: "/images/demo-images/pizza-1.png",
        title: "Spicy Burger",
        description: "Another variation of our popular spicy burger, with an extra layer of cheese and a unique blend of spices for an unforgettable taste.",
        price: "90.00",
        rating: "4.7",
    },
    {
        category: "salad",
        type: "veg",
        isLiked: false,
        image: "/images/demo-images/salad-1.png",
        title: "Fattoush Salad",
        description: "A refreshing salad with mixed greens, tomatoes, cucumbers, radishes, and crispy pita chips, dressed in a zesty vinaigrette.",
        price: "100.00",
        rating: "5.0",
    },
    {
        category: "noodles",
        type: "veg",
        isLiked: false,
        image: "/images/demo-images/noodles.png",
        title: "Pan-Fried Noodles",
        description: "Delicious stir-fried noodles with a colorful mix of vegetables, seasoned to perfection for a delightful Asian-inspired dish.",
        price: "50.00",
        rating: "4.9",
    },
    {
        category: "burger",
        type: "non-veg",
        isLiked: false,
        image: "/images/demo-images/pizza-1.png",
        title: "Spicy Burger",
        description: "A mouthwatering spicy burger featuring a juicy patty, cheese, lettuce, tomatoes, and a kick of spicy sauce, all in a soft bun.",
        price: "70.00",
        rating: "4.8",
    },
    {
        category: "burger",
        type: "non-veg",
        isLiked: false,
        image: "/images/demo-images/pizza-1.png",
        title: "Spicy Burger",
        description: "Another variation of our popular spicy burger, with an extra layer of cheese and a unique blend of spices for an unforgettable taste.",
        price: "90.00",
        rating: "4.7",
    },
    {
        category: "salad",
        type: "veg",
        isLiked: false,
        image: "/images/demo-images/salad-1.png",
        title: "Fattoush Salad",
        description: "A refreshing salad with mixed greens, tomatoes, cucumbers, radishes, and crispy pita chips, dressed in a zesty vinaigrette.",
        price: "100.00",
        rating: "5.0",
    },
    {
        category: "noodles",
        type: "veg",
        isLiked: false,
        image: "/images/demo-images/noodles.png",
        title: "Pan-Fried Noodles",
        description: "Delicious stir-fried noodles with a colorful mix of vegetables, seasoned to perfection for a delightful Asian-inspired dish.",
        price: "50.00",
        rating: "4.9",
    },
];




const PopularDishes = () => {

    const [view, setView] = useState("gallery")

    const handleViewChange = (alignment) => {
        // Do something with the alignment value
        console.log('Alignment changed to:', alignment);
        // You can perform any other logic or state updates here
    };

    const onViewChangeWrapper = (alignment) => {

        setView(alignment)
        handleViewChange(alignment);
    };

    const onCategorySelection = (value, text) => {
        console.log(value)
        console.log(text)
    };

    const onTypeSelection = (value) => {
        console.log(value)
    };

    const onPriceSelection = (value) => {
        console.log(value)
    };

    return (
        <Box my={4}>

            {/* Filter */}
            <Box>
                <Filter
                    onViewChange={onViewChangeWrapper}
                    onCategorySelect={onCategorySelection}
                    onTypeChange={onTypeSelection}
                    onPriceChange={onPriceSelection}
                    view={view}
                />
            </Box>

            <Box>
                {view === "gallery" ?
                    <PopularCards data={popularCardData} showHeadline={false} />
                    :
                    <ListCards data={popularCardData} />
                }
            </Box>


        </Box>
    )
}

export default PopularDishes