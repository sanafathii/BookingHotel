import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./Components/header/Header";
import LocationList from "./Components/locationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./Components/AppLayout/AppLayout";
import Hotels from "./Components/Hotels/Hotels";
import HotelsProvider from "./Components/context/HotelsProvider";
import SingleHotel from "./Components/SingleHotel/SingleHotel";
import BookMarkLayOut from "./Components/BookMarkLayOut/BookMarkLayOut";
import BookmarkListProvider from "./Components/context/BookmarkListProvider";

import Bookmark from "./Components/BookMark/BookMark";
import SingleBookmark from "./Components/SingleBookmark/SingleBookmark";

function App() {
  return (
    <BookmarkListProvider>
      <HotelsProvider>
        <div>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route path="/bookmark" element={<BookMarkLayOut />}>
              <Route index element={<Bookmark />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<div>add bookmark</div>} />
            </Route>
          </Routes>
        </div>
      </HotelsProvider>
    </BookmarkListProvider>
  );
}

export default App;
