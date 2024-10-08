"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Input,
  Sheet,
  AspectRatio,
  Card,
  Typography,
  IconButton,
  Box,
  ModalDialog,
  ModalClose,
  DialogTitle,
  DialogContent,
  CardContent,
  Chip,
  Grid,
  useTheme,
  Button,
} from "@mui/joy";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCloseLine,
  RiDualSim1Fill,
  RiSearch2Line,
} from "@remixicon/react";
import debounce from "lodash.debounce";
import { get_products } from "@/interceptor/routes";
import { formatePrice } from "@/helpers/functonHelpers";
import ProductCards from "../Cards/ProductCards";
import SearchBar from "../GlobalSearch/SearchBar";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { closeSearchDrawer } from "../../store/reducers/searchDrawerSlice";
import Image from "next/image";

function SearchModal({ displayStyle = "icon" }) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isSearchOpen = useSelector((state) => state.searchDrawer.isSearchOpen);

  const handleSearchButtonClick = () => {
    dispatch(closeSearchDrawer()); // Dispatch action to open the search drawer
  };

  useEffect(() => {
    setOpen(isSearchOpen); // Set open state based on isSearchOpen
    setIsFocused(true);
  }, [isSearchOpen]); // Re-run when isSearchOpen changes

  const inputRef = useRef();
  const timerRef = useRef(null);

  const handleSearch = debounce((searchQuery) => {
    // Filter products based on the searchQuery

    get_products({ search: searchQuery }).then((res) => {
      setProducts(res.data);
    });
  }, 250);

  useEffect(() => {
    if (open) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, [open]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length === 0) {
      setProducts([]);
    } else {
      // Clear previous timeout if any
      clearTimeout(timerRef.current);
      // Set a new timeout to perform search after 500ms (adjust as needed)
      timerRef.current = setTimeout(() => {
        handleSearch(query);
      }, 1000);
    }
  };

  return (
    <Box display={"flex"} sx={{ minWidth: { sm: "100%", md: "18px" } }}>
      {displayStyle === "icon" ? (
        <RiSearch2Line
          color={theme.palette.mode === "dark" ? "white" : "black"}
          style={{ cursor: "pointer", width: "40px" }}
          size={"20px"}
          onClick={() => {
            setOpen(true);
            setSearchQuery("");
            setProducts([]);
          }}
        />
      ) : (
        <SearchBar
          onClick={() => {
            setOpen(true);
            setSearchQuery("");
            setProducts([]);
          }}
        />
      )}

      <Modal
        aria-labelledby="product-search-modal-title"
        aria-describedby="product-search-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: products.length > 0 ? "100%" : "100%",
        }}
      >
        <ModalDialog
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          sx={{
            minWidth: { xs: "100%", md: 700 },
            minHeight: { xs: "100%", md: 700 },
          }}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <DialogTitle
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
            >
              {t("search-products")}
            </DialogTitle>

            <Box display={{ xs: "none", md: "flex" }}>
              <ModalClose />
            </Box>
          </Box>
          <DialogContent
            sx={{
              minHeight: { md: 700, xs: "100%" },
              maxWidth: { md: 700, xs: "100%" },
              overflow: "hidden !important",
            }}
          >
            <Input
              className={isFocused ? "InputModalFocus" : "inputModal"}
              value={searchQuery}
              onChange={handleInputChange}
              placeholder={t("search-products")}
              sx={{ mb: 2, "--Input-focused:": 1 }}
              type="search"
              autoFocus={true}
              startDecorator={
                <Box
                  sx={{ display: { xs: "flex", md: "none" } }}
                  onClick={() => {
                    setOpen(false); // Close the search bar
                    handleSearchButtonClick(); // Dispatch action to open the search drawer
                  }}
                >
                  <RiArrowLeftLine />
                </Box>
              }
            />

            {products.length > 0 ? (
              <Grid
                container
                gap={{ md: 0, xs: 2 }}
                spacing={{ md: 2, xs: 0 }}
                sx={{ maxHeight: 700, overflow: "auto" }}
              >
                {products.map((item) => (


                  <Grid md={6} xs={12} key={item.id}>
                    <ProductCards
                      image={item.image}
                      discount={item.min_max_price.discount_in_percentage}
                      categoryName={item.category_name}
                      title={item.name}
                      discountedPrice={
                        item.min_max_price.discount_in_percentage
                      }
                      price={item.min_max_price.min_price}
                      type={"veg"}
                      rating={item.rating}
                      product={item}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : searchQuery ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                <Image
                  src="/no-item-found.svg"
                  width={500}
                  height={500}
                  alt="No product found"
                />
              </Box>
            ) : (
              <Box>
                <Typography
                  display={{ xs: "flex", md: "flex" }}
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={"100%"}
                  textAlign={"center"}
                  fontSize={"lg"}
                  fontWeight={"xl"}
                  textTransform={"none !important"} // Set text transform to none
                >
                  {t("search-food-as-per-your-liking")}
                </Typography>
              </Box>
            )}
          </DialogContent>
        </ModalDialog>
      </Modal>
    </Box>
  );
}

export default SearchModal;
