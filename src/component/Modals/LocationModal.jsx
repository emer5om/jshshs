import React, { useState, useRef } from 'react';
import { Box, Button, Card, CardContent, DialogActions, DialogContent, DialogTitle, Grid, Input, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { RiCrosshair2Fill, RiMapPinFill } from '@remixicon/react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';
import { extractAddress } from '@/helpers/functonHelpers';
import { is_city_deliverable } from '@/interceptor/routes';
import { toast } from 'react-toastify';
import { onBranchIdChange } from '@/events/events';
import { useDispatch } from 'react-redux';
import { setAddress as setNewAddress } from '@/store/reducers/selectedMapAddressSlice';

const LocationModal = () => {
    const initialCenter = { lat: 23.2420, lng: 69.6669 }; // Default coordinates
    const zoomLevel = 11;

    const [open, setOpen] = useState(false);
    const [map, setMap] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(initialCenter); // Initial selected location
    const autocompleteRef = useRef(null); // Ref for Autocomplete component
    const [address, setAddress] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const dispatch = useDispatch();

    const handleLoad = (mapInstance) => {
        setMap(mapInstance);
    };

    const containerStyle = {
        width: '100%',
        height: '500px'
    };

    const handleMapClick = async (event) => {
        setSelectedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });

        const latitude = event.latLng.lat();
        const longitude = event.latLng.lng();

        try {
            const results = await geocodeByAddress(`${latitude},${longitude}`);
            if (results && results.length > 0) {
                const address = results[0].formatted_address;

                // You can extract city name or other relevant information from the address
                const city = results[0].address_components.find(component =>
                    component.types.includes('locality')
                );

                if (city) {
                    console.log('City:', city.long_name);
                    let delivery
                    try {
                        delivery = await is_city_deliverable({
                            name: city.long_name,
                            latitude,
                            longitude
                        })
                        dispatch(setNewAddress({ city: city.long_name }))
                        if (delivery.error) {
                            return toast.error(delivery.message)
                        } else {
                            const branch_id = delivery.data[0].branch_id
                            onBranchIdChange({
                                branch_id
                            })
                            return toast.success(delivery.message)
                        }

                    } catch (error) {
                        return toast.error(error.message)
                    }
                } else {
                    return toast.error("Please Select City")
                }

            }
        } catch (error) {
            console.error('Error geocoding coordinates:', error);
        }
    };

    const mapOptions = {
        streetViewControl: false, // Hide street view control
        zoomControl: true // Show zoom control
    };

    const handlePlaceChanged = (place) => {
        if (!place) return;
        const newLocation = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        };
        setSelectedLocation(newLocation);
        setMap(map => map.setCenter(newLocation)); // Center map on selected place
    };

    const handleSelect = async (selectedAddress) => {
        setAddress(selectedAddress);
        try {
            const results = await geocodeByAddress(selectedAddress);
            const latLng = await getLatLng(results[0]);

            // console.log()
            const completeAddress = extractAddress(results[0])
            console.log(latLng)
            setSelectedAddress(results[0].formatted_address)
            setSelectedLocation(latLng)

            if (completeAddress.city === "") {
                return toast.error("Please Select City")
            }

            let delivery
            try {



                delivery = await is_city_deliverable({
                    name: completeAddress.city,
                    latitude: latLng.lat,
                    longitude: latLng.lng
                })

                if (delivery.error) {
                    return toast.error(delivery.message)
                } else {
                    dispatch(setNewAddress({ city: completeAddress.city }))
                    const branch_id = delivery.data[0].branch_id
                    onBranchIdChange({
                        branch_id
                    })
                    return toast.success(delivery.message)
                }

            } catch (error) {
                console.log(error)
                return toast.error(error.message)
            }


            console.log(delivery)
        } catch (error) {
            console.error('Error selecting place: ', error);
        }
    };


    const handleLocationButtonClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('Latitude:', latitude);
                    console.log('Longitude:', longitude);
                    // Do something with the latitude and longitude values
                    setSelectedLocation({ lat: latitude, lng: longitude });
                    try {
                        const results = await geocodeByAddress(`${latitude},${longitude}`);
                        if (results && results.length > 0) {
                            const address = results[0].formatted_address;

                            // You can extract city name or other relevant information from the address
                            const city = results[0].address_components.find(component =>
                                component.types.includes('locality')
                            );

                            if (city) {
                                console.log('City:', city.long_name);
                                let delivery
                                try {
                                    delivery = await is_city_deliverable({
                                        name: city.long_name,
                                        latitude,
                                        longitude
                                    })
                                    dispatch(setNewAddress({ city: city.long_name }))
                                    if (delivery.error) {
                                        return toast.error(delivery.message)
                                    } else {
                                        const branch_id = delivery.data[0].branch_id
                                        onBranchIdChange({
                                            branch_id
                                        })
                                        return toast.success(delivery.message)
                                    }

                                } catch (error) {
                                    return toast.error(error.message)
                                }
                            } else {
                                return toast.error("Please Select City")
                            }

                        }
                    } catch (error) {
                        console.error('Error geocoding coordinates:', error);
                    }

                },
                (error) => {
                    console.error('Error getting location:', error.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const handleChange = (newAddress) => {
        setAddress(newAddress);
    };

    return (
        <Box>
            <Button variant="text" color="neutral" onClick={() => setOpen(true)} sx={{ p: 0 }}>
                <RiMapPinFill />
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    sx={{
                        width: 800
                    }}
                >
                    <ModalClose />
                    <DialogTitle>
                        <Typography fontSize={"lg"} fontWeight={"xl"}>
                            Choose Your Location
                        </Typography>
                    </DialogTitle>

                    <Grid container spacing={2} sx={{ flexGrow: 1, mt: 2 }}>
                        <Grid xs={12} >
                            <Card sx={{ maxWidth: { md: "50%", xs: "100%" }, cursor: 'pointer' }} onClick={() => {
                                handleLocationButtonClick()
                            }}>
                                <CardContent orientation='horizontal' sx={{ alignItems: "center" }}>
                                    <Box>
                                        <RiCrosshair2Fill />
                                    </Box>
                                    <Box>
                                        <Typography fontSize={"md"} fontWeight={"lg"} > Detect Current Location </Typography>
                                        <Typography fontSize={"sm"} fontWeight={"md"}> using GPS </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid xs={12} >
                            <PlacesAutocomplete
                                value={address}
                                onChange={handleChange}
                                onSelect={handleSelect}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <Input
                                            {...getInputProps({
                                                placeholder: 'Enter Address...',
                                                className: 'location-search-input',
                                            })}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map((suggestion, index) => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
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
                        <Grid xs={12} >
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={selectedLocation} // Set center based on selected location
                                zoom={zoomLevel}
                                onClick={handleMapClick} // Add onClick event handler to the map
                                options={mapOptions} // Set map options
                            >
                                {/* <ZoomControl /> Show zoom controls */}
                                <Marker position={selectedLocation} /> {/* Display marker at selected location */}
                            </GoogleMap>
                        </Grid>
                    </Grid>




                    <DialogActions>
                        <Button fullWidth color="success" variant='solid' onClick={() => setOpen(false)}> Use This Location </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </Box>
    );
};

export default LocationModal;
