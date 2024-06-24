"use client";

import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardOverflow,
  Grid,
  Typography,
  useTheme,
  styled,
  Checkbox,
  CardCover,
} from "@mui/joy";
import React, { useCallback, useEffect, useState } from "react";

// icons

import HeartLineIcon from "remixicon-react/HeartLineIcon";
import StarFillIcon from "remixicon-react/StarFillIcon";
import CustomButton from "../Buttons/CustomButton";
import ProductModal from "../Modals/ProductModal";
import { formatePrice } from "@/helpers/functonHelpers";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import { addToFavorite, getFavorites, removeFromFavorite } from "@/interceptor/routes";
import { RiHeartFill, RiHeartLine, RiHeartPulseLine } from "@remixicon/react";
import { getUserData } from "@/events/getters";
import { setFavorites } from "@/store/reducers/favoritesSlice";
import { useTranslation } from "react-i18next";

const ListCards = ({ handleAdd,handleRemove,data }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const {t} = useTranslation()

  const userData = getUserData();
  const branchData = useSelector((state) => state.branch);
  const authentication = userData === false ? false : true;

  const branch_id = branchData.id;
  const [indeterminate, setIndeterminate] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const [checkedItems, setCheckedItems] = useState({});


  const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    "& .MuiCheckbox-checkbox": {
      // Add your custom styles here
      padding: 0,
      border: "none",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  }));

  useEffect(() => {
    if (userData !== false) {
      const initialCheckedItems = favoriteItems.reduce((acc, item) => {
        acc[item.id] = item.is_favorite == 1;
        return acc;
      }, {});
      setCheckedItems(initialCheckedItems);
    }
    
  }, [favoriteItems]);


     
    
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
          handleAdd(id)
        }
      } else {
        const removeFav = await removeFromFavorite({ type_id: id, branch_id });
        setIndeterminate(false);

        if (removeFav.error) {
          toast.error(removeFav.message);
        } else {
          toast.success(removeFav.message);
          handleRemove(id)
        }
      }
    },
    [branch_id]
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

  return (
 

    <Box>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {data.map((item, index) => {
          const discountedPrice =
            item.variants[0].special_price != 0
              ? item.variants[0].special_price
              : item.variants[0].price;
          const discount = item.min_max_price.discount_in_percentage;
const specialPrice = item.variants[0].special_price != 0
          const price = item.variants[0]?.price;
          return (
            <Grid xs={12} md={6} lg={4} key={index}>
              <Card
                variant="outlined"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "md",
                    borderColor: "neutral.outlinedHoverBorder",
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? theme.palette.primary[50]
                        : theme.palette.primary[700],
                  },
                }}
              >
                <Box display={"flex"} gap={2}>
                  <Box
                      position={"relative"}
                  
                  maxWidth={150} maxHeight={150}>
                    <Box
                      component={"img"}
                      src={item.image_sm}
                      srcSet={`${item.image_sm} 2x`}
                      loading="lazy"
                      alt=""
                      width={"100%"}
                      height={"100%"}
                      borderRadius={"md"}
                      minHeight={150}
                      minWidth={150}
                      sx={{
                        objectFit: "cover",
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 60%), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 30%)",
                        [theme.breakpoints.down("sm")]: {
                          minHeight: 80,
                          minWidth: 80,
                        },
                        [theme.breakpoints.between("sm", "md")]: {
                          minHeight: 150,
                          minWidth: 150,
                        },
                      }}
                    >


                      
                    </Box>
                    <CardCover
        sx={{
          background:
"linear-gradient(to top, rgba(0,0,0,0.1), rgba(0,0,0,0) 77px),linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 90px)"
        }}
      />

                    {discount && specialPrice != 0 && (
                    <Box position={"absolute"} top={"75%"} left={"5%"}>
                      <Typography
                        fontSize={"md"}
                        fontWeight={"lg"}
                        textColor={
                          theme.palette.mode === "light"
                            ? "background.body"
                            : ""
                        }
                      >
                        {discount}% {t('off')}
                      </Typography>
                    </Box>
                     )} 


                  </Box>

                  <Box width={"100%"} overflow={"hidden"}>
                    <Box display={"flex"} alignItems={"center"} width={"100%"}>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        width={"100%"}
                        gap={1}
                      >
                        <Box
                          width={"20px"}
                          component={"img"}
                          src={
                            item.indicator === "1"
                              ? "/images/icons/Veg.svg"
                              : "/images/icons/Non_veg.svg"
                          }
                          alt="veg-non-veg.icon"
                        ></Box>

                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          width={"100%"}
                          gap={0.4}
                        >
                          <StarFillIcon color={theme.palette.warning[400]} />
                          <Typography> {item.rating ?? 0} </Typography>
                        </Box>
                        <Box>
                          <StyledCheckbox
                            overlay={false}
                            color="warning"
                            sx={{ display: "flex" }}
                            checked={checkedItems[item.id] || false}
                            onChange={(e) =>
                              handleCheckboxChange(item.id, e.target.checked)
                            }
                            indeterminateIcon={
                              <RiHeartPulseLine size={"20px"} />
                            }
                            uncheckedIcon={
                              <RiHeartLine
                                size={"20px"}
                                color={theme.palette.danger[500]}
                              />
                            }
                            checkedIcon={
                              <RiHeartFill
                                size={"20px"}
                                color={theme.palette.danger[500]}
                              />
                            }
                          />
                        </Box>
                      </Box>
                    
                    </Box>

                    <Box mt={1}>
                      <Typography
                        fontSize={"sm"}
                        fontWeight={"md"}
                        textColor={"text.tertiary"}
                      >
                        {item.category_name}
                      </Typography>
                    </Box>
                    <Box  >
                      <Typography noWrap sx={{ wordBreak: "break-word" }} overflow={"hidden"} fontSize={"lg"} fontWeight={"md"}>
                        {item.name}
                      </Typography>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                      {discountedPrice < price && (
                      <Typography
                        sx={{ textDecoration: "line-through" }}
                        textColor={theme.palette.text.currency}
                        fontSize={theme.fontSize.xs}
                        fontWeight={theme.fontWeight.lg}
                      >
                        {formatePrice(price)}
                      </Typography>
                       )}

                      <Typography
                        fontSize={"md"}
                        fontWeight={"xl"}
                        textColor={"text.currency"}
                      >
                        {formatePrice(
                          discountedPrice ? discountedPrice : price
                        )}
                      </Typography>
                    </Box>

                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"end"}
                    >
                      <ProductModal
                        image={item.image_sm}
                        title={item.name}
                        description={item.short_description}
                        variants={item.variants}
                        rating={item.rating}
                        simple={item.type == "simple_product"}
                        addOns={item.product_add_ons}
                      />
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ListCards;
