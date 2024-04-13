"use client";

import {
  Card,
  CardCover,
  CardContent,
  Typography,
  Box,
  useTheme,
  styled,
  Checkbox,
} from "@mui/joy";
import React, { useCallback, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatePrice } from "@/helpers/functonHelpers";
import ProductModal from "@/component/Modals/ProductModal";
import { useTranslation } from "react-i18next";
import { getUserData } from "@/events/getters";
import { useSelector } from "react-redux";
import { RiHeartFill, RiHeartLine, RiHeartPulseLine } from "@remixicon/react";
import toast from "react-hot-toast";
import { addToFavorite, removeFromFavorite } from "@/interceptor/routes";

// shape is for is it rectangle or square
export const OfferCards = ({
  shape = "square",
  title,
  discount,
  price,
  specialPrice,
  image,
  product,
  handleRemove,
  data,
  discountedPrice,
}) => {
  if (typeof price == "string") {
    price = parseFloat(price);
  }
  const { t } = useTranslation();
  const theme = useTheme();
  const userData = getUserData();
  const branchData = useSelector((state) => state.branch);

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
      zIndex: 99,
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
      sx={{
        minHeight: 250,
        width: shape === "square" ? "100%" : "700px",
        borderRadius: shape === "square" ? "xl" : "md",
      }}
    >
      <Box display={"flex"} justifyContent={"end"}>
        <StyledCheckbox
          overlay={false}
          color="warning"
          checked={checkedItems[product.id] || false}
          onChange={(e) => handleCheckboxChange(product.id, e.target.checked)}
          indeterminateIcon={<RiHeartPulseLine size={"20px"} />}
          uncheckedIcon={
            <RiHeartLine size={"20px"} color={theme.palette.danger[500]} />
          }
          checkedIcon={
            <RiHeartFill size={"20px"} color={theme.palette.danger[500]} />
          }
        />
      </Box>
      <CardCover>
        <Box
          component={LazyLoadImage}
          src={image}
          srcSet={`${image} 2x`}
          loading="lazy"
          alt={image}
        ></Box>
      </CardCover>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
        }}
      />

      <CardContent sx={{ justifyContent: "flex-end" }}>
        <Box
          display={"flex"}
          alignItems={"start"}
          justifyContent={"space-between"}
          flexDirection={"column"}
          gap={1}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            {discount && specialPrice != 0 ? (
              <>
                <Typography textColor="neutral.300">{discount}% {t('off')}</Typography>
              </>
            ) : (
              <div></div>
            )}
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Typography
              textColor={"background.level1"}
              fontSize={"xl"}
              fontWeight={"md"}
              textOverflow={"ellipsis"}
              sx={{ textWrap: "nowrap", overflow: "hidden" }}
            >
              {title}
            </Typography>

            <Typography
              textColor={"neutral.50"}
              fontSize={"sm"}
              fontWeight={"md"}
            >
              {t("price")}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <ProductModal
              image={product.image_sm}
              title={product.name}
              description={product.short_description}
              variants={product.variants}
              rating={product.rating}
              simple={product.type == "simple_product"}
              addOns={product.product_add_ons}
            />

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              
              
              {specialPrice != 0 && (
                <Typography
                  sx={{ textDecoration: "line-through" }}
                  textColor={theme.palette.warning[400]}
                  fontSize={theme.fontSize.xs}
                  fontWeight={theme.fontWeight.sm}
                >
                  {formatePrice(price)}
                </Typography>
              )}



              {specialPrice > 0 ? (
                <Typography
                  textColor={"warning.400"}
                  fontSize={"xl"}
                  fontWeight={"md"}
                >
                  {formatePrice(specialPrice)}
                </Typography>
              ) : (
                <Typography
                  textColor={"warning.400"}
                  fontSize={"xl"}
                  fontWeight={"md"}
                >
                  {formatePrice(price)}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
