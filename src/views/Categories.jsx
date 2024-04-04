"use client";
import CategoryCards from "@/component/Cards/CategoryCards";
import { Box, CircularProgress, Grid } from "@mui/joy";
import React, { useEffect, useState } from "react";
import CircularSkeleton from "@/component/Skeleton/CircularSkeleton";
import api from "@/interceptor/api";

const initialQuery = { limit: 500, offset: 0 };
const Categories = () => {

    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState(initialQuery);
    const [result, setResult] = useState([]);
  
    const request = () => {
      const formData = new FormData();
      Object.keys(query).map((item) => {
        formData.append(item, query[item]);
      });
      formData.append("branch_id", "7");
      api
        .post("/get_categories", formData)
        .then((res) => {
          setResult(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
          setLoading(false);
        });
    };
  
    useEffect(() => {
      request();
    }, [query]);
  


  return (
    <Grid container display={"flex"} justifyContent={"center"} maxWidth="100%" my={2} rowGap={0} spacing={2}>
      {loading ? (
        // Loading state
        <CircularSkeleton />
      ) : result.length === 0 ? (
        // No data state
        <Grid item xs={12} textAlign="center" maxHeight={"600px"}>
          <img
            src={"/categaory.webp"}
            alt="No Data"
            style={{ maxHeight: "600px" }}
          />
        </Grid>
      ) : (
        // Render categories
        result.map((item, index) => (
          <Grid item xs={6} md={2} key={index}>
            <CategoryCards
              image={item.image}
              title={item.name}
              count={item.count}
              slug={item.slug}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Categories;
