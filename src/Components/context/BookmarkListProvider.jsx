import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/UseFetch";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";
//
const initialState = {
  bookmarks: [],
  isLoading: false,
  cureentBookmark: null,
  error: null,
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "bookmarks/loaded":
      return { ...state, isLoading: false, bookmarks: action.payload };
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        cureentBookmark: action.payload,
      };
    case "bookmark/delete":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id != action.payload),
        cureentBookmark: null,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        cureentBookmark: action.payload,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action!");
  }
}

//
function BookmarkListProvider({ children }) {
  const [{ bookmarks, isLoading, cureentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });

      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({ type: "rejected", payload: "error in loading bookmarks" });
      }
    }
    fetchBookmarkList();
  }, [cureentBookmark]);

  async function getBookmark(id) {
    if (Number(id) === cureentBookmark?.id) return;
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);

      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: "error in geting bookmarks" });
    }
  }
  //

  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: "error in geting bookmarks" });
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/delete", payload: id });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: "error in deleting bookmarks" });
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
        deleteBookmark,
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
