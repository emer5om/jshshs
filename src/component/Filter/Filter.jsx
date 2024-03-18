// "use client";

// import React from 'react'
// import { Box, Card, Grid, useTheme, Typography, RadioGroup, List, ListItem, Radio, Checkbox, CardContent, radioClasses, Tabs, TabList, Tab, TabPanel } from '@mui/joy';

// // icons
// import Filter3FillIcon from "remixicon-react/Filter3FillIcon"
// import GalleryLineIcon from "remixicon-react/LayoutGridFillIcon"
// import ListCheck2Icon from "remixicon-react/ListCheck2Icon"

// const Filter = ({ onViewChange, view, onCategorySelect, onTypeChange, onPriceChange }) => {
//     const [alignment, setAlignment] = React.useState(view);
//     const theme = useTheme();
//     return (
//         <Box>
//             <Card sx={{ maxWidth: "100%", borderRadius: "xl" }}>

//                 <Grid container spacing={2} sx={{ p: 2 }}>
//                     <Grid xs={12} md={5}>
//                         <Box>
//                             <Filter3FillIcon fontWeight={theme.fontWeight.xl} />
//                         </Box>
//                         <Grid container spacing={2} sx={{ p: 2 }}>
//                             <Grid xs={12} md={6}>
//                                 <Box display={"flex"} flexDirection={"column"} gap={1} width={"100%"}>
//                                     <Box>
//                                         <Typography fontSize={"lg"} fontWeight={"xl"}> Food Type </Typography>
//                                     </Box>
//                                     <Box>
//                                         <RadioGroup aria-label="Your plan" name="food-type" defaultValue="Individual"
//                                             onChange={e => onTypeChange(e.target.value)}
//                                         >
//                                             <List
//                                                 sx={{
//                                                     minWidth: "100%",
//                                                     // '--List-gap': '0.5rem',
//                                                     '--ListItem-paddingY': '1rem',
//                                                     '--ListItem-paddingRight': '1.5rem',
//                                                     '--ListItem-radius': '8px',
//                                                     '--ListItemDecorator-size': '32px',
//                                                     px: 0,
//                                                     px: 0,
//                                                     display: "flex",
//                                                     width: "100%",
//                                                     flexDirection: { md: "row", xs: "column" },
//                                                     gap: 1,
//                                                     alignItems: "center"

//                                                 }}
//                                             // orientation={{ xs: "vertical", sm: "horizontal" }}
//                                             >

//                                                 {['Pure Veg', 'Non Veg'].map((item, index) => (
//                                                     <ListItem variant="outlined" key={item} sx={{
//                                                         boxShadow: 'sm', "&:hover": {
//                                                             cursor: "pointer", // Optional: Add pointer cursor
//                                                             backgroundColor: theme.palette.primary[100]
//                                                         },
//                                                     }}>
//                                                         <Radio
//                                                             overlay
//                                                             value={item}
//                                                             label={item}
//                                                             sx={{
//                                                                 flexGrow: 1,
//                                                             }}
//                                                             slotProps={{
//                                                                 action: ({ checked }) => ({
//                                                                     sx: (theme) => ({
//                                                                         ...(checked && {
//                                                                             inset: -1,
//                                                                         }),
//                                                                     }),
//                                                                 }),
//                                                             }}
//                                                         />
//                                                     </ListItem>
//                                                 ))}

