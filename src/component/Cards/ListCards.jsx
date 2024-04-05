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
import React, { useCallback, useState } from "react";

// icons

import HeartLineIcon from "remixicon-react/HeartLineIcon";
import StarFillIcon from "remixicon-react/StarFillIcon";
import CustomButton from "../Buttons/CustomButton";
import ProductModal from "../Modals/ProductModal";
import { formatePrice } from "@/helpers/functonHelpers";
import { useSelector } from "react-redux";

import toast from "react-hot-toast";

import { addToFavorite, removeFromFavorite } from "@/interceptor/routes";
import { RiHeartFill, RiHeartLine, RiHeartPulseLine } from "@remixicon/react";
import { getUserData } from "@/events/getters";

const ListCards = ({ data }) => {
  const theme = useTheme();

  const userData = getUserData();
  const branchData = useSelector((state) => state.branch);
  const authentication = userData === false ? false : true;

  const branch_id = branchData.id;
  const [indeterminate, setIndeterminate] = useState(false);

  const [checkedItems, setCheckedItems] = useState(
    userData !== false
      ? data.reduce((acc, item) => {
          acc[item.id] = item.is_favorite == 1;
          return acc;
        }, {})
      : false
  );
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
        }
      }
    },
    [branch_id]
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

  return (
    <Box>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {data.map((item, index) => {
          return (
            <Grid xs={12} md={4} key={index}>
              <Card
                key={index}
                orientation="horizontal"
                variant="outlined"
                sx={{
                  width: "100%",
                  height: { xs: "250px", md: "200px" },
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
                      sx={{ transition: "transform 0.3s ease-in-out" }} // Smooth transition
                    />
                  </Box>
                </CardOverflow>
                <CardContent sx={{ maxWidth: { xs: "50%", md: "80%" } }}>
                  <Box>
                    <Box>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        width={"100%"}
                        gap={2}
                      >
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
                              item.indicator == 1
                                ? "/images/icons/Veg.svg"
                                : "/images/icons/non-veg.jpg"
                            }
                            alt="veg-non-veg.icon"
                          ></Box>

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
                        flexDirection={{ xs: "column", md: "row" }}
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
                          <ProductModal
                            image={item.image_sm}
                            title={index.name}
                            rating={item.rating}
                            description={item.short_description}
                            variants={item.variants}
                            addOns={item.product_add_ons}
                            simple={item.type}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ListCards;
