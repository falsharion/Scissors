import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header"

function AppLayout() {
  return (
  <div>
    <main className=" min-h-screen container">
        <Header />
        <Outlet />
    </main>
    <div className=" p-10 text-center bg-gray-800 mt-10">
      made by sharry
    </div>
     {/* footer */}
  </div>
  )
}

export default AppLayout;
