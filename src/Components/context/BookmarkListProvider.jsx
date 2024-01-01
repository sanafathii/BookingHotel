import { createContext, useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/UseFetch";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";
//
function BookmarkListProvider({ children }) {
  const [cureentBookmark, setCurrentBookmark] = useState(null);
  // const [isLoadingCurrBookmark, setIsLoadingCurrBookmark] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}/bookmarks`);

  useEffect(() => {
    async function fetchBookmarkList() {
      setIsLoading(true);

      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        // console.log(data);
        setBookmarks(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookmarkList();
  }, [cureentBookmark]);

  async function getBookmark(id) {
    setIsLoading(true);
    setCurrentBookmark(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      // console.log(data);
      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  //

  async function createBookmark(newBookmark) {
    setIsLoading(true);

    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      // console.log(data);
      setBookmarks((prev) => [...prev, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        cureentBookmark,
        getBookmark,
        isLoading,
        createBookmark,
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
