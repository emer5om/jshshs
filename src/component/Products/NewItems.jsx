"use client";

import { Box, Grid } from "@mui/joy";
import React, { useEffect, useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import { OfferCards } from "../Cards/OfferCards";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "@/events/getters";
import { setFavorites } from "@/store/reducers/favoritesSlice";
import { getFavorites } from "@/interceptor/routes";

const NewItems = ({ data, showMore = true }) => {
  const branchData = useSelector((state) => state.branch);
  const branch_id = branchData.id;

  const dispatch = useDispatch();

  const userData = getUserData();

  const authentication = userData === false ? false : true;

  const favorites = useSelector((state) => state.favorites)?.value;

  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    if (authentication === false) {
      // return toast.error("Please Login First!");
      setFavoriteItems([]);
      dispatch(setFavorites([]));
    } else {
      async function fetchFavorites() {
        try {
          const favorites = await getFavorites({ branch_id });
          setFavoriteItems(favorites.data);
          dispatch(setFavorites(favorites.data));
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      }
      fetchFavorites();
    }
  }, [authentication]);

  const handleRemove = (id) => {
    try {
      console.log("inside handle reomve");
      // Filter out the removed item from the Redux state
      const updatedFavorites = favorites.filter((item) => item.id !== id);
      dispatch(setFavorites(updatedFavorites));
      setFavoriteItems(updatedFavorites);
    } catch (error) {
      console.error("Error in handleRemove:", error);
    }
  };


  return (
    <Box>
      <Box my={4}>
        {showMore && (
          <SectionHeading
            title={data.title}
            showMore={true}
            showMoreLink={
              "/products/" + data.categories + "?title=" + data.title
            }
          />
        )}
      </Box>

      <Box display={"flex"} justifyContent={"center"}>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          {data.product_details.map((item, index) => {
            const discount = item.min_max_price.discount_in_percentage;
            if (index < 8) {
              return (
                <Grid xs={12} md={3} key={index}>
                  <OfferCards
                    image={item.image_sm}
                    title={item.name}
                    product={item}
                    discount={discount}
                    price={item.variants[0].price}
                    specialPrice={
                      item.variants[0].special_price > 0 &&
                      item.variants[0].special_price
                    }
                    shape="rectangle"
                    handleRemove={handleRemove}
                    data={favoriteItems}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default NewItems;
