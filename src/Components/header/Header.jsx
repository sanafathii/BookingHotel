import React, { useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker, DateRange } from "react-date-range";
import { format } from "date-fns/esm";
import {
  NavLink,
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination" || "")
  );
  const [openOptions, setOpenOptions] = useState(false);
  const navigate = useNavigate();

  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [openDate, setOPenDate] = useState(false);
  const handelOptions = (name, oparation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: oparation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const handelSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });

    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };
  return (
    <div className="header">
      <NavLink to="/bookmark">Bookmarks</NavLink>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            type="text"
            placeholder="where to go ..."
            className="headerSearchInput"
            name="destination"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dataDropDown" onClick={() => setOPenDate(!openDate)}>
            {`${format(date[0].startDate, "MM/dd/yyyy")} to  ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              ranges={date}
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
              className="date"
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {options.adult} adult &bull; {options.children} children &bull;{" "}
            {options.room} room
          </div>
          {/*  */}
          {openOptions && (
            <GuestOptionsList
              options={options}
              setOpenOptions={setOpenOptions}
              handelOptions={handelOptions}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handelSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionsList({ options, handelOptions, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        type="adult"
        options={options}
        minLimit="1"
        handelOptions={handelOptions}
      />
      <OptionItem
        type="children"
        options={options}
        minLimit="0"
        handelOptions={handelOptions}
      />
      <OptionItem
        type="room"
        options={options}
        minLimit="1"
        handelOptions={handelOptions}
      />
    </div>
  );
}

function OptionItem({ options, type, minLimit, handelOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          onClick={() => handelOptions(type, "dec")}
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optioncounterNumber ">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handelOptions(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
