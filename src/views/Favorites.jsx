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

const Favorites = ({ data }) => {
  const branchData = useSelector((state) => state.branch);
  const favorites = useSelector((state) => state.favorites)?.value;
  const [favoriteItems, setFavoriteItems] = useState([]);
  const branch_id = branchData.id;
  const dispatch = useDispatch();

  const get_favorites = async () => {
    try {
      const favorites = await getFavorites({ branch_id });
      dispatch(setFavorites(favorites.data));
      setFavoriteItems(favorites.data);
      // console.log(favorites)
    } catch (error) {
      console.error("error in fav:", error);
    }
  };

  useEffect(() => {
    get_favorites();
  }, []);

  const handleRemove = (id) => {
    const filteredItems = favorites.filter((item) => item.id !== id);


    setFavoriteItems(filteredItems);
    dispatch(setFavorites(filteredItems));
  };

  return (
    <Grid container gap={2}>
      <FavItems data={favoriteItems} handleRemove={handleRemove} />
    </Grid>
  );
};

export default Favorites;
