import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import Filter from '@/component/Filter/Filter';
import { Box } from '@mui/joy'
import React from 'react'

export const metadata = {
  title: "Popular Dishes | eRestro Single vendor",
  description: "Our Popular Dishes, eRestro single vendor, orders foods and stuff ",
};

const page = () => {
  return (
    <Box>
      <Box>
        <BreadCrumb page={["Popular Dishes"]} />
      </Box>


      <Box my={4}>

        <Box>
          {/* Filter */}
          <Filter />
        </Box>


      </Box>

    </Box>
  )
}

export default page