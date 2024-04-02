
import {isLogged} from "@/events/getters";
import dynamic from "next/dynamic";
const UnAuth = dynamic(() => import('@/component/401'), {
    ssr: false
});



export const validateView = (View) => {


            return View


}



