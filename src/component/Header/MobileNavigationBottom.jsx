
import React from 'react'
import dynamic from "next/dynamic";
// import Header from "@/component/Header/Header";
const MobileNavigationBottom = dynamic(() => import("@/component/Header/MobileBottomNavigation"), {
    ssr: false
});

const Index = () => {

    return <MobileNavigationBottom />;
}

export default Index