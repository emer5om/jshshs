"use client";

import { Box, Breadcrumbs, Typography, useTheme } from "@mui/joy";
import Link from "next/link";
import React from "react";

// Pass pages in array
import Home4FillIcon from "remixicon-react/Home4FillIcon";
import ArrowRightSFillIcon from "remixicon-react/ArrowRightSFillIcon";
import { useTranslation } from "react-i18next";

const BreadCrumb = ({ page }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <div>
      <Box
        backgroundColor={theme.palette.background.level2}
        px={2}
        py={1}
        borderRadius={"var(--border-radius-sm)"}
      >
        <Breadcrumbs
          separator={
            <ArrowRightSFillIcon color={theme.palette.text.currency} />
          }
          aria-label="breadcrumbs"
        >
          <Link color={theme.palette.text.icon} href="/home">
            <Home4FillIcon
              fontSize={theme.fontSize.xl}
              color={theme.palette.text.currency}
            />
          </Link>

          {page.map((item, index) => {
            const isLastItem = index === page.length - 1;
            return (
              <Typography
                component={!isLastItem ? Link : Box}
                href={item.link}
                textColor={
                  !isLastItem
                    ? theme.palette.mode === "light"
                      ? "#3B3B3B"
                      :  "text.currency"
                    : theme.palette.mode === "light"
                    ? "#3B3B3B" 
                    : "text.secondary"
                }
                fontWeight={"xl"}
                fontSize={"lg"}
                key={index}
              >
                {t(item.name)}
              </Typography>
            );
          })}
        </Breadcrumbs>
      </Box>
    </div>
  );
};

export default BreadCrumb;
