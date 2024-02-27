"use client";
import React from 'react'
import {
  Sheet,
  Container,
  Grid,
  Box,
  Text,
  Badge,
  Avatar,
  Button,
  Divider,
  Typography,
  Link,
  Stack,
  ListItem,
  List
} from '@mui/joy';
import { Img } from '@/component/Img';

// import components
import Header from "@/component/Header/index"
import Footer from "@/component/Footer/index"

import { useTheme } from '@mui/joy/styles';
const layout = ({ children }) => {
  const theme = useTheme();

  return (
    <Container maxWidth={"xl2"}>
      <Box pt={4}>
        <Header />

        <Grid minHeight={"700px"} mt={4} px={8} container spacing={2} alignItems={"center"}>
          <Grid xs={12}>
            {children}
          </Grid>
        </Grid>

      </Box>
      {/* need to put  contents only within container */}
      <Footer />
    </Container>
  )
}

export default layout