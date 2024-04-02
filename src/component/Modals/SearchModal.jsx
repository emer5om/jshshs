"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Input, Sheet, AspectRatio, Card, Typography, IconButton, Box, ModalDialog, ModalClose, DialogTitle, DialogContent, CardContent, Chip, Grid, useTheme, Button } from '@mui/joy';
import { RiArrowLeftLine, RiArrowRightLine, RiCloseLine, RiDualSim1Fill, RiSearch2Line } from '@remixicon/react';
import debounce from 'lodash.debounce';
import { get_products } from "@/interceptor/routes"
import { formatePrice } from '@/helpers/functonHelpers';
import ProductCards from '../Cards/ProductCards';
import SearchBar from '../GlobalSearch/SearchBar';
import { useTranslation } from "react-i18next";

function SearchModal({ displayStyle = "icon" }) {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const theme = useTheme()
    const { t } = useTranslation()

    const inputRef = useRef(null);



    const handleSearch = debounce((searchQuery) => {
        // Filter products based on the searchQuery

        get_products({ search: searchQuery }).then(res => {
            setProducts(res.data);
        })

    }, 250);

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length === 0) {
            setProducts([]);
        } else {
            handleSearch(query);
        }
    };

    return (
        <Box display={"flex"} >

            {displayStyle === "icon" ?

                <RiSearch2Line
                    style={{ cursor: 'pointer' }}
                    size={"20px"} onClick={() => {
                        setOpen(true)
                        setSearchQuery("")
                        setProducts([])
                    }}
                />
                :
                <SearchBar onClick={
                    () => {
                        setOpen(true)
                        setSearchQuery("")
                        setProducts([])
                    }
                } />
            }

            <Modal
                aria-labelledby="product-search-modal-title"
                aria-describedby="product-search-modal-description"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    maxHeight: products.length > 0 ? "100%" : "100%",
                }}
            >
                <ModalDialog
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    sx={{
                        minWidth: { xs: "100%", md: 700 },
                        minHeight: { xs: "100%", md: "500" }
                    }}
                >
                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} >
                        <DialogTitle sx={{
                            display: {
                                xs: "none", md: "flex"
                            }
                        }}>
                            {t("search-products")}
                        </DialogTitle>

                        <Box display={{ xs: "none", md: "flex" }}>
                            <ModalClose />
                        </Box>
                    </Box>
                    <DialogContent sx={{ minHeight: { md: 800, xs: "100%" }, maxWidth: { md: 700, xs: "100%" } }}>
                        <Input
                            value={searchQuery}
                            onChange={handleInputChange}
                            placeholder={t("search-products")}
                            sx={{ mb: 2 }}
                            type='search'
                            startDecorator={
                                <Box sx={{ display: { xs: "flex", md: "none" } }} onClick={() => setOpen(false)}>
                                    <RiArrowLeftLine />
                                </Box>
                            }
                            ref ={inputRef} 
                        />

                        {products.length > 0 ? (
                            <Grid container gap={{ md: 0, xs: 2 }} spacing={{ md: 2, xs: 0 }} sx={{ maxHeight: 700, overflow: 'auto', }}>
                                {products.map((item) => (
                                    <Grid md={6} xs={12} key={item.id}>
                                        <ProductCards image={item.image} discount={item.min_max_price.discount_in_percentage} categoryName={item.category_name} title={item.name} discountedPrice={item.min_max_price.discount_in_percentage} price={item.min_max_price.min_price} type={"veg"}
                                            rating={item.rating} product={item}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        ) :
                            <Typography display={{ xs: "flex", md: "flex" }} justifyContent={"center"} alignItems={"center"} width={"100%"} textAlign={"center"} fontSize={"lg"} fontWeight={"xl"}>
                                {t("search-food-as-per-your-liking")}
                            </Typography>
                        }
                    </DialogContent>

                </ModalDialog>
            </Modal>
        </Box>
    );
}

export default SearchModal;