//                                             </List>
//                                         </RadioGroup>
//                                     </Box>
//                                 </Box>
//                             </Grid>
//                             <Grid xs={12} md={6}>
//                                 <Box display={"flex"} flexDirection={"column"} gap={1} width={"100%"} alignItems={"start"}>
//                                     <Box>
//                                         <Typography fontSize={"lg"} fontWeight={"xl"}> Price </Typography>
//                                     </Box>
//                                     <Box>
//                                         <RadioGroup aria-label="Your plan" name="price" defaultValue="Individual"
//                                         onChange={e => onPriceChange(e.target.value)}
//                                         >
//                                             <List
//                                                 sx={{
//                                                     minWidth: "100%",
//                                                     // '--List-gap': '0.5rem',
//                                                     '--ListItem-paddingY': '1rem',
//                                                     '--ListItem-paddingRight': '1.5rem',
//                                                     '--ListItem-radius': '8px',
//                                                     '--ListItemDecorator-size': '32px',
//                                                     px: 0,
//                                                     px: 0,
//                                                     display: "flex",
//                                                     width: "100%",
//                                                     flexDirection: { md: "row", xs: "column" },
//                                                     gap: 1,
//                                                     alignItems: "center"
//                                                 }}
//                                             // orientation="horizontal"
//                                             >
//                                                 {['Low to High', 'Hight to Low'].map((item, index) => (
//                                                     <ListItem variant="outlined" key={item} sx={{
//                                                         boxShadow: 'sm', "&:hover": {
//                                                             cursor: "pointer", // Optional: Add pointer cursor
//                                                             backgroundColor: theme.palette.primary[100],
//                                                         },
//                                                     }}>
//                                                         <Radio
//                                                             overlay
//                                                             value={item}
//                                                             label={item}
//                                                             sx={{
//                                                                 flexGrow: 1,
//                                                                 maxWidth: "100%"
//                                                             }}
//                                                             slotProps={{
//                                                                 action: ({ checked }) => ({
//                                                                     sx: (theme) => ({
//                                                                         ...(checked && {
//                                                                             inset: -1,
//                                                                         }),
//                                                                     }),
//                                                                 }),
//                                                             }}
//                                                         />
//                                                     </ListItem>
//                                                 ))}
//                                             </List>
//                                         </RadioGroup>
//                                     </Box>
//                                 </Box>
//                             </Grid>
//                         </Grid>
//                         {/* <Box display={"flex"} flexDirection={"column"} gap={1}>
//                         </Box> */}
//                     </Grid>
//                     <Grid xs={12} md={7}>

//                         <Box sx={{ width: "100%" }}>
//                             <div role="group" aria-labelledby="topping">
//                                 <List
//                                     orientation="horizontal"
//                                     wrap
//                                     sx={{
//                                         '--List-gap': '8px',
//                                         '--ListItem-radius': '20px',
//                                     }}
//                                 >
//                                     {[
//                                         'Spicy Burger',
//                                         'Fried Chicken',
//                                         'Chole Bhature',
//                                         'Delicious Desserts',
//                                         'South Indian',
//                                         'Crispy Wrap',
//                                         'Healthy Salad',
//                                         'Cheese SandWich',
//                                         'Delicious Thali',
//                                         'North Indian',
//                                         'Chinese Food',
//                                         'Break Fast',
//                                         'Juice',
//                                         'Cold Beverages',
//                                         'Hot Beverages',
//                                     ].map((item, index) => (
//                                         <ListItem key={item}>
//                                             <Checkbox
//                                                 overlay
//                                                 disableIcon
//                                                 variant="outlined"
//                                                 label={item}
//                                                 name={item}
//                                                 onChange={e => onCategorySelect(e.target.checked, e.target.name)}
//                                                 slotProps={{
//                                                     action: ({ checked }) => ({
//                                                         sx: (theme) => ({
//                                                             ...(checked && {
//                                                                 backgroundColor: "primary.100"
//                                                             }),
//                                                         }),
//                                                     }),
//                                                 }}
//                                             />
//                                         </ListItem>
//                                     ))}
//                                 </List>
//                             </div>
//                         </Box>

//                     </Grid>
//                 </Grid>
//             </Card>

//             <Card sx={{ display: "flex", alignItems: { xs: "center", md: "flex-end" }, border: "none", px: 0, py: 3 }}>
//                 <CardContent>
//                     <RadioGroup
//                         orientation="horizontal"
//                         aria-label="Alignment"
//                         name="alignment"
//                         variant="outlined"
//                         value={alignment}
//                         onChange={(event) => {
//                             setAlignment(event.target.value);
//                             onViewChange(event.target.value); // Call the onViewChange function with the new alignment
//                         }}
//                     >
//                         {['gallery', 'list'].map((item) => (
//                             <Box
//                                 key={item}
//                                 sx={(theme) => ({
//                                     position: 'relative',
//                                     display: 'flex',
//                                     justifyContent: 'center',
//                                     alignItems: 'center',
//                                     width: 48,
//                                     height: 48,
//                                     '&:not([data-first-child])': {
//                                         borderLeft: '1px solid',
//                                         borderColor: 'divider',
//                                     },
//                                     [`&[data-first-child] .${radioClasses.action}`]: {
//                                         borderTopLeftRadius: `calc(${theme.vars.radius.sm} - 1px)`,
//                                         borderBottomLeftRadius: `calc(${theme.vars.radius.sm} - 1px)`,
//                                     },
//                                     [`&[data-last-child] .${radioClasses.action}`]: {
//                                         borderTopRightRadius: `calc(${theme.vars.radius.sm} - 1px)`,
//                                         borderBottomRightRadius: `calc(${theme.vars.radius.sm} - 1px)`,
//                                     },
//                                 })}
//                             >
//                                 <Radio
//                                     value={item}
//                                     disableIcon
//                                     overlay
//                                     label={
//                                         {
//                                             gallery: <GalleryLineIcon />,
//                                             list: <ListCheck2Icon />,
//                                         }[item]
//                                     }
//                                     variant={alignment === item ? 'solid' : 'plain'}
//                                     slotProps={{
//                                         input: { 'aria-label': item },
//                                         action: {
//                                             sx: { borderRadius: 0, transition: 'none' },
//                                         },
//                                         label: { sx: { lineHeight: 0 } },
//                                     }}
//                                 />
//                             </Box>
//                         ))}
//                     </RadioGroup>
//                 </CardContent>
//             </Card>
//         </Box>
//     )
// }

