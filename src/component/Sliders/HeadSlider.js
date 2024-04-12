"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardCover,
  IconButton,
  Typography,
} from "@mui/joy";
import { Swiper, SwiperSlide } from "swiper/react";
import UserLocationFillIcon from "remixicon-react/UserLocationFillIcon";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";

const HeadSlider = ({ images = [1, 2, 3] }, isLoading) => {
  return (
    <Box sx={{direction:"ltr"}}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000 }}
        style={{
          borderRadius: "var(--border-radius-xl)",

        }}
      >
        {images.map((image, index) => {
          let link = "#";
          if (image.type == "categories") {
            link = "/categories/" + image.data[0].slug;
          }
          return (
            <SwiperSlide key={index}>
              <Link href={link}>
                <Card
                
                  sx={{ direction:"ltr",
                    minHeight: { xs: 150, md: 472 },
                  }}
                >
                  <CardCover sx={{ minHeight: "100%" }}>
                    <Box
                      component={"img"}
                      src={image.image}
                      srcSet={image.image}
                      effect="blur"
                      loading="lazy"
                      alt={image.image}
                      sx={{
                        width: "auto",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </CardCover>
                  {/*<CardContent sx={{ justifyContent: "flex-end" }}>*/}
                  {/*  <Typography level="title-lg" textColor="#fff">*/}
                  {/*    Yosemite National Park*/}
                  {/*  </Typography>*/}
                  {/*  <Typography*/}
                  {/*    startDecorator={<UserLocationFillIcon />}*/}
                  {/*    textColor="neutral.300"*/}
                  {/*  >*/}
                  {/*    California, USA*/}
                  {/*  </Typography>*/}
                  {/*</CardContent>*/}
                </Card>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default HeadSlider;
