import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import PopularDishes from '@/views/PopularDishes';
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
        <BreadCrumb page={[{name:"Popular Dishes", link: "#"}]} />
      </Box>


      <Box my={4}>
          <PopularDishes />
      </Box>

    </Box>
  )
}

export default page