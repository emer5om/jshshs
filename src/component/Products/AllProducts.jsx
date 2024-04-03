"use client";
import BreadCrumb from "@/component/BreadCrumb/BreadCrumb";
import { Box, Button, Grid, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import NewItems from "@/component/Products/NewItems";
import { getProducts } from "@/repository/productsRepo";
import { OfferCards } from "@/component/Cards/OfferCards";
import { useTranslation } from "react-i18next";
import { HeadTitle } from "../HeadTitle";
import toast from "react-hot-toast";

const AllProducts = ({ queryConstants }) => {
    const [data, setData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [end, setEnd] = useState(false);
    const [query, setQuery] = useState({ limit: 8, offset: 0 });

    useEffect(() => {
        request();
    }, [query, queryConstants.category_slug]);

    const request = async () => {
        try {
            setLoading(true);
            const products = await getProducts({ ...query, ...queryConstants });
            setLoading(false);
            if (products.data.length === 0) {
                // toast.error(products.message);
            } else {
                if (products.data.length !== query.limit) {
                    setEnd(true);
                }
                setCategoryData(products.categories);
                setData(products.data); // Replace the existing data with the new data
            }
        } catch (error) {
            // toast.error();
            console.log("error Occurred while fetching products: ", error);
        }
    };

    const { t } = useTranslation();

    return (
        <Box>
            <HeadTitle title={categoryData[0]?.name} />
            <Box my={4}>
                <BreadCrumb
                    page={[
                        { name: t("categories"), link: "/categories" },
                        { name: categoryData[0]?.name, link: "#" },
                        { name: t("products"), link: "#" },
                    ]}
                />
            </Box>
            <Box>
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    {data.map((item, index) => {
                        const discount = item.min_max_price.discount_in_percentage;
                        return (
                            <Grid xs={12} md={3} key={index}>
                                <OfferCards
                                    image={item.image_sm}
                                    title={item.name}
                                    product={item}
                                    discount={discount}
                                    price={
                                        item.variants[0].special_price !== 0
                                            ? item.variants[0].special_price
                                            : item.variants[0].price
                                    }
                                    shape="rectangle"
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                my={2}
            >
                {!end && (
                    <Button
                        onClick={() => {
                            setQuery({ ...query, limit: query.limit + query.limit });
                        }}
                        disabled={loading}
                    >
                        {t("show-more")}
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default AllProducts;