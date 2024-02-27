import React from 'react'
import { Button, Box } from '@mui/joy';
import HeadSlider from "@/component/Sliders/HeadSlider"
import Category from "@/component/Categories/Category"

const Home = () => {
  return (
    <Box>
      <Box>
        <HeadSlider images={[
          "/images/slider_1.png",
          "/images/slider_2.png",
          "/images/slider_3.png",
        ]} />
      </Box>

      <Box mt={6}>
        <Category />
      </Box>
    </Box>
  )
}

export default Home