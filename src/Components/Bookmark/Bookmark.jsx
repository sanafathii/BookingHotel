import React from "react";
import { useBookmark } from "../context/BookmarkListProvider";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

function Bookmark() {
  const { isLoading, bookmarks, cureentBookmark } = useBookmark();

  if (isLoading) return <div>is Loading ...</div>;
  return (
    <div>
      <h2>BookMark List</h2>

      {bookmarks.map((item) => {
        return (
          <Link to={`${item.id}?lat=${item.lalatitude}&lng=${item.longitude}`}>
            <div key={item.id} className="bookmarkItem">
              <ReactCountryFlag svg countryCode={item.countryCode} />
              &nbsp; <strong>{item.cityName}</strong> &nbsp;
              <span>{item.country}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Bookmark;
