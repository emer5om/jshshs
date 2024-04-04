"use client";
import React from 'react'
// import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
// import Products from '@/views/Products';
import { Box } from '@mui/joy';
import { HeadTitle } from "@/component/HeadTitle";
import { useTranslation } from "react-i18next";

import dynamic from "next/dynamic";
// import Header from "@/component/Header/Header";
const Products = dynamic(() => import("@/views/Products"), {
  ssr: false
});


const BreadCrumb = dynamic(() => import("@/component/BreadCrumb/BreadCrumb"), {
  ssr: false
});

const index = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <HeadTitle title={"products"} />

      <Box>
        <BreadCrumb page={[{ name: t("our-products"), link: "#" }]} />

      </Box>


      <Box>
        <Products />
        {/* <NewItems data={newProducts} showMore={false}></NewItems> */}
      </Box>
    </Box>
  )
}

export default index