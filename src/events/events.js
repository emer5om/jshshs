import {updateHomeBannerData, updateHomeSectionData} from "@/repository/home/home_repo";

export const onLoad = () => {

}

export const onBranchIdChange = ({branch_id} = {}) => {
    // dont use await for better loading speed
    updateHomeBannerData(branch_id)
    updateHomeSectionData(branch_id)
}

