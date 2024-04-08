"use client";
import NewItems from "@/component/Products/NewItems";
import Categories from "@/views/Categories";
import { Box } from "@mui/joy";
import React, { useEffect, useState } from "react";
import api from "@/interceptor/api";
import { HeadTitle } from "@/component/HeadTitle";
import dynamic from "next/dynamic";
import {useTranslation} from "react-i18next";

const BreadCrumb = dynamic(() => import("@/component/BreadCrumb/BreadCrumb"), {
  ssr: false,
});

const CategoriesPage = () => {
    const {t} = useTranslation()

  return (
    <Box>
      {/* <HeadTitle title={"categories"} /> */}

      <Box mb={4}>
                <BreadCrumb page={[{ name: t("categories"), link: "#" }]} />
            </Box>

      <Categories />
      <Box my={4}></Box>
    </Box>
  );
};

export default CategoriesPage;
