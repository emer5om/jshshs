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
} from "@mui/joy";
import React, { useState, useCallback, useMemo, memo, useEffect } from "react";
import { formatePrice } from "@/helpers/functonHelpers";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite, removeFromFavorite } from "@/interceptor/routes";
import ProductModal from "../Modals/ProductModal";
import { getUserData } from "@/events/getters";
import { setFavorites } from "@/store/reducers/favoritesSlice";
// icons
import StarFillIcon from "remixicon-react/StarFillIcon";
import { RiHeartFill, RiHeartLine, RiHeartPulseLine } from "@remixicon/react";
import { useTranslation } from "react-i18next";

const FavItems = memo(({ data, handleRemove }) => {

  const theme = useTheme();
  const dispatch = useDispatch();
  const branchData = useSelector((state) => state.branch);
  const favorites = useSelector((state) => state.favorites.value);
  const { t } = useTranslation();
  const userData = getUserData();
  const authentication = userData === false ? false : true;

  const branch_id = branchData.id;
  const [indeterminate, setIndeterminate] = useState(false);

  const [checkedItems, setCheckedItems] = useState({});
  const [isUserDataAvailable, setIsUserDataAvailable] = useState(false);
  
  useEffect(() => {
    if (userData !== false) {
      setIsUserDataAvailable(true);
      const initialCheckedItems = data.reduce((acc, item) => {
        acc[item.id] = item.is_favorite == 1;
        return acc;
      }, {});
      setCheckedItems(initialCheckedItems);
    }
  }, [userData, data]);

  const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    "& .MuiCheckbox-checkbox": {
      padding: 0,
      border: "none",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  }));

  // const handleFavChange = useCallback(
  //   async (value, id) => {
  //     if (authentication === false) {
  //       return toast.error("Please Login First!");
  //     }
  //     setIndeterminate(true);
  //     if (value) {
  //       const add_fav = await addToFavorite({ type_id: id, branch_id });
  //       setIndeterminate(false);

  //       if (add_fav.error) {
  //         toast.error(add_fav.message);
  //       } else {
  //         toast.success(add_fav.message);
  //       }
  //     } else {
  //       handleRemove(id);
  //       const removeFav = await removeFromFavorite({ type_id: id, branch_id });
  //       setIndeterminate(false);

  //       if (removeFav.error) {
  //         toast.error(removeFav.message);
  //       } else {
  //         toast.success(removeFav.message);
  //       }
  //     }
  //   },
  //   [branch_id, authentication]
  // );

  

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
          handleRemove(id); // Call handleRemove here
        }
      }
    },
    [branch_id, authentication, handleRemove]
  );

  const handleCheckboxChange = useCallback(
    (id, checked) => {
      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [id]: checked,
      }));
      handleFavChange(checked, id);
    },
    [handleFavChange]
  );

  const MemoizedProductModal = memo(ProductModal);


  const renderCards = useMemo(
    () =>
      data.length === 0 ? (
        <Grid
          item
          xs={12}
          textAlign="center"
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center" // Center vertically
          maxHeight="600px"
          width={"100%"}
        >
          <img
            src={"/fav.webp"}
            alt="No Data"
            style={{
              maxHeight: "600px",
              alignSelf: "center",
              justifySelf: "center",
            }}
          />
          <Typography textAlign={"center"} fontSize={"xl"} fontWeight={"lg"}>
            {t("No-Favourites")}
          </Typography>
          <Typography textAlign={"center"} fontSize={"lg"} fontWeight={"md"}>
            {t("you-don't-have-any-favorites-yet")}
          </Typography>
        </Grid>
      ) : (
        data.map((item, index) => (
          <Grid xs={12} md={6} key={index}>
            <Card
              key={index}
              orientation="horizontal"
              variant="outlined"
              sx={{
                width: "100%",
                maxHeight: { xs: "250px", md: "200px" },
                borderRadius: "md",
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
              <CardOverflow sx={{ alignItems: "center" }}>
                <Box
                  maxWidth={"100px"}
                  height={"100px"}
                  borderRadius={"50%"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  ml={1}
                >
                  <Box
                    component={"img"}
                    className="img"
                    src={item.image_sm}
                    srcSet={`${item.image_sm} 2x`}
                    loading="lazy"
                    alt=""
                    borderRadius={"md"}
                    height={"100%"}
                    width={"100%"}
                    style={{ transition: "transform 0.3s ease-in-out" }} // Smooth transition
                  />
                </Box>
              </CardOverflow>
              <CardContent sx={{ maxWidth: { xs: "80%", md: "80%" } }}>
                <Box>
                  <Box>
                    <Box display={"flex"} alignItems={"center"} width={"100%"}>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        width={"100%"}
                        gap={2}
                      >
                        <Box
                          width={"20px"}
                          component={"img"}
                          src={
                            item.indicator == 1
                              ? "/images/icons/Veg.svg"
                              : "/images/icons/Non_veg.svg"
                          }
                          alt="veg-non-veg.icon"
                        />

                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          width={"100%"}
                          gap={0.5}
                        >
                          <StarFillIcon color={theme.palette.warning[400]} />
                          <Typography> {item.rating} </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <StyledCheckbox
                          overlay={false}
                          color="warning"
                          checked={checkedItems[item.id] || false}
                          onChange={(e) =>
                            handleCheckboxChange(item.id, e.target.checked)
                          }
                          indeterminateIcon={<RiHeartPulseLine size={"20px"} />}
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

                    <Box my={2}>
                      <Typography
                        fontSize={theme.fontSize.sm}
                        fontWeight={theme.fontWeight.md}
                        textColor={"text.currency"}
                        textTransform={"capitalize"}
                      >
                        {item.category_name}
                      </Typography>
                      <Typography
                        fontSize={theme.fontSize.md}
                        fontWeight={theme.fontWeight.lg}
                        sx={{
                          textOverflow: "ellipsis",
                          width: "100%",
                          textWrap: "nowrap",
                          overflow: "hidden",
                          mb: 1,
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
                    </Box>

                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      width={"100%"}
                    >
                      <Box display={"flex"} alignItems={"center"} gap={1}>
                        {item.variants[0]?.special_price > 0 ? (
                          <Typography
                            sx={{
                              color: theme.palette.text.tertiary,
                              textDecoration: "line-through",
                            }}
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
                          {item.variants[0]?.special_price > 0
                            ? formatePrice(item.variants[0]?.special_price)
                            : formatePrice(item.variants[0]?.price)}
                        </Typography>
                      </Box>
                      <Box display={"flex"} alignItems={"center"} gap={1}>
                        {authentication && (
                          <MemoizedProductModal
                            image={item.image_sm}
                            title={item.name}
                            rating={item.rating}
                            description={item.short_description}
                            variants={item.variants}
                            addOns={item.product_add_ons}
                            simple={item.type}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))
      ),

    [
      data,
      theme,
      indeterminate,
      checkedItems,
      handleCheckboxChange,
      authentication,
      handleRemove,
    ]
  );


  return (
    <Box
      sx={{ marginTop: 2 }}
      display={"flex"}
      width={"100%"}
      justifyContent={"center"}
    >
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {renderCards}
      </Grid>
    </Box>
  );
});

export default FavItems;
