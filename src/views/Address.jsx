import AddressCard from "@/component/Cards/AddressCard";
import { getUserData } from "@/events/getters";
import { getUserAddress } from "@/interceptor/routes";
import { Box, Grid } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserAddresses } from "@/store/reducers/userAddressesSlice";
import AddUserAddressesModal from "@/component/Modals/AddUserAddressesModal";
import toast from "react-hot-toast";
import AddressSkeleton from "@/component/Skeleton/AddressSkeleton";

const Address = () => {
  const dispatch = useDispatch();
  const userAddresses = useSelector((state) => state.userAddresses)?.value;
  const userData = getUserData();
  const [addresses, setAddresses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // Initialize isLoaded state

  const userAddress = async () => {
    try {
      const data = await getUserAddress({ user_id: userData.id });
      if (!data.error) {
        dispatch(setUserAddresses(data.data));
        setIsLoaded(true); // Set isLoaded to true when addresses are fetched
        setAddresses(data.data);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error occurred while getting user address:", error);
    }
  };

  useEffect(() => {
    if (userAddresses) {
      setAddresses(userAddresses);
      setIsLoaded(true); // Set isLoaded to true if userAddresses are available
    } else {
      userAddress();
    }
  }, [userAddresses]);

  const fetchUserAddresses = async () => {
    try {
      const userAddress = await getUserAddress({ user_id: userData.id });
      if (!userAddress.error) {
        setAddresses(userAddress.data);
        dispatch(setUserAddresses(userAddress.data));
        setIsLoaded(true); // Set isLoaded to true when addresses are fetched
      } else {
        // Handle error
      }
    } catch (error) {
      console.log("error occurred while getting user address:", error);
    }
  };

  return (
    <Box my={4}>
      {isLoaded ? ( // Render only if addresses are loaded
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          {addresses &&
            addresses.map((item) => {
              return (
                <Grid xs={12} md={4} key={item.id}>
                  <AddressCard
                    type={item.type}
                    address={item.address}
                    mobile={item.mobile}
                    alternate_mobile={item.alternate_mobile}
                    isDefault={item.is_default}
                    city={item.city}
                    area={item.area}
                    landmark={item.landmark}
                    id={item.id}
                    latitude={parseFloat(item.city_latitude)}
                    longitude={parseFloat(item.city_longitude)}
                    pincode={item.pincode}
                  />
                </Grid>
              );
            })}
          <Grid xs={12} md={4}>
            <AddUserAddressesModal />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <AddressSkeleton />
        </Grid>
      )}
    </Box>
  );
};

export default Address;