// export default Filter

"use client";

import React from "react";
import {
  Box,
  Card,
  Grid,
  useTheme,
  Typography,
  RadioGroup,
  ListItem,
  Radio,
  Checkbox,
  CardContent,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  AspectRatio,
  Drawer,
  Button,
  DialogTitle,
  DialogContent,
  ModalClose,
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  List,
  Stack,
  Sheet,
  Switch,
  radioClasses,
} from "@mui/joy";

import {
  TuneRounded as TuneIcon,
  HomeRounded as HomeIcon,
  ApartmentRounded as ApartmentIcon,
  MeetingRoomRounded as MeetingRoomIcon,
  HotelRounded as HotelIcon,
  Done,
} from "@mui/icons-material";

// icons
import Filter3FillIcon from "remixicon-react/Filter3FillIcon";
import GalleryLineIcon from "remixicon-react/LayoutGridFillIcon";
import ListCheck2Icon from "remixicon-react/ListCheck2Icon";

const Filter = ({
  onViewChange,
  view,
  onCategorySelect,
  onTypeChange,
  onPriceChange,
}) => {
  const [alignment, setAlignment] = React.useState(view);

  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("Veg");
  const [price, setPrice] = React.useState("Low to High");
  const [food, setFood] = React.useState([0]);

  const theme = useTheme();
  return (
    <Box>
      <Card sx={{ maxWidth: "100%", borderRadius: "xl" }}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid xs={12} md={5}>
            <Box>
              <Button
                variant="outlined"
                color="neutral"
                startDecorator={<TuneIcon />}
                onClick={() => setOpen(true)}
              >
                filter
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Card
        sx={{
          display: "flex",
          alignItems: { xs: "center", md: "flex-end" },
          border: "none",
          px: 0,
          py: 3,
        }}
      >
        <CardContent>
          <RadioGroup
            orientation="horizontal"
            aria-label="Alignment"
            name="alignment"
            variant="outlined"
            value={alignment}
            onChange={(event) => {
              setAlignment(event.target.value);
              onViewChange(event.target.value); // Call the onViewChange function with the new alignment
            }}
          >
            {["gallery", "list"].map((item) => (
              <Box
                key={item}
                sx={(theme) => ({
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 48,
                  height: 48,
                  "&:not([data-first-child])": {
                    borderLeft: "1px solid",
                    borderColor: "divider",
                  },
                  [`&[data-first-child] .${radioClasses.action}`]: {
                    borderTopLeftRadius: `calc(${theme.vars.radius.sm} - 1px)`,
                    borderBottomLeftRadius: `calc(${theme.vars.radius.sm} - 1px)`,
                  },
                  [`&[data-last-child] .${radioClasses.action}`]: {
                    borderTopRightRadius: `calc(${theme.vars.radius.sm} - 1px)`,
                    borderBottomRightRadius: `calc(${theme.vars.radius.sm} - 1px)`,
                  },
                })}
              >
                <Radio
                  value={item}
                  disableIcon
                  overlay
                  label={
                    {
                      gallery: <GalleryLineIcon />,
                      list: <ListCheck2Icon />,
                    }[item]
                  }
                  variant={alignment === item ? "solid" : "plain"}
                  slotProps={{
                    input: { "aria-label": item },
                    action: {
                      sx: { borderRadius: 0, transition: "none" },
                    },
                    label: { sx: { lineHeight: 0 } },
                  }}
                />
              </Box>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Drawer
        size="md"
        variant="plain"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          content: {
            sx: {
              bgcolor: "transparent",
              p: { md: 3, sm: 0 },
              boxShadow: "none",
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: "md",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <DialogTitle>Filters</DialogTitle>
          <ModalClose />
          <Divider sx={{ mt: "auto" }} />

          <DialogContent sx={{ gap: 2 }}>
            <FormControl>
              <FormLabel sx={{ typography: "title-md", fontWeight: "bold" }}>
                Food type
              </FormLabel>
              <RadioGroup
                value={type || ""}
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: 1.5,
                  }}
                >
                  {[
                    {
                      name: "Veg",
                    },
                    {
                      name: "Non - Veg",
                    },
                  ].map((item) => (
                    <Card
                      key={item.name}
                      sx={{
                        boxShadow: "none",
                        "&:hover": { bgcolor: "background.level1" },
                      }}
                    >
                      <CardContent>
                        {item.icon}
                        <Typography level="title-md">{item.name}</Typography>
                      </CardContent>
                      <Radio
                        disableIcon
                        overlay
                        checked={type === item.name}
                        variant="outlined"
                        color="neutral"
                        value={item.name}
                        sx={{ mt: -2 }}
                        slotProps={{
                          action: {
                            sx: {
                              ...(type === item.name && {
                                borderWidth: 2,
                                borderColor:
                                  "var(--joy-palette-primary-outlinedBorder)",
                              }),
                              "&:hover": {
                                bgcolor: "transparent",
                              },
                            },
                          },
                        }}
                      />
                    </Card>
                  ))}
                </Box>
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel sx={{ typography: "title-md", fontWeight: "bold" }}>
                Price type
              </FormLabel>
              <RadioGroup
                value={price || ""}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: 1.5,
                  }}
                >
                  {[
                    {
                      name: "Low to High",
                    },
                    {
                      name: "High to Low",
                    },
                  ].map((item) => (
                    <Card
                      key={item.name}
                      sx={{
                        boxShadow: "none",
                        "&:hover": { bgcolor: "background.level1" },
                      }}
                    >
                      <CardContent>
                        {item.icon}
                        <Typography level="title-md">{item.name}</Typography>
                      </CardContent>
                      <Radio
                        disableIcon
                        overlay
                        checked={price === item.name}
                        variant="outlined"
                        color="neutral"
                        value={item.name}
                        sx={{ mt: -2 }}
                        slotProps={{
                          action: {
                            sx: {
                              ...(price === item.name && {
                                borderWidth: 2,
                                borderColor:
                                  "var(--joy-palette-primary-outlinedBorder)",
                              }),
                              "&:hover": {
                                bgcolor: "transparent",
                              },
                            },
                          },
                        }}
                      />
                    </Card>
                  ))}
                </Box>
              </RadioGroup>
            </FormControl>

            <Typography level="title-md" fontWeight="bold" sx={{ mt: 1 }}>
              Food
            </Typography>
            <div role="group" aria-labelledby="rank">
              <List
                orientation="vertical"
                size="sm"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 1.5,
                  px: 1,
                  //   '--List-gap': '12px',
                  "--ListItem-radius": "20px",
                }}
              >
                {[
                  "Spicy Burger",
                  "Fried Chicken",
                  "Chole Bhature",
                  "Delicious Desserts",
                  "South Indian",
                  "Crispy Wrap",
                  "Healthy Salad",
                  "Cheese SandWich",
                  "Delicious Thali",
                  "North Indian",
                  "Chinese Food",
                  "Break Fast",
                  "Juice",
                  "Cold Beverages",
                  "Hot Beverages",
                ].map((item, index) => {
                  const selected = food.includes(index);
                  return (
                    <ListItem key={item}>
                      <AspectRatio
                        variant={selected ? "solid" : "outlined"}
                        color={selected ? "primary" : "neutral"}
                        ratio={1}
                        sx={{ width: 20, borderRadius: 20, ml: -0.5, mr: 0.75 }}
                      >
                        <div>{selected && <Done fontSize="md" />}</div>
                      </AspectRatio>
                      <Checkbox
                        size="sm"
                        color="neutral"
                        disableIcon
                        overlay
                        label={item}
                        variant="outlined"
                        checked={selected}
                        onChange={(event) =>
                          setFood((prev) => {
                            const set = new Set([...prev, index]);
                            if (!event.target.checked) {
                              set.delete(index);
                            }

                            return [...set];
                          })
                        }
                        slotProps={{
                          action: {
                            sx: {
                              "&:hover": {
                                bgcolor: "transparent",
                              },
                            },
                          },
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </DialogContent>

          <Divider sx={{ mt: "auto" }} />
          <Stack
            direction="row"
            justifyContent="space-between"
            useFlexGap
            spacing={1}
          >
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => {
                setType("");
                setPrice("");
                setFood([]);
              }}
            >
              Clear
            </Button>
            <Button onClick={() => setOpen(false)}>Apply</Button>
          </Stack>
        </Sheet>
      </Drawer>
    </Box>
  );
};

export default Filter;
