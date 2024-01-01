import React from "react";
import { useBookmark } from "../context/BookmarkListProvider";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

function Bookmark() {
  const { isLoading, bookmarks, cureentBookmark, deleteBookmark } =
    useBookmark();
  const handeDelete = (e, id) => {
    e.preventDefault();

    deleteBookmark(id);
  };

  if (isLoading) return <div>is Loading ...</div>;
  if (!bookmarks.length) return <p>there is no bookmarked location</p>;
  return (
    <div>
      <h2>BookMark List</h2>

      {bookmarks.map((item) => {
        return (
          <Link
            key={item.id}
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`bookmarkItem  ${
                item.id === cureentBookmark?.id ? "currentBookmark" : ""
              }`}
            >
              <div>
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp; <strong>{item.cityName}</strong> &nbsp;
                <span>{item.country}</span>
              </div>
              <button onClick={(e) => handeDelete(e, item.id)}>
                {/* <HiTrash className="trash" /> */}
                delete
              </button>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Bookmark;
