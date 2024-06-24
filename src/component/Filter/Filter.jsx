"use client";

import React, { useEffect } from "react";
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
  Chip,
} from "@mui/joy";

// icons
import GalleryLineIcon from "remixicon-react/LayoutGridFillIcon";
import ListCheck2Icon from "remixicon-react/ListCheck2Icon";

import {
  RiEqualizerLine as TuneIcon,
  RiCheckFill as Done,
} from "@remixicon/react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Filter = ({
  onViewChange,
  view,
  onCategorySelect,
  onTypeChange,
  onPriceChange,
  indicatorType,
}) => {
  const [alignment, setAlignment] = React.useState(view);

  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState(indicatorType);
  const [price, setPrice] = React.useState('High to Low');
  const [food, setFood] = React.useState();

  const homeStoreData = useSelector((state) => state.homepage);
  const categories = homeStoreData.categories;

  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    console.log(price);
    console.log(type);
    console.log(alignment);
  }, [price]);

  return (
    <Box>
      <Card
        sx={{
          display: "flex",
          alignItems: { xs: "center", md: "flex-end" },
          border: "none",
          px: 2,
          py: 3,
        }}
      >
        <CardContent orientation="horizontal">
          <Box>
            <Button
              sx={{
                padding: "12px",
                width: "100%",
              }}
              variant="outlined"
              color="neutral"
              startDecorator={<TuneIcon />}
              onClick={() => setOpen(true)}
            >
              {t("filter")}
            </Button>
          </Box>

          <RadioGroup
            size="sm"
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
          <DialogTitle>{t("filters")}</DialogTitle>
          <ModalClose />
          <Divider sx={{ mt: "auto" }} />

          <DialogContent sx={{ gap: 2 }}>
            <FormControl>
              <FormLabel sx={{ typography: "title-md", fontWeight: "bold" }}>
                {t("food-type")}
              </FormLabel>
              <RadioGroup
                value={indicatorType || ""}
                onChange={(e) => {
                  setType(e.target.value);
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
                      name: t("veg"),
                    },
                    {
                      name: t("non-veg"),
                    },
                  ].map((item) => (
                    <Card
                      key={item.name}
                      sx={{
                        boxShadow: "none",
                        "&:hover": { bgcolor: "background.level2" },
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
                {t("price-type")}
              </FormLabel>
              <RadioGroup
                value={price || ""}
                onChange={(event) => {
                  console.log("Price Change Event:", event.target.value); // Added for debugging
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
                      name: t("low-to-high"),
                    },
                    {
                      name: t("high-to-low"),
                    },
                  ].map((item) => (
                    <Card
                      key={item.name}
                      sx={{
                        boxShadow: "none",
                        "&:hover": { bgcolor: "background.level2" },
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
              {t("food")}
            </Typography>
            <RadioGroup
              value={price || ""}
              onChange={(event) => {
                setFood(event.target.value);
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                  gap: 1,
                  px: 2,
                }}
              >
                {categories.map((item) => (
                  <Chip
                    key={item.id}
                    sx={{
                      borderRadius: "sm",
                      maxWidth: "100%",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    color="primary"
                    variant="outlined"
                    startDecorator={
                      food === item.id && (
                        <Done sx={{ zIndex: 1, pointerEvents: "none" }} />
                      )
                    }
                  >
                    <Radio
                      disableIcon
                      overlay
                      checked={food == item.id}
                      variant="plain"
                      color="neutral"
                      label={item.name}
                      value={item.id}
                    ></Radio>
                  </Chip>
                ))}
              </Box>
            </RadioGroup>
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
                onTypeChange("");
                onPriceChange("");
                onCategorySelect("");
              }}
            >
              {t("clear")}
            </Button>

            <Button
              onClick={() => {
                onTypeChange(type);
                onPriceChange(price);
                onCategorySelect(food);
                setOpen(false);
              }}
            >
              {t("apply")}
            </Button>
          </Stack>
        </Sheet>
      </Drawer>
    </Box>
  );
};

export default Filter;
