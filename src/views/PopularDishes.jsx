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
        // You can perform any other logic or state updates here
    };

    const onViewChangeWrapper = (alignment) => {

        setView(alignment)
        handleViewChange(alignment);
    };

    const onCategorySelection = (value, text) => {
     
    };

    const onTypeSelection = (value) => {
    };

    const onPriceSelection = (value) => {
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