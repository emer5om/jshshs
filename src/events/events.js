import {updateHomeBannerData} from "@/repository/home/banner";

export const onLoad = () => {

}

export const onBranchIdChange = ({branch_id} = {}) => {
    updateHomeBannerData(branch_id)
}

