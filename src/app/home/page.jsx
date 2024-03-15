
"use client"
import React, {useEffect} from 'react'

import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import HomePage from "@/app/home/homepage";
import {changeBranchId} from "@/events/actions";


const page = () => {
  useEffect(() => {
    changeBranchId({branch_id:7})
  }, [])
  return <HomePage/>
}

export default page