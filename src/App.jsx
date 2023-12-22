import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./Components/header/Header";
import LocationList from "./Components/locationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./Components/AppLayout/AppLayout";
import Hotels from "./Components/Hotels/Hotels";
import HotelsProvider from "./Components/context/HotelsProvider";

function App() {
  return (
    <HotelsProvider>
      <div>
        <Toaster />
        <Header />
        {/* <LocationList /> */}
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<div>single hotel</div>} />
          </Route>
        </Routes>
      </div>
    </HotelsProvider>
  );
}

export default App;
