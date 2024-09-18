import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header"
import Footer from "../components/footer"

function AppLayout() {
  return (
  <div>
    <main className=" min-h-screen  ">
        <Header />
        <Outlet />
    </main>
    <div className="bg-gray-950">
       <Footer />
    </div>
  
  </div>
  )
}

export default AppLayout;
