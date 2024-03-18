import {
    updateHomeBannerData,
    updateHomeCategories,
    updateHomeOffers,
    updateHomeSectionData
} from "@/repository/home/home_repo";
import {getBranchId, isLogged} from "@/events/getters";
import {updateUserCart} from "@/events/actions";

export const onAppLoad = async () => {
    if(isLogged()){
        updateUserCart()
    }
}



export const onBranchIdChange = ({branch_id} = {}) => {
    // dont use await for better loading speed
    updateHomeBannerData(branch_id)
    updateHomeSectionData(branch_id)
    updateHomeCategories(branch_id)
    updateHomeOffers(branch_id)
}
export const onLoggedIn = async () => {
    onAppLoad()
}
