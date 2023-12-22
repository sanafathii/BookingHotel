import React, { useEffect, useState } from "react";
import { useHotels } from "../context/HotelsProvider";
// import { MapContainer } from "https://cdn.esm.sh/react-leaflet/MapContainer";
// import { TileLayer } from "https://cdn.esm.sh/react-leaflet/TileLayer";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useSearchParams } from "react-router-dom";

function Map() {
  const { hotels, isLoading } = useHotels();
  const [mapCenter, setMapCenter] = useState([51, 1]);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        {hotels.map((hotel) => {
          return (
            <Marker key={hotel.id} position={[hotel.latitude, hotel.longitude]}>
              <Popup>{hotel.host_location}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
