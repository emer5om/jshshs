import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  DialogActions,
  Sheet,
  DialogContent,
  DialogTitle,
  Grid,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
  useTheme,
} from "@mui/joy";
import debounce from 'lodash.debounce';

import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { RiCrosshair2Fill, RiMapPinFill } from "@remixicon/react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { extractAddress } from "@/helpers/functonHelpers";
import { is_city_deliverable } from "@/interceptor/routes";
import toast from 'react-hot-toast';
import { onBranchIdChange } from "@/events/events";
import { useDispatch, useSelector } from "react-redux";
import { setAddress as setNewAddress } from "@/store/reducers/selectedMapAddressSlice";
import { setBranchId } from "@/store/reducers/branchSlice";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";

const LocationModal = () => {
  const initialCenter = { lat: 23.242, lng: 69.6669 }; // Default coordinates
  const zoomLevel = 11;
  const city = useSelector((state) => state.selectedCity.value);
  const [open, setOpen] = useState(false);
  const [map, setMap] = useState(null);
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 23.242,
    lng: 69.6669,
  }); // Initial selected location
  const autocompleteRef = useRef(null); // Ref for Autocomplete component
  const [address, setAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const dispatch = useDispatch();

  const handleLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  useMediaQuery;

  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));


  const handleMapClick = async (event) => {
    console.log("handleMapClick");

    setSelectedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });

    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();

    try {
      const results = await geocodeByAddress(`${latitude},${longitude}`);
      if (results && results.length > 0) {
        const address = results[0].formatted_address;

        // You can extract city name or other relevant information from the address
        const city = results[0].address_components.find((component) =>
          component.types.includes("locality")
        );

        if (city) {
          let delivery;
          try {
            delivery = await is_city_deliverable({
              name: city.long_name,
              latitude,
              longitude,
            });
            dispatch(setNewAddress({ city: city.long_name }));
            if (delivery.error) {
              return toast.error(delivery.message);
            } else {
              const branch_id = delivery.data[0].branch_id;
              dispatch(setBranchId(branch_id));
              onBranchIdChange({
                branch_id,
              });
              // setOpen(false);

              return toast.success(delivery.message);
            }
          } catch (error) {
            return toast.error(error.message);
          }
        } else {
          return toast.error("Please Select City");
        }
      }
    } catch (error) {
      console.error("Error geocoding coordinates:", error);
    }
  };

  const handleMapDrag =  (event) => {

    setSelectedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });

    // const latitude = event.latLng.lat();
    // const longitude = event.latLng.lng();

    // try {
    //   const results = await geocodeByAddress(`${latitude},${longitude}`);
    //   if (results && results.length > 0) {
    //     const address = results[0].formatted_address;

    //     // You can extract city name or other relevant information from the address
    //     const city = results[0].address_components.find((component) =>
    //       component.types.includes("locality")
    //     );

    //     if (city) {
    //       let delivery;
    //       try {
    //         delivery = await is_city_deliverable({
    //           name: city.long_name,
    //           latitude,
    //           longitude,
    //         });
    //         dispatch(setNewAddress({ city: city.long_name }));
    //         if (delivery.error) {
    //           return toast.error(delivery.message);
    //         } else {
    //           const branch_id = delivery.data[0].branch_id;
    //           dispatch(setBranchId(branch_id));
    //           onBranchIdChange({
    //             branch_id,
    //           });
    //           // setOpen(false);

    //           return toast.success(delivery.message);
    //         }
    //       } catch (error) {
    //         return toast.error(error.message);
    //       }
    //     } else {
    //       return toast.error("Please Select City");
    //     }
    //   }
    // } catch (error) {
    //   console.error("Error geocoding coordinates:", error);
    // }
  };


  const mapOptions = {
    streetViewControl: false, // Hide street view control
    zoomControl: true, // Show zoom control
  };

  const handlePlaceChanged = (place) => {
    if (!place) return;
    const newLocation = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    setSelectedLocation(newLocation);
    setMap((map) => map.setCenter(newLocation)); // Center map on selected place
  };

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);

      const completeAddress = extractAddress(results[0]);
      setSelectedAddress(results[0].formatted_address);
      setSelectedLocation(latLng);

      if (completeAddress.city === "") {
        return toast.error("Please Select City");
      }

      let delivery;
      try {
        delivery = await is_city_deliverable({
          name: completeAddress.city,
          latitude: latLng.lat,
          longitude: latLng.lng,
        });

        if (delivery.error) {
          return toast.error(delivery.message);
        } else {
          dispatch(setNewAddress({ city: completeAddress.city }));
          const branch_id = delivery.data[0].branch_id;
          dispatch(setBranchId(branch_id));

          onBranchIdChange({
            branch_id,
          });
          setOpen(false);

          return toast.success(delivery.message);
        }
      } catch (error) {
        console.log(error);
        return toast.error(error.message);
      }

    } catch (error) {
      console.error("Error selecting place: ", error);
    }
  };

  const handleLocationButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Do something with the latitude and longitude values
          setSelectedLocation({ lat: latitude, lng: longitude });
          try {
            const results = await geocodeByAddress(`${latitude},${longitude}`);
            if (results && results.length > 0) {
              const address = results[0].formatted_address;

              // You can extract city name or other relevant information from the address
              const city = results[0].address_components.find((component) =>
                component.types.includes("locality")
              );

              if (city) {
                let delivery;
                try {
                  delivery = await is_city_deliverable({
                    name: city.long_name,
                    latitude,
                    longitude,
                  });
                  dispatch(setNewAddress({ city: city.long_name }));
                  if (delivery.error) {
                    return toast.error(delivery.message);
                  } else {
                    const branch_id = delivery.data[0].branch_id;
                    dispatch(setBranchId(branch_id));

                    onBranchIdChange({
                      branch_id,
                    });
                    setOpen(false);
                    return toast.success(delivery.message);
                  }
                } catch (error) {
                  return toast.error(error.message);
                }
              } else {
                return toast.error("Please Select City");
              }
            }
          } catch (error) {
            console.error("Error geocoding coordinates:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleChange = (newAddress) => {
    setAddress(newAddress);
  };


  const debouncedHandleMapClick = debounce(handleMapClick, 500); // Debounce delay in milliseconds


  return (
    <>
      <Button
        variant="text"
        color="neutral"
        onClick={() => setOpen(true)}
        sx={{ p: 0, minWidth: "30px" }}
      >
        <RiMapPinFill  color={theme.palette.mode == "dark" ? "white" : "black" } />
      </Button>

      <Typography
        fontSize={16}
        onClick={() => setOpen(true)}
        fontWeight={"bolder"}
        sx={{ cursor: "pointer" }} // Set cursor to pointer
      >
        {city.city ?? "BHUJ"}
      </Typography>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          sx={{
            width: 800,
            maxHeight: "100%",
            overflowY: "auto", // Enable vertical scrolling if content overflows
            marginTop: 1,
            marginBottom: 1,
          }}
        >
          <ModalClose />
          <DialogTitle>
            <Typography fontSize={"lg"} fontWeight={"xl"}>
              {t("choose-your-location")}
            </Typography>
          </DialogTitle>

          <Grid container spacing={2} sx={{ flexGrow: 1, mt: 2 }}>
            <Grid xs={12}>
              <Card
                sx={{ maxWidth: { md: "50%", xs: "100%" }, cursor: "pointer" }}
                onClick={() => {
                  handleLocationButtonClick();
                }}
              >
                <CardContent
                  orientation="horizontal"
                  sx={{ alignItems: "center" }}
                >
                  <Box>
                    <RiCrosshair2Fill />
                  </Box>
                  <Box>
                    <Typography fontSize={"md"} fontWeight={"lg"}>
                      {t("detect-current-location")}
                    </Typography>
                    <Typography fontSize={"sm"} fontWeight={"md"}>
                      {t("using-GPS")}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12}>
              <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <Input
                      {...getInputProps({
                        placeholder: t("enter-address"),
                        className: "location-search-input",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion, index) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                            key={index}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ flexGrow: 1, mt: 2 }}>
            <Grid xs={12}>

              <GoogleMap
                mapContainerStyle={{
                  width: isMd ? "100%" : "100%",
                  height: isMd ? "500px" : isSm ? "400px" : "350px",
                }} // Adjust map height and width
                center={selectedLocation} // Set center based on selected location
                zoom={zoomLevel}
                onClick={debouncedHandleMapClick} // Add onClick event handler to the map
                options={mapOptions} // Set map options
              >
                <zoomControl /> Show zoom controls
                <MarkerF onDragEnd={(e) => handleMapDrag(e)} position={selectedLocation} draggable={true} />
              </GoogleMap>


            </Grid>
          </Grid>
          <DialogActions>
            <Button
              fullWidth
              color="success"
              variant="solid"
              onClick={() => setOpen(false)}
            >
              {t("use-this-location")}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default LocationModal;
