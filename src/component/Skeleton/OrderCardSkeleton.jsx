import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Skeleton,
  Grid,
  Button,
} from "@mui/joy";

const OrderCardSkeleton = () => {
  return (
    <Grid sx={{ mx: 2 }} container spacing={2}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} md={6} key={index} textAlign="center">
          <Card sx={{ maxWidth: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                maxWidth: "100%",
              }}
            >
              {/* Header */}
              <Box
                display={"flex"}
                alignItems={"flex-start"}
                justifyContent={"space-between"}
              >
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <Box maxHeight={"100%"} maxWidth={"100%"}>
                    <Skeleton variant="circular" width={70} height={70} />
                  </Box>

                  <Box>
                    <Typography fontSize={"md"} fontWeight={"lg"}>
                      <Skeleton width={100} />
                    </Typography>

                    <Typography fontSize={"sm"} fontWeight={"md"}>
                      <Skeleton width={80} />
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Skeleton variant="rectangular" width={80} height={32} />
                </Box>
              </Box>

              {/* Body */}
              <Box
                display={"flex"}
                alignItems={"center"}
                flexDirection={{ xs: "column", md: "row" }}
                justifyContent={"space-between"}
                maxWidth={"100%"}
                sx={{
                  borderTop: `1px dashed #ccc`,
                  borderBottom: `1px dashed #ccc`,
                  py: 2,
                }}
              >
                <Box
                  display={"flex"}
                  flexDirection={{ xs: "row", md: "row" }}
                  alignItems={"center"}
                  gap={1}
                  width={"95%"}
                >
                  <Box minWidth={"20px"} maxWidth={"20px"} maxHeight={"20px"}>
                    <Skeleton variant="rectangular" width={20} height={20} />
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={1}
                    width={"100%"}
                  >
                    <Typography fontSize={"md"} fontWeight={"lg"}>
                      <Skeleton width={40} />
                    </Typography>
                    <Typography>
                      <Skeleton>
                        Lorem ipsum is placeholder text commonly used
                      </Skeleton>
                    </Typography>
                  </Box>
                </Box>

                <Box
                  minWidth={{ md: "5%", xs: "100%" }}
                  alignItems={"center"}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  <Skeleton variant="circular" width={32} height={32} />
                </Box>
              </Box>

              {/* Footer */}
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{
                  borderBottom: `1px dashed #ccc`,
                  py: 2,
                }}
              >
             
         
               
             <Typography>
                      <Skeleton>
                        Lorem ipsum
                      </Skeleton>
                    </Typography>  <Typography>
                      <Skeleton>
                        Lorem 
                      </Skeleton>
                    </Typography>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Button sx={{ width: "100%" }}>
                  Read more
                  <Skeleton animation="wave" />
                </Button>
                <Button sx={{ width: "100%" }}>
                  Read more
                  <Skeleton animation="wave" />
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderCardSkeleton;
