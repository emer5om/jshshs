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

const HeadSlider = ({ images = [1, 2, 3] }) => {
  return (
    <Box>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                borderRadius: "var(--border-radius-xl)",
                minHeight: { xs: 250, md: 472 },
              }}
            >
              <CardCover sx={{ minHeight: "100%" }}>
                <Box
                  component={"img"}
                  src={image}
                  srcSet={image}
                  loading="lazy"
                  alt={image}
                  sx={{
                    width: "auto",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </CardCover>
              <CardContent sx={{ justifyContent: "flex-end" }}>
                <Typography level="title-lg" textColor="#fff">
                  Yosemite National Park
                </Typography>
                <Typography
                  startDecorator={<UserLocationFillIcon />}
                  textColor="neutral.300"
                >
                  California, USA
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeadSlider;
