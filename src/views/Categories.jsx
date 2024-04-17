"use client";
import CategoryCards from "@/component/Cards/CategoryCards";
import { Box, CircularProgress, Grid, Button } from "@mui/joy";
import React, { useEffect, useState } from "react";
import CircularSkeleton from "@/component/Skeleton/CircularSkeleton";
import api from "@/interceptor/api";
import { useTranslation } from "react-i18next";

const initialQuery = { limit: 6, offset: 0 };

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const [isLoadingSeeMore, setIsLoadingSeeMore] = useState(false);

  const {t} = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("branch_id", "7");
        formData.append("limit", initialQuery.limit);
        formData.append("offset", initialQuery.offset);

        const response = await api.post("/get_categories", formData);
        const data = response.data.data;

        console.log(response.data.total);

        if (data.length === 0) {
          setEndReached(true);
        } else {
          setResult(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleLoadMore = async () => {
    try {
      setIsLoadingSeeMore(true);
      const formData = new FormData();
      formData.append("branch_id", "7");
      formData.append("limit", initialQuery.limit);
      formData.append("offset", result.length);

      const response = await api.post("/get_categories", formData);
      const data = response.data.data;

      if (data.length === 0) {
        setEndReached(true);
      } else {
        setResult((prevResult) => [...prevResult, ...data]);
      }
    } catch (error) {
      console.error("Error fetching more categories:", error);
    } finally {
      setIsLoadingSeeMore(false);
    }
  };

  return (
    <>
    <Grid
      container
      display={"flex"}
      mx={0}
      justifyContent={"center"}
      maxWidth="100%"
      my={2}
      rowGap={0}
      spacing={2}
    >
      {loading ? (
        <CircularSkeleton />
      ) : result.length === 0 ? (
        <Grid item xs={12} textAlign="center" maxHeight={"600px"}>
          <img
            src={"/categaory.webp"}
            alt="No Data"
            style={{ maxHeight: "600px" }}
          />
        </Grid>
      ) : (
        <>
          {result.map((item, index) => (
            <Grid item xs={6} md={2} key={index}>
              <CategoryCards
                image={item.image}
                title={item.name}
                count={item.count}
                slug={item.slug}
              />
            </Grid>
          ))}
         
        </>
        
      )}
      
    </Grid>
    {!endReached && (
 

 <Box display="flex" justifyContent="center" mt={4}>
   <Button disabled={isLoadingSeeMore} onClick={handleLoadMore}>
     {isLoadingSeeMore ? (
       <CircularProgress
         variant="solid"
         sx={{ fontSize: "200px" }}
       />
     ) : (
       t("show-more")
     )}
   </Button>
 </Box>
)}
</>
  );
};

export default Categories;
