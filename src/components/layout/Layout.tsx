import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {

    const [openMenu, setOpenMenu] = useState(true);

    return (
        <div className="flex bg-mainBg h-screen max-w-screen overflow-hidden">
            <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <div className="w-full flex-1 max-w-full overflow-y-auto">
                <Outlet context={{ openMenu, setOpenMenu }} />
            </div>
        </div>
    );
}
