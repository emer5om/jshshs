"use client";

import {
  useTheme,
  Card,
  CardContent,
  AspectRatio,
  Typography,
  Link,
  Chip,
  Box,
  CardActions,
  styled,
  Checkbox,
} from "@mui/joy";
import React, { useState, useCallback, useEffect } from "react";
import CustomButton from "../Buttons/CustomButton";

// icons

import StarFillIcon from "remixicon-react/StarFillIcon";
import HeartLineIcon from "remixicon-react/HeartLineIcon";
import ProductModal from "../Modals/ProductModal";
import { formatePrice } from "@/helpers/functonHelpers";
import { getUserData } from "@/events/getters";
import { useSelector } from "react-redux";
import { RiHeartFill, RiHeartLine, RiHeartPulseLine } from "@remixicon/react";
import toast from "react-hot-toast";

import { addToFavorite, removeFromFavorite } from "@/interceptor/routes";
import { t } from "i18next";

const ProductCards = ({
  image,
  type,
  rating,
  categoryName,
  title,
  price,
  discountedPrice,
  discount,
  product,
  specialPrice,
  id,
  data,
  handleRemove,
}) => {
  const theme = useTheme();
  const userData = getUserData();
  const branchData = useSelector((state) => state.branch);
  const favorites = useSelector((state) => state.favorites.value);

  const authentication = userData === false ? false : true;

  const branch_id = branchData.id;

  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    if (userData !== false) {
      const initialCheckedItems = data?.reduce((acc, item) => {
        acc[item.id] = item.is_favorite == 1;
        return acc;
      }, {});
      setCheckedItems(initialCheckedItems);
    }
  }, [data]);

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

  useEffect(() => {
    setCheckedItems([]);
  }, [authentication]);

  const handleFavChange = useCallback(
    async (value, id) => {
      if (authentication === false) {
        return toast.error("Please Login First!");
      }
      if (value) {
        const add_fav = await addToFavorite({ type_id: id, branch_id });

        if (add_fav.error) {
          toast.error(add_fav.message);
        } else {
          toast.success(add_fav.message);
        }
      } else {
        const removeFav = await removeFromFavorite({ type_id: id, branch_id });

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
        <Box position={"relative"} maxWidth={150} maxHeight={150}>
          <Box
            component={"img"}
            src={image}
            srcSet={`${image} 2x`}
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
          ></Box>
          {discount && specialPrice != 0 && (
            <Box position={"absolute"} top={"75%"} left={"5%"}>
              <Typography
                fontSize={"md"}
                fontWeight={"lg"}
                textColor={
                  theme.palette.mode === "light" ? "background.body" : ""
                }
              >
                {discount}% {t('off')}
              </Typography>
            </Box>
          )}
        </Box>

        <Box width={"100%"}>
          <Box display={"flex"} alignItems={"center"} width={"100%"}>
            <Box display={"flex"} alignItems={"center"} width={"100%"} gap={1}>
              <Box
                width={"20px"}
                component={"img"}
                src={
                  product.indicator === "1"
                    ? "/images/icons/Veg.svg"
                    : "/images/icons/non-veg.jpg"
                }
                alt="veg-non-veg.icon"
              ></Box>

              <Box display={"flex"} alignItems={"center"} width={"100%"}>
                <StarFillIcon color={theme.palette.warning[400]} />
                <Typography> {rating ?? 0} </Typography>
              </Box>
              <Box>
                <StyledCheckbox
                  overlay={false}
                  color="warning"
                  checked={checkedItems[id] || false}
                  onChange={(e) => handleCheckboxChange(id, e.target.checked)}
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
           
          </Box>

          <Box mt={1}>
            <Typography
              fontSize={"sm"}
              fontWeight={"md"}
              textColor={"text.tertiary"}
            >
              {categoryName}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: { xs: "sm", md: "lg" } }}
              fontWeight="md"
            >
              {title}
            </Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            {discountedPrice < price && (
              <Typography
                sx={{ textDecoration: "line-through" }}
                textColor={theme.palette.text.currency}
                fontSize={theme.fontSize.xs}
                fontWeight={theme.fontWeight.sm}
              >
                {formatePrice(price)}
              </Typography>
            )}

            <Typography
              fontSize={"md"}
              fontWeight={"xl"}
              textColor={"text.currency"}
            >
              {formatePrice(discountedPrice ? discountedPrice : price)}
            </Typography>
          </Box>

          <Box display={"flex"} flexDirection={"row"} justifyContent={"end"}>
            <ProductModal
              image={image}
              title={title}
              description={product.short_description}
              variants={product.variants}
              rating={product.rating}
              simple={product.type == "simple_product"}
              addOns={product.product_add_ons}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCards;
