import React, { useEffect } from "react";
import { useBookmark } from "../context/BookmarkListProvider";
import { useNavigate, useParams } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookmark, cureentBookmark, isLoadingCurrBookmark } = useBookmark();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  const handelBack = () => {
    navigate(-1);
  };
  if (isLoadingCurrBookmark || !cureentBookmark)
    return <div>is Loading ...</div>;
  return (
    <div>
      <button onClick={handelBack} className="btn btn--back">
        &larr; Back
      </button>

      <h2>
        <ReactCountryFlag svg countryCode={cureentBookmark.countryCode} />
        {cureentBookmark.cityName}
      </h2>
      <p>
        {cureentBookmark.cityName} - {cureentBookmark.country}
      </p>
    </div>
  );
}

export default SingleBookmark;
