import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./Components/header/Header";
import LocationList from "./Components/locationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./Components/AppLayout/AppLayout";
import Hotels from "./Components/Hotels/Hotels";

function App() {
  return (
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
  );
}

export default App;
