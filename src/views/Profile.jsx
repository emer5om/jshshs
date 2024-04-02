"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  FormLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  Sheet,
  Textarea,
  Typography,
  useTheme
} from "@mui/joy";
import PhoneInput from "react-phone-input-2";
import dayjs from "dayjs";
import { updateUserData } from "@/events/actions";
import { useSelector } from 'react-redux';

// icons
import { RiPencilLine } from "@remixicon/react";
import CustomButton from "@/component/Buttons/CustomButton";
// CSS

// import 'react-phone-input-2/lib/style.css'
import "react-phone-input-2/lib/material.css";
import {useTranslation} from "react-i18next";
const Profile = () => {
  const countryCode = process.env.NEXT_PUBLIC_COUNTRY_CODE;
  const [image, setImage] = useState(""); // State to hold the selected image

  const theme = useTheme()

// Assuming 'image' is stored under 'user' slice of state in Redux
const imageFromRedux = useSelector(state => state.authentication.userData.image);

// Use a default image if imageFromRedux is not available
const defaultImage = "https://ui-avatars.com/api/?background=random";
const image1 = imageFromRedux || defaultImage;

// Assuming 'prefillData' is stored under 'user' slice of state in Redux
const prefillData = useSelector(state => state.authentication.userData);


const [prefill, setPrefill] = useState({
  first_name: prefillData.username || "james",
  last_name: prefillData.last_name || "carter",
  email: prefillData.email || "test.user@mail.com",
  country: prefillData.country_code || "in",
  phone: prefillData.mobile || "+919876543210",
  date_of_birth: prefillData.date_of_birth || dayjs("15-07-1999"),
  gender: prefillData.gender || "male",
});

useEffect(() => {
  setImage(image1);
}, [image1]);


  const imageRef = useRef(null); // Reference to the file input element

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    // Perform any additional validation if needed
    if (file) {
      setImage(URL.createObjectURL(file)); // Set the selected image as the preview
    }
  };
  const handleClick = () => {
    // Trigger the click event of the file input
    imageRef.current.click();
  };

  const addValueProps = (name, file = false) => {
    if (!file) {
      return {
        value: prefill[name] || "",
        onChange: (e) => {
          setPrefill({ ...prefill, [name]: e.target.value });
        },
      };
    }

    return {
      defaultImage: prefill[name] || "",
      onChange: (e) => {
        setPrefill({ ...prefill, [name]: e.target.files[0] });
      },
    };
  };

  const handleSubmit = () => {
    // Gather form data from the state
    const formData = {
      first_name: prefill.first_name,
      last_name: prefill.last_name,
      email: prefill.email,
      // country: prefill.country,
      phone: prefill.phone,
      date_of_birth: prefill.date_of_birth.format("DD-MM-YYYY"), // Format date as needed
      gender: prefill.gender,
    };

   // Add image data if it's available
if (imageRef.current.files[0]) {
    formData.image = imageRef.current.files[0];
  }
    // Call the updateUserData function to save the data
    updateUserData(formData)
      .then((response) => {
        // Handle successful response
        console.log("Data saved successfully:", response);
      })
      .catch((error) => {
        // Handle error
        console.error("Error while saving data:", error);
      });
  };

  const {t} = useTranslation()

  return (
    <Box width={"100%"}>
      <Grid container>
        <Grid xs={12}>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Box>
            <Box height={150}>
      <Avatar
        alt="Profile Picture"
        src={image}
        sx={{
          height: "150px",
          width: "150px",
        }}
      />
      {/* Hidden file input */}
      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <Box
        width={"25%"}
        position={"relative"}
        right={"-70%"}
        top={"-50px"}
        bgcolor={"primary.300"}
        borderRadius={"50%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p={1}
      >
        <RiPencilLine     style={{ cursor: 'pointer' }} // Set cursor style to pointer
      onClick={handleClick}
 />
      </Box>
    </Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                mt={1}
              >
                <Typography fontSize={"lg"} fontWeight={"xl"}>
                  {prefillData.username}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} mt={5}>
          <Box
            display={"flex"}
            justifyContent={"start"}
            alignItems={"center"}
            my={2}
          >
            <Typography
              fontSize={"lg"}
              fontWeight={"md"}
              textColor={"text.currency"}
            >
              {t("personal-information")}
            </Typography>
          </Box>
          <Box>
            <Grid
              container
              spacing={{ md: 2, xs: 0 }}
              gap={{ xs: 2, md: 0 }}
              sx={{ flexGrow: 1 }}
            >
              <Grid xs={12} md={6}>
                <FormLabel sx={{ mb: 1, color: "text.tertiary" }}>
                  {t("name")}
                </FormLabel>
                <Input
                  size="lg"
                  placeholder="Type in here…"
                  variant="outlined"
                  {...addValueProps("first_name")}
                />
              </Grid>
              {/* <Grid xs={12} md={6}>
                <FormLabel sx={{ mb: 1, color: "text.tertiary" }}>
                  Last Name
                </FormLabel>
                <Input
                  size="lg"
                  placeholder="Type in here…"
                  variant="outlined"
                  {...addValueProps("last_name")}
                />
              </Grid> */}
              <Grid xs={12} md={6}>
                <FormLabel sx={{ mb: 1, color: "text.tertiary" }}>
                  {t("phone")}
                </FormLabel>
                <PhoneInput
                  country={prefill.country}
                  disabled
                  disableDropdown
                  inputClass="generalClass"
                  placeholder="Enter phone number"
                  value={prefill.country + prefill.phone} 
                  // {...addValueProps(`country`+`phone`)}
                  
                  inputStyle={{
                    width: "100%",
                    height: "45px",
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? theme.palette.primary[50]
                        : "#3B3B3B",
                   
                  }}
                />
              </Grid>
              
              {/* <Grid xs={12} md={6}>
                <FormLabel sx={{ mb: 1, color: "text.tertiary" }}>
                  Date of Birth
                </FormLabel>
                <Input
                  size="lg"
                  placeholder="Type in here…"
                  variant="outlined"
                  type="date"
                  defaultValue={prefill.date_of_birth}
                  value={prefill.date_of_birth}
                  {...addValueProps("date_of_birth")}
                  slotProps={{
                    input: {
                      defaultValue: prefill.date_of_birth,
                      value: prefill.date_of_birth,
                    },
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <FormLabel sx={{ mb: 1, color: "text.tertiary" }}>
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="storage-label"
                  value={prefill.gender}
                  {...addValueProps("gender")}
                  size="sm"
                  sx={{ display: "flex", gap: 1.5, flexDirection: "row" }}
                >
                  {["male", "female", "others"].map((value) => (
                    <Sheet
                      key={value}
                      sx={{
                        p: 2,
                        borderRadius: "md",
                        boxShadow: "sm",
                        width: "33%",
                        backgroundColor:
                          value === prefill.gender ? "primary.200" : "",
                      }}
                    >
                      <Radio
                        label={`${value}`}
                        overlay
                        disableIcon
                        value={value}
                        slotProps={{
                          label: ({ checked }) => ({
                            sx: {
                              fontWeight: "lg",
                              fontSize: "md",
                              color: checked
                                ? "text.primary"
                                : "text.secondary",
                            },
                          }),
                          action: ({ checked }) => ({
                            sx: (theme) => ({
                              ...(checked && {
                                "--variant-borderWidth": "2px",
                                "&&": {
                                  // && to increase the specificity to win the base :hover styles
                                  borderColor: theme.vars.palette.primary[500],
                                },
                              }),
                            }),
                          }),
                        }}
                      />
                    </Sheet>
                  ))}
                </RadioGroup>
              </Grid> */}

              <Grid xs={12} md={12} my={2}>
                <Box display={"flex"} flexDirection={"column"} gap={2}>
                  <Box>
                    <Typography fontSize={"sm"} fontWeight={"md"}>
                      {/*In order to access some features of the Service, you will*/}
                      {/*have fill out your account details.*/}
                    </Typography>
                  </Box>
                  <Box>
                    <CustomButton
                      text={t("save")}
                      onClick={handleSubmit}
                      customStyle={{ px: 4, py: 1 }}
                      variant="solid"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
