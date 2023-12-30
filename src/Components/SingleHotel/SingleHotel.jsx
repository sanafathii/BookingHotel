import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";

function SingleHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrHotel, cureentHotel } = useHotels();
  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !cureentHotel) return "hotel is loading...";
  return (
    // <div className="">sin</div>
    <div className="room">
      <div className="roomDetail">
        <h2>{cureentHotel.name}</h2>
        <div>
          {cureentHotel.number_of_reviews} &bull; {cureentHotel.smart_location}
        </div>
        <img src={cureentHotel.xl_picture_url} alt={cureentHotel.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
