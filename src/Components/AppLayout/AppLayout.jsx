import React from "react";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapCountainer">map</div>
    </div>
  );
}

export default AppLayout;
