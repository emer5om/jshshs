import api from "./api";

export const get_categories = async (partner_slug = "", limit, offset, id, branch_id) => {
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

export const login = async (mobile, fcm_id) => {
  const formData = new FormData();

  formData.append("mobile", mobile);
  if (fcm_id) formData.append("fcm_id", fcm_id);

  let response = await api.post("/get_cities", formData);
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
