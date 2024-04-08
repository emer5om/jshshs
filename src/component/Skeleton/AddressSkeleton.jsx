import { Grid, Box, Button, Card, CardContent, Checkbox, Skeleton, CardActions } from "@mui/joy";

const SkeletonBox = () => {
  return (
    <Grid  container spacing={2} sx={{ flexGrow: 1 ,mx:0.1}}>
      {[...Array(6)].map((_, index) => (
        <Grid  item key={index} xs={12} md={4}>
          <Card >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Box
                maxWidth={"90%"}
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
                gap={2}
              >
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <Skeleton variant="circular" width={30} height={30} /> {/* Placeholder for icon */}
                  <Skeleton variant="text" width={100} /> {/* Placeholder for text */}
                </Box>
                <Box>
                  <Skeleton variant="text" width={200} /> {/* Placeholder for text */}
                </Box>
              </Box>
              <Box>
                <Checkbox disabled />
              </Box>
            </CardContent>
            <CardActions>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Button disabled> {/* Placeholder for Button */}
                  <Skeleton variant="text" width={100} /> {/* Placeholder for text */}
                </Button>
                <Button disabled> {/* Placeholder for Button */}
                  <Skeleton variant="text" width={100} /> {/* Placeholder for text */}
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonBox;
