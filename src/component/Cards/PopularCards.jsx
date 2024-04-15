"use client";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Grid,
  Checkbox,
  IconButton,
  styled,
  AspectRatio,
} from "@mui/joy";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import { useTheme } from "@mui/joy/styles";
import Image from "next/image"; // Import the optimized Image component from Next.js
import ProductModal from "../Modals/ProductModal";
// Components
import CustomButton from "../Buttons/CustomButton";
import { setFavorites } from "@/store/reducers/favoritesSlice";

// icons
import { RiHeartFill, RiHeartLine, RiStarFill } from "@remixicon/react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite, getFavorites, removeFromFavorite } from "@/interceptor/routes";
import toast from "react-hot-toast";
import { formatePrice } from "@/helpers/functonHelpers";
import { getUserData } from "@/events/getters";
import { useTranslation } from "react-i18next";

const PopularCards = React.memo(
  ({  data, showHeadline = "true" }) => {
    const theme = useTheme();
    const authStoreData = useSelector((state) => state.authentication).isLogged;
    const dispatch = useDispatch();

    const userData = getUserData();

    const { t } = useTranslation();
    const branchData = useSelector((state) => state.branch);
  
    const branch_id = branchData.id;
    const [indeterminate, setIndeterminate] = useState(false);


    const authentication = userData === false ? false : true;
  
    const favorites = useSelector((state) => state.favorites)?.value;
  
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
  
    
    useEffect(() => {
      if (authentication == false) {
              // return toast.error("Please Login First!");
            setFavoriteItems([])
            dispatch(setFavorites([]));
            setCheckedItems({})
            } else{
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
        if (userData !== false) {
          const initialCheckedItems = favoriteItems.reduce((acc, item) => {
            acc[item.id] = item.is_favorite == 1;
            return acc;
          }, {});
          setCheckedItems(initialCheckedItems);
        }
        
      }, [favoriteItems]);
    
    
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
      


    const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
      "& .MuiCheckbox-checkbox": {
        // Add your custom styles here
        padding: 0,
        border: "none",
        backgroundColor: theme.palette.primary[400],
        "&:hover": {
          backgroundColor: theme.palette.primary[400],
        },
      },
    }));



    const handleFavChange = useCallback(
      async (value, id) => {
        if (authentication == false) {
          return toast.error("Please Login First!");
        }

        try {
          if (value) {
            // Assuming addToFavorite returns an object with either 'error' or 'message' properties
            const add_fav = await addToFavorite({ type_id: id, branch_id });
            if (add_fav.error) {
              toast.error(add_fav.message);
            } else {
              toast.success(add_fav.message);
              handleAdd(id);
            }
          } else {
            // Assuming removeFromFavorite returns an object with either 'error' or 'message' properties
            const removeFav = await removeFromFavorite({
              type_id: id,
              branch_id,
            });
            if (removeFav.error) {
              toast.error(removeFav.message);
            } else {
              toast.success(removeFav.message);
              handleRemove(id);
            }
          }
        } catch (error) {
          console.error("Error:", error);
          // Handle errors appropriately, e.g., display an error toast
          toast.error("An error occurred. Please try again later.");
        } finally {
          setIndeterminate(false);
        }
      },
      [authentication, branch_id, handleAdd, handleRemove]
    );

    const handleCheckboxChange = useCallback(
        (id, checked) => {
          if (authentication === false) {
            return toast.error("Please Login First!");
          }
      
          setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [id]: checked,
          }));
          handleFavChange(checked, id);
        },
        [authentication, handleFavChange]
      );
      
  
          
    const renderCards = useMemo(
      () =>
        data.map((item, index) => (
          <Grid xs={12} sm={6} md={3} lg={2} key={index}>
            <Card
              sx={{
                width: "100%",
                p: 0,
                borderRadius: theme.radius.xl,
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? theme.palette.primary[50]
                      : theme.palette.primary[700],
                  "& .img": {
                    transform: "scale(1.07)",
                  },
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                },
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <CardContent>
                <CardActions
                  sx={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box px={1.5} py={1}>
                    <Image
                      src={
                        item.indicator == 1
                          ? "/images/icons/Veg.svg"
                          : "/images/icons/Non_veg.svg"
                      }
                      alt="veg-non-veg.icon"
                      width={18}
                      height={18}
                    />
                  </Box>
                  <Box
                    bgcolor={theme.palette.primary[400]}
                    px={2.5}
                    py={2}
                    sx={{ borderRadius: "0px 16px 0px 42.5px", mt: "-1px" }}
                  >
                    <StyledCheckbox
                      overlay={false}
                      color="warning"
                      checked={checkedItems[item.id] || false}
                      onChange={(e) =>
                        handleCheckboxChange(item.id, e.target.checked)
                      }
                      sx={{
                        backgroundColor: `${theme.palette.primary[400]} !important`,
                      }}
                      uncheckedIcon={
                        <RiHeartLine size={"20px"} color="white" />
                      }
                      checkedIcon={
                        <RiHeartFill
                          size={"20px"}
                          color={theme.palette.danger[500]}
                        />
                      }
                    />
                  </Box>
                </CardActions>

                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  mt={1}
                >
                  <AspectRatio
                    ratio={1}
                    sx={{
                      width: 120,
                      borderRadius: "50%",
                      transition: "transform 0.5s ease-in-out",
                    }}
                    className="img"
                  >
                    <Box
                      width={100}
                      height={100}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      borderRadius={"50%"}
                    >
                      <Box
                        // className='img'
                        component={"img"}
                        src={item.image_sm}
                        srcSet={`${item.image} 2x`}
                        loading="lazy"
                        alt=""
                        borderRadius={"50%"}
                        maxHeight={"100%"}
                        maxWidth={"100%"}
                        sx={{ transition: "transform 0.3s ease-in-out" }} // Smooth transition
                      ></Box>
                    </Box>
                  </AspectRatio>
                </Box>
                <Box
                  p={2}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"start"}
                  justifyContent={"space-between"}
                  gap={1}
                >
                  <Typography
                    fontSize={theme.fontSize.md}
                    fontWeight={theme.fontWeight.lg}
                    sx={{
                      textOverflow: "ellipsis",
                      width: "100%",
                      textWrap: "nowrap",
                      overflow: "hidden",
                      color: theme.palette.text.description,
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    textOverflow={"ellipsis"}
                    overflow={"hidden"}
                    sx={{
                      color: theme.palette.text.description,
                      textWrap: "nowrap",
                    }}
                    fontSize={theme.fontSize.sm}
                    fontWeight={theme.fontWeight.md}
                  >
                    {item.short_description}
                  </Typography>
                  <ProductModal
                    image={item.image_sm}
                    title={item.name}
                    rating={item.rating}
                    description={item.short_description}
                    variants={item.variants}
                    addOns={item.product_add_ons}
                    simple={item.type}
                  />
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    width={"100%"}
                  >
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                      {item.variants && item.variants[0]?.special_price > 0 ? (
                        <Typography
                          sx={{ textDecoration: "line-through" }}
                          textColor={theme.palette.text.currency}
                          fontSize={theme.fontSize.xs}
                          fontWeight={theme.fontWeight.sm}
                        >
                          {formatePrice(item.variants[0]?.price)}
                        </Typography>
                      ) : (
                        ""
                      )}
                      <Typography
                        sx={{ color: theme.palette.text.currency }}
                        fontSize={theme.fontSize.md}
                        fontWeight={theme.fontWeight.lg}
                      >
                        {item.variants &&
                          (item.variants[0]?.special_price > 0
                            ? formatePrice(item.variants[0]?.special_price)
                            : formatePrice(item.variants[0]?.price))}
                      </Typography>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                      <RiStarFill
                        size={theme.fontSize.sm}
                        color={theme.palette.warning[500]}
                      />
                      <Typography
                        fontSize={theme.fontSize.sm}
                        fontWeight={theme.fontWeight.lg}
                      >
                        {item.rating}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )),
      [data, theme, indeterminate, handleFavChange]
    );

    return (
      <Box display={"flex"} flexDirection={"column"}>
        {showHeadline && (
          <SectionHeading
            title={t("popular-dishes")}
            showMore={true}
            showMoreLink="/popular-dishes"
          />
        )}

        <Grid container spacing={2} sx={{ margin: 0 }}>
          {renderCards}
        </Grid>
      </Box>
    );
  }
);

export default PopularCards;
