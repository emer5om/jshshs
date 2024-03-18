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

export const get_settings = async (type, user_id) => {
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

export const verify_user = async ({ mobile } = {}) => {
  const formData = new FormData();

  formData.append("mobile", mobile);

  let response = await api.post("/verify_user", formData);
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
  user_id,
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
  vegetarian = 1,
  branch_id = 7,
}) => {
  const formData = new FormData();

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
  // if (order) formData.append("order", order);
  if (top_rated_foods) formData.append("top_rated_foods", top_rated_foods);
  if (discount) formData.append("discount", discount);
  if (min_price) formData.append("min_price", min_price);
  if (max_price) formData.append("max_price", max_price);
  if (partner_id) formData.append("partner_id", partner_id);
  if (product_variant_ids)
    formData.append("product_variant_ids", product_variant_ids);
  if (vegetarian) formData.append("vegetarian", vegetarian);

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

  formData.append("limit", limit ?? 10);
  formData.append("offset", offset ?? 0);
  formData.append("transaction_type", transaction_type);
  if (type) formData.append("type", type);

  let response = await api.post("/transactions", formData);
  return response.data;
};

export const send_withdraw_request = async ({ payment_address, amount } = {}) => {
  const formData = new FormData();

  formData.append("payment_address", payment_address);
  formData.append("amount", amount);

  let response = await api.post("/send_withdrawal_request", formData);
  return response.data;
};
