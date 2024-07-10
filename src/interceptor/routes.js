import { store } from "@/store/store";
import api from "./api";

export const get_categories = async (
  partner_slug = "",
  limit,
  offset,
  id,
  branch_id
) => {
  const formData = new FormData();
  formData.append("limit", limit ?? 100);
  formData.append("offset", offset ?? 0);
  formData.append("branch_id", branch_id ?? 7);

  if (id) {
    formData.append("id", id);
  }

  let response = await api.post("/get_categories", formData);
  return response.data;
};

export const get_settings = async ({ type, user_id } = {}) => {
  const formData = new FormData();

  if (type) {
    formData.append("type", type);
  }
  if (user_id) {
    formData.append("user_id", user_id);
  }

  let response = await api.post("/get_settings", formData);
  return response.data;
};

export const get_cities = async (sort, order, search, limit, offset) => {
  const formData = new FormData();

  if (sort) formData.append("sort", sort);

  if (order) formData.append("user_id", user_id);
  if (search) formData.append("search", search);
  formData.append("limit", limit ?? 10);
  formData.append("offset", offset ?? 0);

  let response = await api.post("/get_cities", formData);
  return response.data;
};

/**
 *
 * @param {9876543210} mobile
 * @param {*} fcm_id
 * @returns
 */

export const login = async ({ mobile, fcm_id }) => {
  const formData = new FormData();

  formData.append("mobile", mobile);
  if (fcm_id) formData.append("fcm_id", fcm_id);

  let response = await api.post("/login", formData);
  return response.data;
};

export const deleteMyAccount = async ({ user_id }) => {
  const formData = new FormData();

  formData.append("user_id", user_id);

  let response = await api.post("/delete_my_account", formData);
  return response.data;
};

/**
 *
 * @param {9876543210} mobile
 * @param {*} fcm_id
 * @returns
 */

export const verify_user_firebase = async ({ mobile } = {}) => {
  const formData = new FormData();

  formData.append("mobile", mobile);

  let response = await api.post("/verify_user", formData);
  return response.data;
};

export const verify_user = async ({ mobile } = {}) => {
  const formData = new FormData();

  formData.append("mobile", mobile);
  formData.append("is_forgot_password", 0);

  let response = await api.post("/verify_user", formData);

  console.log(response);

  return response.data;
};

export const verify_otp = async ({ mobile, otp } = {}) => {
  const formData = new FormData();

  formData.append("mobile", mobile);
  formData.append("otp", otp);

  let response = await api.post("/verify_otp", formData);

  return response.data;
};

export const resend_otp = async ({ mobile } = {}) => {
  const formData = new FormData();

  formData.append("mobile", mobile);

  let response = await api.post("/resend_otp", formData);

  return response.data;
};

/**
 *
 * @param {"abcd"} name
 * @param {"user@mail.com"} email
 * @param {"9876543210"} mobile
 * @param {"91"} country_code
 * @returns
 */
export const register = async ({ name, email, mobile, country_code }) => {
  const formData = new FormData();

  formData.append("mobile", mobile);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("country_code", country_code);

  let response = await api.post("/get_cities", formData);
  return response.data;
};

export const get_products = async ({
  id,
  category_id,
  search,
  tags,
  attribute_value_ids,
  limit,
  offset,
  sort = "p.date",
  order = "DESC",
  top_rated_foods = 0,
  discount,
  min_price,
  max_price,
  partner_id,
  product_variant_ids,
  type = 3,
  vegetarian,
  branch_id = 7,
  filter_by,
}) => {
  const formData = new FormData();

  const user_id = store.getState()?.authentication?.userData.id;

  if (branch_id) formData.append("branch_id", branch_id);
  if (id) formData.append("id", id);
  if (category_id) formData.append("category_id", category_id);
  if (user_id) formData.append("user_id", user_id);
  if (search) formData.append("search", search);
  if (tags) formData.append("tags", tags);
  if (attribute_value_ids)
    formData.append("attribute_value_ids", attribute_value_ids);

  if (limit) formData.append("limit", limit ?? 20);
  if (offset) formData.append("offset", offset ?? 0);
  // if (sort) formData.append("sort", sort ?? "name");
  if (order) formData.append("order", order);
  if (top_rated_foods) formData.append("top_rated_foods", top_rated_foods);
  if (discount) formData.append("discount", discount);
  if (min_price) formData.append("min_price", min_price);
  if (max_price) formData.append("max_price", max_price);
  if (partner_id) formData.append("partner_id", partner_id);
  if (product_variant_ids)
    formData.append("product_variant_ids", product_variant_ids);
  if (vegetarian) formData.append("vegetarian", vegetarian);
  if (filter_by) formData.append("filter_by", filter_by);

  let response = await api.post("/get_products", formData);
  return response.data;
};

