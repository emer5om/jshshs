import { Box, Grid } from "@mui/joy";

import HeadSlider from "@/component/Sliders/HeadSlider";
import Category from "@/component/Categories/Category";
import PopularCards from "@/component/Cards/PopularCards";
import SectionHeading from "@/component/SectionHeading/SectionHeading";
import DealsCards from "@/component/Cards/DealsCards";
import ActiveOrders from "@/component/UserActivity/ActiveOrders";
import Suggestions from "@/component/UserActivity/Suggestions";

const popularCardData = [
  {
    type: "veg",
    isLiked: false,
    image: "/images/demo-images/salad-1.png",
    title: "Fattoush salad",
    description: "Description of the food",
    price: "100.00",
    rating: "5.0",
  },
  {
    type: "veg",
    isLiked: false,
    image: "/images/demo-images/noodles.png",
    title: "Pan-Fried Noodles",
    description: "Description of the food",
    price: "50.00",
    rating: "4.9",
  },
  {
    type: "non-veg",
    isLiked: false,
    image: "/images/demo-images/pizza-1.png",
    title: "Spicy Burger",
    description: "Description of the food",
    price: "70.00",
    rating: "4.8",
  },
  {
    type: "non-veg",
    isLiked: false,
    image: "/images/demo-images/pizza-1.png",
    title: "Spicy Burger",
    description: "Description of the food",
    price: "90.00",
    rating: "4.7",
  },
];

const categoryData = [
  {
    image: "/images/demo-images/category-1.png",
    title: "Main Dish",
    count: "100",
  },
  {
    image: "/images/demo-images/category-2.png",
    title: "Break fast",
    count: "50",
  },
  {
    image: "/images/demo-images/category-3.png",
    title: "Dessert",
    count: "200",
  },
  {
    image: "/images/demo-images/category-4.png",
    title: "Chinese Food",
    count: "25",
  },
  {
    image: "/images/demo-images/category-5.png",
    title: "South Indian",
    count: "30",
  },
  {
    image: "/images/demo-images/category-6.png",
    title: "Beverages",
    count: "300",
  },
];

const hotDeals = [
  { image: "/images/demo-images/offer-image-1.png", link: "#" },
  { image: "/images/demo-images/offer-image-2.jpg", link: "#" },
  { image: "/images/demo-images/offer-image-3.jpg", link: "#" },
  { image: "/images/demo-images/offer-images-4.jpeg", link: "#" },
];


const reorderData = [
  {
    image: "/images/demo-images/reorder-1.png",
    type: "veg",
    title: "Fattoush salad",
    titleQty: "1",
    other: "4",
    daysAgo: "20 Days Ago",
  },
  {
    image: "/images/demo-images/reorder-2.png",
    type: "veg",
    title: "Fattoush salad",
    titleQty: "1",
    other: "4",
    daysAgo: "20 Days Ago",
  },
  {
    image: "/images/demo-images/reorder-3.png",
    type: "veg",
    title: "Fattoush salad",
    titleQty: "1",
    other: "4",
    daysAgo: "20 Days Ago",
  },
];

export default function Home() {
  return (
    <Box>
      <HeadSlider
        images={[
          "/images/sliders/slider_1.png",
          "/images/sliders/slider_2.png",
          "/images/sliders/slider_3.png",
        ]}
      />

      <Box mt={4}>
        <Category data={categoryData} />
      </Box>

      <Box>
        <PopularCards data={popularCardData} />
      </Box>

      <Box>
        <DealsCards link={"#"} images={hotDeals} />
      </Box>

      <Box>
        <Grid container spacing={2} mt={4}>
          <Grid xs={12} md={6}>
            <ActiveOrders></ActiveOrders>
          </Grid>
          <Grid xs={12} md={6}>
            <Suggestions data={reorderData}></Suggestions>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
