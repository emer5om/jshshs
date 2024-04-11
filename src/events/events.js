import {
  updateHomeBannerData,
  updateHomeCategories,
  updateHomeDelightfull,
  updateHomeOffers,
  updateHomePopular,
  updateHomeSectionData,
} from "@/repository/home/home_repo";
import { getBranchId, isLogged } from "@/events/getters";
import { updateUserCart, updateUserAddresses, updateUserSettings, } from "@/events/actions";

export const onAppLoad = async () => {
  localStorage.removeItem("persist:root")
  if (isLogged()) {
    updateUserCart(), updateUserAddresses(), updateUserSettings();

  }
};

export const onBranchIdChange = ({ branch_id } = {}) => {
  // dont use await for better loading speed
  updateHomeBannerData(branch_id);
  updateHomeSectionData(branch_id);
  updateHomeCategories(branch_id);
  updateHomeOffers(branch_id);
  updateHomePopular(branch_id);
  updateHomeDelightfull(branch_id);
};
export const onLoggedIn = async () => {
  onAppLoad();
};