/**
 *
 * @param {city name} name
 * @param {23.241653499709386} latitude
 * @param {69.66664668584443} longitude
 * @returns
 */

export const is_city_deliverable = async ({ name, latitude, longitude }) => {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);

  let response = await api.post("/is_city_deliverable", formData);
  return response.data;
};

// Transactions

export const get_transactions = async ({
  limit,
  offset,
  transaction_type,
  type,
} = {}) => {
  const formData = new FormData();

  if (limit) {
    formData.append("limit", limit);
  }

  formData.append("offset", offset ?? 0);
  formData.append("transaction_type", transaction_type);
  if (type) formData.append("type", type);

  let response = await api.post("/transactions", formData);
  return response.data;
};

export const send_withdraw_request = async ({
  payment_address,
  amount,
} = {}) => {
  const formData = new FormData();

  formData.append("payment_address", payment_address);
  formData.append("amount", amount);

  let response = await api.post("/send_withdrawal_request", formData);
  return response.data;
};

export const addToFavorite = async ({
  type = "products",
  type_id,
  branch_id,
} = {}) => {
  const formData = new FormData();

  formData.append("type", type);
  formData.append("type_id", type_id);
  formData.append("branch_id", branch_id);

  let response = await api.post("/add_to_favorites", formData);
  return response.data;
};

export const removeFromFavorite = async ({
  type = "products",
  type_id,
  branch_id,
} = {}) => {
  const formData = new FormData();

  formData.append("type", type);
  formData.append("type_id", type_id);
  formData.append("branch_id", branch_id);

  let response = await api.post("/remove_from_favorites", formData);
  return response.data;
};

export const getFavorites = async ({
  type = "products",
  type_id,
  limit = 10,
  offset = 0,
  branch_id,
} = {}) => {
  const formData = new FormData();

  formData.append("type", type);
  if (type_id) formData.append("type_id", type_id);
  formData.append("branch_id", branch_id);
  formData.append("limit", limit);
  formData.append("offset", offset);

  let response = await api.post("/get_favorites", formData);
  return response.data;
};

export const removeFromCart = async ({
  user_id,
  product_variant_id,
  branch_id,
  cart_id,
} = {}) => {
  const formData = new FormData();

  formData.append("branch_id", branch_id);
  if (product_variant_id)
    formData.append("product_variant_id", product_variant_id);
  if (cart_id) formData.append("cart_id", cart_id);

  let response = await api.post("/remove_from_cart", formData);
  return response.data;
};

export const getPromoCodes = async ({ branch_id } = {}) => {
  const formData = new FormData();

  formData.append("branch_id", branch_id);

  let response = await api.post("/get_promo_codes", formData);
  return response.data;
};

export const validatePromoCodes = async ({
  branch_id,
  final_total,
  promo_code,
} = {}) => {
  const formData = new FormData();

  formData.append("branch_id", branch_id);
  formData.append("final_total", final_total);
  formData.append("promo_code", promo_code);

  let response = await api.post("/validate_promo_code", formData);
  return response.data;
};

export const placeOrder = async ({
  branch_id,
  mobile,
  product_variant_id,
  quantity,
  total,
  final_total,
  latitude,
  longitude,
  promo_code,
  payment_method,
  address_id,
  is_wallet_used = 0,
  wallet_balance_used = 0,
  is_self_pick_up = 0,
} = {}) => {
  const formData = new FormData();

  formData.append("branch_id", branch_id);
  formData.append("mobile", mobile);
  formData.append("product_variant_id", product_variant_id);
  formData.append("quantity", quantity);
  formData.append("total", total);
  formData.append("final_total", final_total);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  if (promo_code) formData.append("promo_code", promo_code);
  formData.append("payment_method", payment_method);
  formData.append("address_id", address_id);
  formData.append("is_wallet_used", is_wallet_used);
  formData.append("wallet_balance_used", wallet_balance_used);
  formData.append("is_self_pick_up", is_self_pick_up);

  let response = await api.post("/place_order", formData);
  return response.data;
};

