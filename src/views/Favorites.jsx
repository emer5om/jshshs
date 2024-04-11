"use client";
import React, { useState, useEffect } from "react";
import ProductCards from "@/component/Cards/ProductCards";
import { Grid } from "@mui/joy";

// routes(APIs)
import { getFavorites } from "@/interceptor/routes";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../store/reducers/favoritesSlice";
import FavItems from "../component/Cards/FavItems";
import { getUserData } from "@/events/getters";

const Favorites = ({ data }) => {
  const branchData = useSelector((state) => state.branch);
  const favorites = useSelector((state) => state.favorites)?.value;
  const userData = getUserData();

  const [favoriteItems, setFavoriteItems] = useState([]);
  const branch_id = branchData.id;
  const dispatch = useDispatch();

  const authentication = userData === false ? false : true;

  const get_favorites = async () => {
    try {
      const favorites = await getFavorites({ branch_id });
      dispatch(setFavorites(favorites.data));
      setFavoriteItems(favorites.data);
    } catch (error) {
      console.error("error in fav:", error);
    }
  };

  // Fetch user's favorites when the component mounts
  useEffect(() => {
    if (authentication === false) {
      // return toast.error("Please Login First!");
      setFavoriteItems([]);
      dispatch(setFavorites([]));
    } else {
      get_favorites();
    }
  }, [authentication]);

  // useEffect(() => {
  //   get_favorites();
  // }, []);

  const handleRemove = (id) => {
    try {
      // Filter out the removed item from the Redux state
      const updatedFavorites = favorites.filter((item) => item.id !== id);
      dispatch(setFavorites(updatedFavorites));
      setFavoriteItems(updatedFavorites);
    } catch (error) {
      console.error("Error in handleRemove:", error);
    }
  };

  return (
    <Grid container gap={2}>
      <FavItems data={favoriteItems} handleRemove={handleRemove} />
    </Grid>
  );
};

export default Favorites;
