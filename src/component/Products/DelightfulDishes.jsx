"use client";

import { Box, Grid } from "@mui/joy";
import React, { useEffect, useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import ProductCards from "../Cards/ProductCards";
import { useTranslation } from "react-i18next";
import ListCards from "../Cards/ListCards";
import { getFavorites, } from "@/interceptor/routes";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "@/store/reducers/favoritesSlice";

// todo: add API data here

const DelightfulDishes = ({ data }) => {
  const branchData = useSelector((state) => state.branch);
  const branch_id = branchData.id;
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites)?.value;

  const [favoriteItems, setFavoriteItems] = useState([]);

  // Fetch user's favorites when the component mounts
  useEffect(() => {
    async function fetchFavorites() {
      try {
        const favorites = await getFavorites({ branch_id });
        setFavoriteItems(favorites.data);
        console.log(favorites.data);
        console.log("favorites.data");
        dispatch(setFavorites(favorites.data));

      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }

    fetchFavorites();
  }, []);

  
  const handleRemove = (id) => {
    try {
      console.log("inside handleRemove");
      console.log("id => ", id);

      // Filter out the removed item from the Redux state
      const updatedFavorites = favorites.filter((item) => item.id !== id);
      console.log("Updated favorites:");
console.log(favorites);
      dispatch(setFavorites(updatedFavorites));
      console.log("Updated favorites:");
      setFavoriteItems(updatedFavorites);
      console.log(updatedFavorites);
    } catch (error) {
      console.error("Error in handleRemove:", error);
    }
  };

  const { t } = useTranslation();
  return (
    <Box my={2} display={"flex"} flexDirection={"column"} gap={2}>
      <SectionHeading
        title={t("delightfull-dishes")}
        showMore={true}
        showMoreLink="/products"
      />

      <Box mt={4}>
        <Grid container spacing={2}>
          {/* <ListCards data={data} /> */}
          {data.map((item, index) => {
            const discount = item.min_max_price.discount_in_percentage;

            console.log(item);
            return (
              <Grid xs={12} md={6} lg={4} key={index}>
                <ProductCards
                  image={item.image_sm}
                  id={item.id}
                  discount={discount}
                  specialPrice={item.variants[0].special_price != 0}
                  categoryName={item.category_name}
                  title={item.name}
                  data={favoriteItems}
                  handleRemove={handleRemove}
                  discountedPrice={
                    item.variants[0].special_price != 0
                      ? item.variants[0].special_price
                      : item.variants[0].price
                  }
                  price={item.variants[0]?.price}
                  type={item.type}
                  product={item}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default DelightfulDishes;
