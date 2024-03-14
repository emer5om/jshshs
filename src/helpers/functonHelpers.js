// import {} from "@cond"

import { currencySettings } from "@/@core/config";

export const formatePrice = (price) => {
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
