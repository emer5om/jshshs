// import {} from "@cond"

import { currencySettings } from "@/@core/config";
import { store } from "@/store/store";
import { getUserData } from "@/events/getters";

export const formatePrice = (price) => {
  const currencySymbol =
    store.getState()?.settings?.value?.system_settings[0]?.currency;

  if (typeof price == "string") {
    price = parseFloat(price);
  }
  // Format the number with the desired number of decimal places
  const formattedPrice = price
    ? price?.toFixed(currencySettings.decimalPoints)
    : "0.0";

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
      ? `${
          currencySymbol ?? currencySettings.currencySymbol
        }${finalIntegerPart}.${decimalPart}`
      : `${finalIntegerPart}.${decimalPart}${
          currencySymbol ?? currencySettings.currencySymbol
        }`;

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
export const parseCustomFloat = (value) => {
  if (typeof value == "string") {
    return parseFloat(value);
  }
  return value;
};

export const isIncluded = (allItems, selectedItems, key = "id") => {
  return selectedItems.every((selectedItem) =>
    allItems.some((item) => item[key] === selectedItem[key])
  );
};

export const generateRandomOrderId = (maxValue = 4) => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(2);
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);
  const hours = ("0" + now.getHours()).slice(-2);
  const minutes = ("0" + now.getMinutes()).slice(-2);
  const seconds = ("0" + now.getSeconds()).slice(-2);

  const randomDigits = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}${randomDigits}`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${day}, ${month.toUpperCase()} ${year}`;
  return formattedDate;
};

export const generateOrderId = () => {
  const userdata = getUserData();
  const timestamp = new Date().getTime();
  const randomInt = Math.floor(Math.random() * 900) + 100;
  const order = `wallet-refill-user-${userdata.id}-${timestamp}-${randomInt}`;
  return order;
};
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPPID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
};

export const getHeaderTitle = (title) => {
  if (title) return title + " | eRestro";
  else return "eRestro";
};
