import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/AdminPanel/Sidebar/Sidebar";
import Topbar from "../../Components/AdminPanel/Topbar/Topbar";
import IsShowToggleAdminPanelContext from "./IsShowToggleAdminPanelContext";
import "./index.css";

export default function Index() {
  const [isSidebarAdminShow, setIsSidebarAdminShow] = useState(false);

  return (
    <IsShowToggleAdminPanelContext.Provider
      value={{
        isSidebarAdminShow,
        setIsSidebarAdminShow
      }}
    >
      <div id="content" className="contentUserPanel">
        <Sidebar />
        <div id="home" class="col-lg-10 col-12 main_col10sec main_col10sec2 ">
          <Topbar />
          <div class="container-fluid home-content-userPanel" id="home-content">
            <Outlet />
          </div>
        </div>
      </div>
    </IsShowToggleAdminPanelContext.Provider>
  );
}
