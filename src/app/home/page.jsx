
"use client"
import React, {useEffect} from 'react'

import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import {changeBranchId} from "@/events/actions";
import dynamic from 'next/dynamic';
const HomePage = dynamic(() => import('@/app/home/homepage'), {
  ssr: false
});



const page = () => {
  useEffect(() => {
    changeBranchId({branch_id:7})
  }, [])
  return <HomePage/>
}

export default page