import { Box, Grid } from "@mui/joy";

import HeadSlider from "@/component/Sliders/HeadSlider";
import Category from "@/component/Categories/Category";
import PopularCards from "@/component/Cards/PopularCards";
import SectionHeading from "@/component/SectionHeading/SectionHeading";
import DealsCards from "@/component/Cards/DealsCards";
import ActiveOrders from "@/component/UserActivity/ActiveOrders";
import Suggestions from "@/component/UserActivity/Suggestions";
import DelightfulDishes from "@/component/Products/DelightfulDishes";
import Offers from "@/component/Products/Offers";
import NewItems from "@/component/Products/NewItems";

import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import SpecificItem from "@/component/Categories/SpecificItem";
import SearchBar from "@/component/GlobalSearch/SearchBar";

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
];

const hotDeals = [
  { image: "/images/demo-images/offer-image-1.png", link: "#" },
  { image: "/images/demo-images/offer-image-2.jpg", link: "#" },
  { image: "/images/demo-images/offer-image-3.jpg", link: "#" },
  { image: "/images/demo-images/offer-images-4.jpeg", link: "#" },
  { image: "/images/demo-images/offer-image-1.png", link: "#" },
  { image: "/images/demo-images/offer-image-2.jpg", link: "#" },
  { image: "/images/demo-images/offer-image-3.jpg", link: "#" },
  { image: "/images/demo-images/offer-images-4.jpeg", link: "#" },
];

const reorderData = [
  {
    image: "/images/demo-images/reorder-1.png",
    type: "non-veg",
    title: "Indian Punjabi Cuisine Thali",
    titleQty: "1",
    other: "4",
    daysAgo: "20 Days Ago",
  },
  {
    image: "/images/demo-images/reorder-2.png",
    type: "veg",
    title: "Ice cream balls with cookies",
    titleQty: "2",
    other: "4",
    daysAgo: "2 Days Ago",
  },
  {
    image: "/images/demo-images/reorder-3.png",
    type: "veg",
    title: "Tortilla Wraps with fresh salad",
    titleQty: "6",
    other: "4",
    daysAgo: "10 Days Ago",
  },
];

const dishesData = [
  {
    image: "/images/demo-images/dish-1.jpeg",
    type: "veg",
    rating: "5.0",
    isLiked: false,
    categoryName: "Healthy Salad",
    title: "Good Food",
    price: 120.0,
    discountedPrice: 100,
    discount: "20%",
  },
  {
    image: "/images/demo-images/dish-2.png",
    type: "non-veg",
    rating: "4.8",
    isLiked: false,
    categoryName: "Pizza",
    title: "Peperoni Pizza",
    price: 100.0,
    discountedPrice: 90,
    discount: "10%",
  },
  {
    image: "/images/demo-images/dish-3.png",
    type: "non-veg",
    rating: "4.9",
    isLiked: false,
    categoryName: "Burger",
    title: "Big MAC",
    price: 100.0,
    discountedPrice: 80,
    discount: "30%",
  },
  {
    image: "/images/demo-images/dish-4.jpeg",
    type: "veg",
    rating: "4.7",
    isLiked: false,
    categoryName: "Indian special",
    title: "Pani Poori",
    price: 180.0,
    discountedPrice: 150.0,
    discount: "5%",
  },
  {
    image: "/images/demo-images/dish-5.jpeg",
    type: "veg",
    rating: "4.9",
    isLiked: false,
    categoryName: "Healthy Salad",
    title: "Good Food",
    price: 180.0,
    discountedPrice: 150.0,
    discount: "15%",
  },
  {
    image: "/images/demo-images/dish-6.jpeg",
    type: "veg",
    rating: "4.9",
    isLiked: false,
    categoryName: "Healthy Salad",
    title: "Good Food",
    price: 180.0,
    discountedPrice: 150.0,
    discount: "9%",
  },
];

const offerFoodData = [
  {
    image: "/images/demo-images/offer-food-1.png",
    title: "Meat Sandwich",
    discount: "10",
    price: "10.00",
  },
  {
    image: "/images/demo-images/offer-food-2.png",
    title: "Cheesy Pizza",
    discount: "10",
    price: "50.60",
  },
  {
    image: "/images/demo-images/offer-food-3.png",
    title: "Hot & Spicy Maggie",
    discount: "5",
    price: "8.60",
  },
  {
    image: "/images/demo-images/offer-food-2.png",
    title: "Margherita Pizza",
    discount: "10",
    price: "50.60",
  },
  {
    image: "/images/demo-images/offer-food-4.png",
    title: "Veg Biryani",
    discount: "15",
    price: "15.90",
  },
  {
    image: "/images/demo-images/offer-food-2.png",
    title: "Mexican Pizza",
    discount: "10",
    price: "50.60",
  },
];

const newProducts = [
  {
    image: "/images/demo-images/offer-food-1.png",
    title: "Meat Sandwich",
    discount: "10",
    price: "10.00",
  },
  {
    image: "/images/demo-images/offer-food-2.png",
    title: "Cheesy Pizza",
    discount: "10",
    price: "50.60",
  },
  {
    image: "/images/demo-images/offer-food-3.png",
    title: "Hot & Spicy Maggie",
    discount: "5",
    price: "8.60",
  },
  {
    image: "/images/demo-images/offer-food-2.png",
    title: "Margherita Pizza",
    discount: "10",
    price: "50.60",
  },
];

const specificProductData = [
  {
    image: "/images/demo-images/burger-1.png",
    title: "Simple Burger",
    ratings: "4.5",
    price: "10",
    discountedPrice: "9.5",
  },
  {
    image: "/images/demo-images/burger-2.png",
    title: "Cheese Burger",
    ratings: "4.6",
    price: "10",
    discountedPrice: "9.4",
  },
  {
    image: "/images/demo-images/burger-3.png",
    title: "Spicy Burger",
    ratings: "4.7",
    price: "10",
    discountedPrice: "9.7",
  },
  {
    image: "/images/demo-images/burger-4.png",
    title: "Extra Cheesy Burger",
    ratings: "4.0",
    price: "10",
    discountedPrice: "9.99",
  },
];

export const metadata = {
  title: "eRestro Single vendor",
  description: "eRestro single vendor, orders foods and stuff ",
};

export default function Home() {
  return (
    <Box>
      <Box sx={{ display: {xs: "block", md: "none"} }}>
        <SearchBar />
      </Box>

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

      {/* Delightful Dishes */}
      <Box>
        <DelightfulDishes data={dishesData}></DelightfulDishes>
      </Box>

      <Box>
        <Offers data={offerFoodData}></Offers>
      </Box>

      <Box>
        <NewItems data={newProducts}></NewItems>
      </Box>

      <Box>
        <SpecificItem data={specificProductData} />
      </Box>
    </Box>
  );
}
