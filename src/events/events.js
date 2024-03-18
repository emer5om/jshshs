import {
    updateHomeBannerData,
    updateHomeCategories,
    updateHomeOffers,
    updateHomeSectionData
} from "@/repository/home/home_repo";
import api from "@/interceptor/api";
import {getBranchId} from "@/events/getters";

export const onAppLoad = async () => {

    updateUserCart()
}

export const updateUserCart = async () => {
    const formData = new FormData()
    formData.append("branch_id", getBranchId())
    const res = await api.post("/get_user_cart", formData)

}

export const onBranchIdChange = ({branch_id} = {}) => {
    // dont use await for better loading speed
    updateHomeBannerData(branch_id)
    updateHomeSectionData(branch_id)
    updateHomeCategories(branch_id)
    updateHomeOffers(branch_id)
}
export const onLoggedIn = async () => {

}
