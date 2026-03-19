"use client";
import { useState } from "react";
import Sidebar from "@/app/_components/Sidebar";
import Navbar from "@/app/_components/Navbar";

function Navigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Navbar setSidebarOpen={setSidebarOpen} />
    </>
  );
}

export default Navigation;
