"use client";
import React, { useEffect } from "react";

import { Box, Container, Grid, Typography } from "@mui/joy";

import HeadSlider from "@/component/Sliders/HeadSlider";
import Category from "@/component/Categories/Category";
import PopularCards from "@/component/Cards/PopularCards";
import DealsCards from "@/component/Cards/DealsCards";
import ActiveOrders from "@/component/UserActivity/ActiveOrders";
import Suggestions from "@/component/UserActivity/Suggestions";
import DelightfulDishes from "@/component/Products/DelightfulDishes";
import Offers from "@/component/Products/Offers";
import NewItems from "@/component/Products/NewItems";

import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { formatePrice } from "@/helpers/functonHelpers";
import SearchModal from "@/component/Modals/SearchModal";
import { useSelector } from "react-redux";
import { isLogged } from "@/events/getters";
import { HeadTitle } from "@/component/HeadTitle";
import MobileAppSection from "@/component/AppDownload";
import { useTranslation } from "react-i18next";
import { useLoadScript } from "@react-google-maps/api";

const HomePage = () => {


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
    libraries: ["places"],
  });
  

  const authStoreData = useSelector((state) => state.authentication);

  const homeStoreData = useSelector((state) => state.homepage);

  
  const layoutDirection = useSelector((state) => state.rtl.layoutDirection);


  console.log("inside index.js",layoutDirection);

  useEffect(() => {
    document.documentElement.setAttribute('dir', layoutDirection); // Update HTML dir attribute
  }, [])




  

  if (!isLoaded) {
    console.log("Map is not loaded yet");
    return null; 
  }

  return (
    <Box>
      <HeadTitle title={"home"} />
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <SearchModal displayStyle={"search"} />
      </Box>
      <HeadSlider images={homeStoreData.banner} />

      <Box mt={4}>
        <Category />
      </Box>

      {homeStoreData.offers.length != 0 && (
        <Box>
          <DealsCards link={"#"} images={homeStoreData.offers} />
        </Box>
      )}

      {/* Delightful Dishes */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <DelightfulDishes
          data={homeStoreData.delightfullSections}
        ></DelightfulDishes>
      </Box>
      {homeStoreData.sections.map((val) => {
        if (val.product_type == "new_added_foods") {
          return (
            <Box key={val.id}>
              <NewItems data={val}></NewItems>
            </Box>
          );
        }
        return (
          <Box key={val.id}>
            <Offers data={val}></Offers>
          </Box>
        );
      })}

      <MobileAppSection />

      {/* <Box>*/}
      {/*    <SpecificItem data={specificProductData} />*/}
      {/*</Box> */}
    </Box>
  );
};

export default HomePage;
