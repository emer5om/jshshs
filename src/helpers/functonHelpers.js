// import {} from "@cond"

import { currencySettings } from "@/@core/config";

export const formatePrice = (price) => {
  if(typeof price == "string"){
    price = parseFloat(price)
  }
  // Format the number with the desired number of decimal places
  const formattedPrice = price.toFixed(currencySettings.decimalPoints);

  // Split the formatted price into integer and decimal parts
  const [integerPart, decimalPart] = formattedPrice.split(".");

  // Remove any existing commas from the integer part
  const formattedIntegerPart = integerPart.replace(/,/g, "");

  // Add commas to the formatted integer part
  const finalIntegerPart = formattedIntegerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    currencySettings.currencyFormate
  );

  // Combine the formatted parts with the currency symbol based on position
  const formattedPriceStr =
    currencySettings.currencySymbolPosition === "start"
      ? `${currencySettings.currencySymbol}${finalIntegerPart}.${decimalPart}`
      : `${finalIntegerPart}.${decimalPart}${currencySettings.currencySymbol}`;

  return formattedPriceStr;
};

export const isSSR = () => {
  return process.env.NEXT_PUBLIC_SSR == "true";
};

export const navigateErrorPage = (data) => {};

export const extractAddress = (place) => {
  const address = {
    city: "",
    state: "",
    // zip: "",
    country: "",
    plain() {
      const city = this.city ? this.city + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return city + state + this.country;
    },
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("locality")) {
      address.city = value;
    }

    if (types.includes("administrative_area_level_2")) {
      address.state = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }
  });

  return address;
};

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPPID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID
};


