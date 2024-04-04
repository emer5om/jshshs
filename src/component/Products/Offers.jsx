"use client";

import { Box, Grid } from "@mui/joy";
import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import { OfferCards } from "../Cards/OfferCards";
import { useMediaQuery } from "@mui/material";

const Offers = ({ data, showMore = true }) => {
  const is1024 = useMediaQuery("(min-width:1024px)");

  return (
    <Box>
      <Box my={4}>
        {showMore && (
          <SectionHeading
            title={data.title}
            showMore={true}
            showMoreLink={
              "/products/" + data.categories + "?title=" + data.title
            }
          />
        )}
      </Box>

      <Box>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          {data.product_details.map((item, index) => {
            const discount = item.min_max_price.discount_in_percentage;
            if (index < 8) {
              return (
                <Grid
                  xs={12}
                  sm={6}
                  md={2}
                  lg={2}
                  {...(is1024 ? { md: 6 } : {})}
                  key={index}
                >
                  <OfferCards
                    image={item.image_sm}
                    title={item.name}
                    discount={discount}
                    product={item}
                    price={item.variants[0].price}
                    specialPrice={
                      item.variants[0].special_price > 0 &&
                      item.variants[0].special_price
                    }
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Offers;
