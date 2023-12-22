import { createContext, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/UseFetch";
const HotelContex = createContext();

function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");

  const rooms = JSON.parse(searchParams.get("options"))?.room;
  const { data: hotels, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `name_like=${destination || ""}&accommodates_gte=${rooms || 1}`
  );
  return (
    <HotelContex.Provider value={{ isLoading, hotels }}>
      {children}
    </HotelContex.Provider>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContex);
}
