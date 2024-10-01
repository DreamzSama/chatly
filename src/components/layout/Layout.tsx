import React from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex bg-mainBg h-screen max-w-screen overflow-hidden">
            <Sidebar />
            <div className="w-full flex-1 max-w-full overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}
