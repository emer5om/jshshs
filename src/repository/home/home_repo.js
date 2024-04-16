import api from "@/interceptor/api";
import { store } from "@/store/store";
import {
  setHomeBanner,
  setHomeCategories,
  setHomeDelightfullSection,
  setHomeOffers,
  setHomePopularSection,
  setHomeSection,
} from "@/store/reducers/Home/homeSlice";
import { navigateErrorPage } from "@/helpers/functonHelpers";
import { get_categories } from "@/interceptor/routes";

export const updateHomeBannerData = async (branch_id) => {
  const form = new FormData();
  form.append("branch_id", branch_id);
  const res = await api.post("/get_slider_images", form);
  if (res.data.error) {
    return navigateErrorPage(res.data);
  }
  store.dispatch(setHomeBanner(res.data.data));
};

export const updateHomeSectionData = async (branch_id) => {
  const form = new FormData();
  form.append("branch_id", branch_id);
  const res = await api.post("/get_sections", form);
  if (res.data.error) {
    return navigateErrorPage(res.data);
  }
  store.dispatch(setHomeSection(res.data.data));
};
export const updateHomeOffers = async (branch_id) => {
  const form = new FormData();
  form.append("branch_id", branch_id);
  const res = await api.post("/get_offer_images", form);
  if (res.data.error) {
    return navigateErrorPage(res.data);
  }
  store.dispatch(setHomeOffers(res.data.data));
};
export const updateHomePopular = async (branch_id) => {
  const form = new FormData();
  form.append("branch_id", branch_id);
  form.append("limit", 6);
  form.append("top_rated_foods", 1);
  const res = await api.post("/get_products", form);
  if (res.data.error) {
    return navigateErrorPage(res.data);
  }
  store.dispatch(setHomePopularSection(res.data.data));
};
export const updateHomeDelightfull = async (branch_id) => {
  const form = new FormData();
  form.append("branch_id", branch_id);
  form.append("limit", 6);
  const res = await api.post("/get_products", form);
  if (res.data.error) {
    return navigateErrorPage(res.data);
  }
  store.dispatch(setHomeDelightfullSection(res.data.data));
};
export const updateHomeCategories = async (branch_id) => {
  const form = new FormData();
  form.append("branch_id", branch_id);
  form.append("limit", 100);
  form.append("offset", 0);

  // get_categories();
  const res = await api.post("/get_categories", form);
  if (res.data.error) {
    return navigateErrorPage(res.data);
  }
  store.dispatch(setHomeCategories(res.data.data));
};
