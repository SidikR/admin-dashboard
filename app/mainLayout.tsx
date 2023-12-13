// mainLayout.tsx
"use client";
import Sidebar from "@/components/sidebar";
import { useState } from "react";
import { NavbarAdmin } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        className={`fixed top-0 ${isSidebarOpen ? "left-0" : "right-0"} ${
          isSidebarOpen ? "" : "hidden"
        }`}
      />

      {/* Toggle*/}
      <span onClick={toggleSidebar} className="">
        <i
          className={`fixed ${
            isSidebarOpen ? "left-64" : "left-0"
          } top-[50%] cursor-pointer rounded-e-xl p-1 dark:bg-slate-900 bg-slate-300`}
        >
          {isSidebarOpen ? (
            <BsArrowLeft className=" dark:text-slate-300 text-2xl" />
          ) : (
            <BsArrowRight className=" dark:text-slate-300 text-2xl" />
          )}
        </i>
      </span>

      {/* Main Content */}
      <div
        className={`${
          isSidebarOpen ? "ml-64" : "ml-0"
        } transition-all flex-grow w-full h-full`}
      >
        <NavbarAdmin />
        <main className="relative m-6 dark:bg-slate-800 bg-slate-300 rounded-xl">
          {children}
        </main>
        <footer className="w-full flex items-center justify-center py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
            title="nextui.org homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">Biko.id | BisaKoding</p>
          </Link>
        </footer>
      </div>
    </div>
  );
}
