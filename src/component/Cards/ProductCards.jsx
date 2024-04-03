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
} from "@mui/joy";
import React from "react";
import CustomButton from "../Buttons/CustomButton";

// icons

import StarFillIcon from "remixicon-react/StarFillIcon";
import HeartLineIcon from "remixicon-react/HeartLineIcon";
import { RiHeartFill } from "@remixicon/react";
import ProductModal from "../Modals/ProductModal";
import { formatePrice } from "@/helpers/functonHelpers";

const ProductCards = ({
  image,
  type,
  rating,
  isLiked,
  categoryName,
  title,
  price,
  discountedPrice,
  discount,
  product,
}) => {
  const theme = useTheme();
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
        <Box maxWidth={150} maxHeight={150}>
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
          {discount != 0 && (
            <Box position={"absolute"} top={"75%"} left={"5%"}>
              <Typography
                fontSize={"md"}
                fontWeight={"lg"}
                textColor={
                  theme.palette.mode === "light" ? "background.body" : ""
                }
              >
                {discount}% OFF
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
                    ? "/images/icons/veg.png"
                    : "/images/icons/non-veg.jpg"
                }
                alt="veg-non-veg.icon"
              ></Box>

              <Box display={"flex"} alignItems={"center"} width={"100%"}>
                <StarFillIcon color={theme.palette.warning[400]} />
                <Typography> {rating ?? 0} </Typography>
              </Box>
            </Box>
            {isLiked != undefined && (
              <Box>
                {isLiked ? (
                  <RiHeartFill color={theme.palette.danger[500]} />
                ) : (
                  <HeartLineIcon color={theme.palette.background.footer} />
                )}
              </Box>
            )}

            {/* images and other data */}
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
            <Typography fontSize={"lg"} fontWeight={"md"}>
              {title}
            </Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            
            {
              discountedPrice  < price&&
              <Typography
              sx={{ textDecoration: "line-through" }}
              textColor={theme.palette.text.currency}
              fontSize={theme.fontSize.xs}
              fontWeight={theme.fontWeight.sm}
            >
              {formatePrice(price)}
            </Typography>
            }
     

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
