
"use client"
import React, {useEffect} from 'react'

import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import {useRouter} from "next/router";

import dynamic from 'next/dynamic';
import {getBranchId} from "@/events/getters";
const HomePage = dynamic(() => import('@/views/homepage'), {
  ssr: false
});




const Home = () => {
  return <HomePage/>
}

export default Home