export const addTransaction = async ({
  transaction_type = "transaction",
  order_id,
  type,
  payment_method,
  txn_id,
  amount,
  status,
  message,
  branch_id,
} = {}) => {
  const formData = new FormData();

  formData.append("branch_id", branch_id);
  if (transaction_type) formData.append("transaction_type", transaction_type);
  if (order_id) formData.append("order_id", order_id);
  if (type) formData.append("type", type);
  if (payment_method) formData.append("payment_method", payment_method);
  if (txn_id) formData.append("txn_id", txn_id);
  if (amount) formData.append("amount", amount);
  if (status) formData.append("status", status);
  if (message) formData.append("message", message);

  let response = await api.post("/add_transaction", formData);
  return response.data;
};

export const razorpay_create_order = async ({ order_id } = {}) => {
  const formData = new FormData();

  formData.append("order_id", order_id);

  let response = await api.post("/razorpay_create_order", formData);
  return response.data;
};

export const getUserAddress = async ({ address_id, user_id } = {}) => {
  const formData = new FormData();

  if (address_id) formData.append("address_id", address_id);
  if (user_id) formData.append("user_id", user_id);

  let response = await api.post("/get_address", formData);

  return response.data;
};

export const removeUserAddress = async ({ id } = {}) => {
  const formData = new FormData();

  if (id) formData.append("id", id);

  let response = await api.post("/delete_address", formData);
  return response.data;
};

export const updateAddress = async ({
  id,
  user_id,
  mobile,
  address,
  type,
  country_code,
  alternate_mobile,
  land_mark,
  area,
  pincode,
  latitude,
  city,
  longitude,
  is_default,
  branch_id = 1,
} = {}) => {
  const formData = new FormData();

  if (branch_id) formData.append("branch_id", branch_id);

  if (id) formData.append("id", id);
  if (user_id) formData.append("user_id", user_id);
  if (mobile) formData.append("mobile", mobile);
  if (address) formData.append("address", address);
  if (type) formData.append("type", type);
  if (country_code) formData.append("country_code", country_code);
  if (alternate_mobile) formData.append("alternate_mobile", alternate_mobile);
  if (land_mark) formData.append("land_mark", land_mark);
  if (area) formData.append("area", area);
  if (pincode) formData.append("pincode", pincode);
  if (latitude) formData.append("latitude", latitude);
  if (longitude) formData.append("longitude", longitude);
  if (is_default) formData.append("is_default", is_default);
  if (city) formData.append("city", city);

  let response = await api.post("/update_address", formData);
  return response.data;
};
export const addAddress = async ({
  id,
  user_id,
  mobile,
  address,
  type,
  country_code,
  alternate_mobile,
  landmark,
  area,
  pincode,
  latitude,
  longitude,
  is_default,
  city,
} = {}) => {
  const formData = new FormData();

  if (id) formData.append("id", id);
  if (user_id) formData.append("user_id", user_id);
  if (mobile) formData.append("mobile", mobile);
  if (address) formData.append("address", address);
  if (city) formData.append("city", city);
  if (type) formData.append("type", type);
  if (country_code) formData.append("country_code", country_code);
  if (alternate_mobile) formData.append("alternate_mobile", alternate_mobile);
  if (landmark) formData.append("land_mark", landmark);
  if (area) formData.append("area", area);
  if (pincode) formData.append("pincode", pincode);
  if (latitude) formData.append("latitude", latitude);
  if (longitude) formData.append("longitude", longitude);
  if (is_default) formData.append("is_default", is_default);

  let response = await api.post("/add_address", formData);
  return response.data;
};

export const deleteUserAddress = async ({ id } = {}) => {
  const formData = new FormData();

  if (id) formData.append("id", id);

  let response = await api.post("/delete_address", formData);
  return response.data;
};

export const paymentIntentGenerator = async ({
  order_id,
  type = "stripe",
} = {}) => {
  const formData = new FormData();

  formData.append("order_id", order_id);
  formData.append("type", type);

  let response = await api.post("/payment_intent", formData);
  return response.data;
};

export const getOrders = async ({ id } = {}) => {
  const formData = new FormData();

  formData.append("id", id);

  let response = await api.post("/get_orders", formData);
  return response.data;
};
export const getOfferImages = async ({ branch_id } = {}) => {
  const formData = new FormData();

  formData.append("branch_id", branch_id);
  let response = await api.post("/get_offer_images", formData);

  return response.data;
};
