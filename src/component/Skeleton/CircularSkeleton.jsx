import {
  AspectRatio,
  Box,
  Button,
  Card,
  Skeleton,
  Grid,
  Typography,
} from "@mui/joy";

const SkeletonBox = () => {
  return (
    <Grid mt={0.5} ml={0}  container spacing={2}>
      {[...Array(18)].map((_, index) => (
        <Grid item xs={6} sm={6} md={3} lg={2} key={index}>
          <Card
            sx={{
              width: "100%",
            }}
          >
            <Box
              width={"100px"}
              height={"100px"}
              sx={{ m: "auto", display: "flex",justifyContent:"center", alignItems: "center", gap: 2, }}
            >
              <Skeleton variant="circular" width={100} height={100} />
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Skeleton
                variant="rectangular"
                width={100}
                height="1em"
                sx={{ mb: 1,mt:1 }}
              />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonBox;
