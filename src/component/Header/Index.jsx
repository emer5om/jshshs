
import React from 'react'
import dynamic from "next/dynamic";
// import Header from "@/component/Header/Header";
const Header = dynamic(() => import("@/component/Header/Header"), {
  ssr: false
});

const Index = () => {

  return <Header  />;
}

export default Index