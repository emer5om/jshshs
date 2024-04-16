"use client";

import React, { useState, useEffect } from "react";
import { get_products } from "@/interceptor/routes";
import { Box, Button } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import PopularCards from "@/component/Cards/PopularCards";
import ListCards from "@/component/Cards/ListCards";
import Filter from "@/component/Filter/Filter";
import { setFavorites } from "@/store/reducers/favoritesSlice";
import { useTranslation } from "react-i18next";
import Skeleton from "@/component/Skeleton/Skeleton";
import { getUserData } from "@/events/getters";

import { useRouter } from "next/router";

const Products = ({ categoryId = 0 }) => {
  const { t } = useTranslation();
  const favorites = useSelector((state) => state.favorites)?.value;

  const branchData = useSelector((state) => state.branch);
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [limit, setLimit] = useState(18)
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [category_id, setCategory_id] = useState(categoryId);
  const [vegetarian, setVegetarian] = useState(0);
  const [view, setView] = useState("gallery");
  const [indicatorType, setIndicatorType] = useState("");
  const [order, setOrder] = useState("");
  const filter_by = "pv.price";
  const [initialLimit, setInitialLimit] = useState(12); // Initial limit for the "Load More" feature
  const [end, setEnd] = useState(false);
  const dispatch = useDispatch();

  const [favoriteItems, setFavoriteItems] = useState([]);

  const branch_id = branchData.id;
  const userData = getUserData();

  const authentication = userData === false ? false : true;

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const productResponse = await get_products({
        branch_id,
        limit: initialLimit, // Use initialLimit instead of limit
        offset,
        search,
        vegetarian: vegetarian ?? "",
        category_id: category_id > 0 ? category_id : 0,
        filter_by: order == "" ? "" : filter_by,
        order,
      });

      setIsLoading(false);
      if (productResponse.data.length > 0) {
        if (productResponse.data.length !== initialLimit) {
          setEnd(true);
        }
        setTotal(productResponse.total);
        productResponse.data.map((item) => {
          if (item.is_favorite == "1") {
            handleAdd(item.id);
          }
        });

        setProducts(productResponse.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("error while fetching products:", error);
    }
  };

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

  useEffect(() => {
    getProducts();
  }, [offset, search, vegetarian, category_id, order, initialLimit]);

  const onViewChangeWrapper = (alignment) => {
    setView(alignment);
  };

  const onCategorySelection = (value, text) => {
    setCategory_id(value);
  };

  const onTypeSelection = (value) => {
    if (value == "Veg") {
      setVegetarian(1);
      setIndicatorType("Veg");
    } else if (value == "Non - Veg") {
      setVegetarian(2);
      setIndicatorType("Non - Veg");
    } else {
      setVegetarian("");
      setIndicatorType("");
    }
  };

  const onPriceSelection = (value) => {
    if (value == "Low to High") {
      setOrder("asc");
    } else if (value == "High to Low") {
      setOrder("desc");
    } else {
      setOrder("");
    }
  };

  const handleRemove = (id) => {
    try {
      const updatedFavorites = favorites.filter((item) => item.id !== id);
      dispatch(setFavorites(updatedFavorites));
      setFavoriteItems(updatedFavorites);
    } catch (error) {
      console.error("Error in handleRemove:", error);
    }
  };

  const handleAdd = (id) => {
    try {
      // Check if the item is already in the favorites array
      const isItemInFavorites = favorites.some((item) => item.id === id);

      if (!isItemInFavorites) {
        // If the item is not in the favorites array, add it
        const newFavorite = { id, is_favorite: 1 };
        const updatedFavorites = [...favorites, newFavorite];
        dispatch(setFavorites(updatedFavorites));
        setFavoriteItems(updatedFavorites);
      } else {
        console.log("Item is already in favorites");
      }
    } catch (error) {
      console.error("Error in handleAdd:", error);
    }
  };

  const handleLoadMore = () => {
    setInitialLimit(initialLimit + 12); // Increase the initialLimit by 10 (or any other desired value)
    // setOffset(offset + initialLimit); // Update the offset based on the current offset and initialLimit
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      {!isLoading && products !== undefined && products.length > 0 && (
        <Box my={4}>
          <Box sx={{ marginBottom: 3 }}>
            <Filter
              onViewChange={onViewChangeWrapper}
              onCategorySelect={onCategorySelection}
              onPriceChange={onPriceSelection}
              view={view}
              onTypeChange={onTypeSelection}
              indicatorType={indicatorType}
            />
          </Box>

          <Box>
            {view === "gallery" ? (
              <PopularCards
                favoriteItems={favoriteItems}
                handleRemove={handleRemove}
                data={products}
                showHeadline={false}
                handleAdd={handleAdd}
              />
            ) : (
              <ListCards
                favoriteItems={products}
                handleRemove={handleRemove}
                data={products}
                handleAdd={handleAdd}
              />
            )}
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          ></Box>
          {!end && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Button disabled={isLoading} onClick={handleLoadMore}>
                {t("show-more")}
              </Button>
            </Box>
          )}
        </Box>
      )}

      {!isLoading && products !== undefined && products.length === 0 && (
        <Box display={"flex"} justifyContent={"center"}>
          <img
            src={"/product.webp"}
            alt="No Data"
            style={{
              maxHeight: "600px",
              alignSelf: "center",
              justifySelf: "center",
            }}
          />{" "}
        </Box>
      )}

      {isLoading && <Skeleton />}
    </Box>
  );
};

export default Products;
