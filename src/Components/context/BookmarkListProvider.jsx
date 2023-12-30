import { createContext, useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/UseFetch";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";
//
function BookmarkListProvider({ children }) {
  const [cureentBookmark, setCurrentBookmark] = useState(null);
  const [isLoadingCurrBookmark, setIsLoadingCurrBookmark] = useState(false);

  const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}/bookmarks`);

  async function getBookmark(id) {
    setIsLoadingCurrBookmark(true);
    setCurrentBookmark(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      // console.log(data);
      setCurrentBookmark(data);
      setIsLoadingCurrBookmark(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrBookmark(false);
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        cureentBookmark,
        getBookmark,
        isLoadingCurrBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkListProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}
