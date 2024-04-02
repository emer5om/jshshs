import { AspectRatio, Box, Button, Card, Skeleton } from "@mui/joy";

const SkeletonBox = () => {
    return (
<Box width={"100%"} sx={{marginTop:3}} >
<Card
  sx={{
    width: 400,
  }}
>
  <Box
    display={"flex"}
    alignItems={"center"}
    justifyContent={"space-between"}
  >
    <Skeleton animation="wave" variant="text" sx={{ width: "45%" }} />
    <Skeleton animation="wave" variant="text" sx={{ width: "45%" }} />
  </Box>
  <AspectRatio ratio="21/9">
    <Skeleton animation="wave" variant="overlay">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1686548812883-9d3777f4c137?h=400&fit=crop&auto=format&dpr=2"
      />
    </Skeleton>
  </AspectRatio>
  <Box
    display={"flex"}
    alignItems={"center"}
    justifyContent={"space-between"}
  >
    <Skeleton animation="wave" variant="text" sx={{ width: "45%" }} />
    <Skeleton animation="wave" variant="text" sx={{ width: "45%" }} />
  </Box>
</Card>
</Box>

)
}

export default SkeletonBox