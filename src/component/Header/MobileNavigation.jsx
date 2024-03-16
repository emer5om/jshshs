
import React from 'react'
import dynamic from "next/dynamic";
// import Header from "@/component/Header/Header";
const MobileHeader = dynamic(() => import("@/component/Header/MobileHeader"), {
    ssr: false
});

const Index = () => {

    return <MobileHeader />;
}

export default Index