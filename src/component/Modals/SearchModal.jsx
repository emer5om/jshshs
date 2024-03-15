"use client";
import React, { useState, useEffect } from 'react';
import { Modal, Input, Sheet, AspectRatio, Card, Typography, IconButton, Box, ModalDialog, ModalClose, DialogTitle, DialogContent, CardContent, Chip, Grid, useTheme, Button } from '@mui/joy';
import { RiArrowLeftLine, RiArrowRightLine, RiDualSim1Fill, RiSearch2Line } from '@remixicon/react';
// import { debounce } from "lodash";
import debounce from 'lodash.debounce';
import { get_products } from "@/interceptor/routes"
import { formatePrice } from '@/helpers/functonHelpers';
import ProductCards from '../Cards/ProductCards';
import SearchBar from '../GlobalSearch/SearchBar';

function SearchModal({ displayStyle = "icon" }) {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const theme = useTheme()


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
        // Call the debounced search function
    };

    return (
        <Box>
            <Box>

                {displayStyle === "icon" ?
                    <RiSearch2Line size={"20px"} onClick={() => {
                        setOpen(true)
                        setSearchQuery("")
                        setProducts([])
                    }} />
                    :
                    <SearchBar onClick={
                        () => {
                            setOpen(true)
                            setSearchQuery("")
                            setProducts([])
                        }
                    } />
                }

            </Box>
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
                        {/* </Button> */}
                        <DialogTitle sx={{

                            display: {
                                xs: "none", md: "flex"
                            }
                        }}>
                            Search Products
                        </DialogTitle>

                        <Box display={{ xs: "none", md: "flex" }}>
                            <ModalClose />
                        </Box>
                    </Box>
                    <DialogContent sx={{ minHeight: { md: 800, xs: "100%" }, maxWidth: { md: 700, xs: "100%" } }}>
                        {/* Spice up your shopping experience with our tangy selection of products & categories! */}
                        <Input
                            value={searchQuery}
                            onChange={handleInputChange}
                            placeholder="Search products..."
                            sx={{ mb: 2 }}
                            startDecorator={
                                <Box sx={{
                                    display: { xs: "flex", md: "none" }
                                }}
                                    onClick={() => setOpen(false)}
                                >
                                    <RiArrowLeftLine />
                                </Box>
                            }
                        />

                        {products.length > 0 ? (
                            <Grid container gap={{ md: 0, xs: 2 }} spacing={{ md: 2, xs: 0 }} sx={{ maxHeight: 700, overflow: 'auto', }}>
                                {products.map((item) => (
                                    <Grid md={6} xs={12} key={item.id}>
                                        <ProductCards image={item.image} discount={item.min_max_price.discount_in_percentage} categoryName={item.category_name} title={item.name} discountedPrice={item.min_max_price.discount_in_percentage} price={item.min_max_price.min_price} type={"veg"}
                                            rating={item.rating}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        ) :
                            <Typography display={{ xs: "flex", md: "flex" }} justifyContent={"center"} alignItems={"center"} width={"100%"} textAlign={"center"} fontSize={"lg"} fontWeight={"xl"}>
                                Search Food to your liking...
                            </Typography>
                        }
                    </DialogContent>

                </ModalDialog>
            </Modal>
        </Box>
    );
}

export default SearchModal;

{/* <Sheet
                            variant="outlined"
                            sx={{
                                maxHeight: 300,
                                overflow: 'auto',
                            }}
                        > */}
{/* </Sheet> */ }

/**
 *  <Card
                                            key={product.id}
                                            variant="outlined"
                                            orientation="horizontal"
                                            sx={{
                                                width: 320,
                                                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                                            }}
                                        >
                                            <AspectRatio ratio="1" sx={{ width: 90 }}>
                                                <img
                                                    src={product.image}
                                                    srcSet={`${product.image} 2x`}
                                                    loading="lazy"
                                                    alt=""
                                                />
                                            </AspectRatio>
                                            <CardContent sx={{ maxWidth: 100 }}>
                                                <Typography level="title-lg" id="card-description">
                                                    {product.name}
                                                </Typography>
                                                <Typography noWrap level="body-sm" aria-describedby="card-description" mb={1}>
                                                    {product.short_description}
                                                </Typography>
                                                <Chip
                                                    variant="outlined"
                                                    color="primary"
                                                    size="lg"
                                                    sx={{ pointerEvents: 'none' }}
                                                >
                                                    {formatePrice(product.min_max_price.special_price > 0 ?
                                                        product.min_max_price.special_price :
                                                        product.min_max_price.min_price)
                                                    }
                                                </Chip>
                                            </CardContent>
                                        </Card>
 */