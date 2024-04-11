import React, { useEffect, useState } from 'react';
import { Box, Card, CardCover, Grid, useTheme, CircularProgress, Skeleton, CardContent } from '@mui/joy';
import Offers from '@/component/Products/Offers';
import BreadCrumb from '@/component/BreadCrumb/BreadCrumb';
import { useSelector } from 'react-redux';
import { OfferCards } from '@/component/Cards/OfferCards';
import { getOfferImages } from "@/interceptor/routes";
import DealsCards from "@/component/Cards/DealsCards";
import Link from 'next/link';

export const metadata = {
    title: "Foods on Offer | eRestro Single vendor",
    description: "Foods On Offer, eRestro single vendor, orders foods and stuff ",
};


const OffersView = () => {
    const theme = useTheme();
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading indicator
    const branchData = useSelector((state) => state.branch);

    const offerCards = async () => {
        try {
            const branch_id = branchData.id;
            const offers = await getOfferImages({ branch_id });

            if (!offers.error) {
                setOffers(offers.data);
            }
        } catch (error) {
            console.log("error occurred while fetching offers", error);
        } finally {
            setLoading(false); // Set loading to false when done fetching
        }
    };

    useEffect(() => {
        offerCards();
    }, []);

    return (
        <Box>
            <Box my={4}>
                {loading ? ( // Show loading indicator while loading
                   <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                   {/* Skeleton for grid items */}
                   {[...Array(6)].map((_, index) => (
                   <Grid item xs={12} md={2} key={index}>
                   <Skeleton variant="rectangular" sx={{ borderRadius: theme.radius.xl }} width="100%" height={250} />
                 </Grid>
                   ))}
                 </Grid>
                 
                ) : (
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        {offers && offers.map((item, index) => {
                            return (
                                <Grid xs={12} md={2} key={index}>
                                    <Card
                                        sx={{
                                            width: "100%",
                                            height: 250,
                                            borderRadius: theme.radius.xl,
                                            boxShadow: "0px 4px 4px 0px #00000040"
                                        }}
                                        component={Link}
                                        href={
                                            item.type == "categories" ? `/categories/${item.data[0]?.slug}`
                                                : (item.type == "products" ? '/products'
                                                    : "#")
                                        }
                                    >
                                        <CardCover>
                                            <Box
                                                component={'img'}
                                                src={item.image}
                                                srcSet={`${item.image} 2x`}
                                                loading="lazy"
                                                alt=""
                                                sx={{ objectFit: "cover" }}
                                            >
                                            </Box>
                                        </CardCover>
                                    </Card>
                                </Grid>
                            )
                        })}

                        {offers.length === 0 && (
                            <Grid xs={12} >

                            </Grid>
                        )}
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default OffersView;
