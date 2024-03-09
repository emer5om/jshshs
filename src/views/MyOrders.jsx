"use client";

import React from 'react'
import { Box  } from '@mui/joy';
import UserOrderCard from '@/component/Cards/UserOrderCard';


// icons

const MyOrders = () => {
  return (
    <Box>
        <Box my={4}>
        <UserOrderCard />
        </Box>
    </Box>
  )
}

export default MyOrders