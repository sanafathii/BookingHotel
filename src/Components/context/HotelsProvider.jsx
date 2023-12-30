import { createContext, useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/UseFetch";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const HotelContex = createContext();
const BASE_URL = "http://localhost:5000/hotels";
//
function HotelsProvider({ children }) {
  const [cureentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");

  const rooms = JSON.parse(searchParams.get("options"))?.room;
  const { data: hotels, isLoading } = useFetch(
    BASE_URL,
    `name_like=${destination || ""}&accommodates_gte=${rooms || 1}`
  );

  async function getHotel(id) {
    setIsLoadingCurrHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      // console.log(data);
      setCurrentHotel(data);
      setIsLoadingCurrHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrHotel(false);
    }
  }
  return (
    <HotelContex.Provider
      value={{ isLoading, hotels, cureentHotel, getHotel, isLoadingCurrHotel }}
    >
      {children}
    </HotelContex.Provider>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContex);
}
