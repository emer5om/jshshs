"use client";

import React, { useState } from 'react'
import { Box } from '@mui/joy';
import Filter from '@/component/Filter/Filter';
import PopularCards from '@/component/Cards/PopularCards';
import ListCards from '@/component/Cards/ListCards';



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
                    <PopularCards data={[]} showHeadline={false} />
                    :
                    <ListCards data={[]} />
                }
            </Box>


        </Box>
    )
}

export default PopularDishes