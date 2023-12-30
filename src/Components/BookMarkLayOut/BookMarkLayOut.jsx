import React from "react";
import Map from "../Map/Map";
import { Outlet } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListProvider";

function BookMarkLayOut() {
  const { bookmarks } = useBookmark();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={bookmarks} />
    </div>
  );
}

export default BookMarkLayOut;
