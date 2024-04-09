"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  addToFavorite,
  getFavorites,
  get_products,
  removeFromFavorite,
} from "@/interceptor/routes";
import { Box, Button } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import PopularCards from "@/component/Cards/PopularCards";
import ListCards from "@/component/Cards/ListCards";
import Filter from "@/component/Filter/Filter";
import { setFavorites } from "@/store/reducers/favoritesSlice";
import Pagination from "replace-js-pagination";
import { useTranslation } from "react-i18next";
import Skeleton from "@/component/Skeleton/Skeleton";
import { getUserData } from "@/events/getters";

const Products = ({ categoryId = 0 }) => {
  const { t } = useTranslation();
  const favorites = useSelector((state) => state.favorites)?.value;

  const branchData = useSelector((state) => state.branch);

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
  const [activePage, setActivePage] = useState(1);
  const [initialLimit, setInitialLimit] = useState(12); // Initial limit for the "Load More" feature
  const [end, setEnd] = useState(false);
  const dispatch = useDispatch();

  const [favoriteItems, setFavoriteItems] = useState([]);
  const userData = getUserData();

  const authentication = userData === false ? false : true;

  const branch_id = branchData.id;
  const [indeterminate, setIndeterminate] = useState(false);

  // Fetch user's favorites when the component mounts
  useEffect(() => {
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
  }, []);

  const getProducts = async () => {
    try {
      const products = await get_products({
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
      if (products.data.length > 0) {
        if (products.data.length !== initialLimit) {
          setEnd(true);
        }
        setTotal(products.total);
        setProducts(products.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("error while fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [offset, search, vegetarian, category_id, order, initialLimit]);

  const handleViewChange = (alignment) => {
    // Do something with the alignment value
    // You can perform any other logic or state updates here
  };

  const onViewChangeWrapper = (alignment) => {
    setView(alignment);
    handleViewChange(alignment);
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

  const handleFavChange = useCallback(
    async (value, id) => {
      if (authentication === false) {
        return toast.error("Please Login First!");
      }

      setIndeterminate(true);
      if (value) {
        const add_fav = await addToFavorite({ type_id: id, branch_id });
        setIndeterminate(false);

        if (add_fav.error) {
          toast.error(add_fav.message);
        } else {
          toast.success(add_fav.message);
        }
      } else {
        const removeFav = await removeFromFavorite({ type_id: id, branch_id });
        setIndeterminate(false);

        if (removeFav.error) {
          toast.error(removeFav.message);
        } else {
          toast.success(removeFav.message);
          handleRemove(id);
        }
      }
    },
    [branch_id]
  );



  const handleLoadMore = () => {
    setInitialLimit(initialLimit + 12); // Increase the initialLimit by 10 (or any other desired value)
    // setOffset(offset + initialLimit); // Update the offset based on the current offset and initialLimit
  };


  const updateFavoriteItems = (id, isFavorite) => {
    setFavoriteItems((prevFavoriteItems) => {
      if (isFavorite) {
        // If the item is being marked as favorite, add it to the favoriteItems array
        return [...prevFavoriteItems, { id, is_favorite: 1 }];
      } else {
        // If the item is being removed from favorites, filter it out from the favoriteItems array
        return prevFavoriteItems.filter((item) => item.id !== id);
      }
    });
  };


  return (
    <Box>
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
                handleFavChange={handleFavChange}
                showHeadline={false}
                updateFavoriteItems={updateFavoriteItems}
                handleAdd={handleAdd}

              />
            ) : (
              <ListCards
                favoriteItems={favoriteItems}
                handleFavChange={handleFavChange}
                handleRemove={handleRemove}
                data={products}
                updateFavoriteItems={updateFavoriteItems}
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
