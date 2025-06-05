import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/Vans/operations";
import { resetCampers } from "../../redux/Vans/slice";
import { selectFilters } from "../../redux/filters/selectors";
import { setFilters } from "../../redux/filters/slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faSitemap,
  faDesktop,
  faCoffee,
  faBath,
  faCaravan,
  faRadio,
  faGasPump,
  faWater,
  faAirFreshener,
  faFileWaveform,
} from "@fortawesome/free-solid-svg-icons";

import s from "./SearchForm.module.css";
import Location from "../Location/Location";
import cities from "../../data/sities.json"; // js-файл містить масив міст
// Імпорт констант
import {
  SEARCH_FORM_EQUIPMENT,
  SEARCH_FORM_VEHICLE_TYPES,
} from "../../constants/constants";

// Іконки з FontAwesome
const ICONS = {
  faWind,
  faSitemap,
  faDesktop,
  faCoffee,
  faBath,
  faCaravan,
  faRadio,
  faGasPump,
  faWater,
  faAirFreshener,
  faFileWaveform,
};

const SearchForm = ({ onSearch }) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [tempFilters, setTempFilters] = useState(filters);

  const handleIconClick = (name) => {
    setTempFilters((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters(tempFilters));
    dispatch(resetCampers());
    dispatch(fetchCampers({ ...tempFilters, page: 1, limit: 4 }));

    if (typeof onSearch === "function") {
      onSearch(tempFilters); // або filters, залежно від твоєї логіки
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.Form}>
      <Location tempFilters={tempFilters} setTempFilters={setTempFilters} />

      <p className={s.filter}>Filters</p>

      {/* Обладнання */}
      <div className={s.filter_section}>
        <h4 className={s.title}>Vehicle Equipment</h4>
        <div className={s.line}>
          <svg
            width="360"
            height="2"
            viewBox="0 0 360 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1H360" stroke="#DADDE1" />
          </svg>
        </div>

        <div className={s.item_container}>
          {SEARCH_FORM_EQUIPMENT.map(({ key, label, icon }) => (
            <div
              className={s.item}
              key={key}
              onClick={() => handleIconClick(key)}
            >
              <FontAwesomeIcon
                icon={ICONS[icon]}
                size="lg"
                style={{
                  color: tempFilters[key] ? "red" : "gray",
                  cursor: "pointer",
                }}
              />
              <p className={s.p}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Тип транспорту */}
      <div className={s.filter_section}>
        <h4 className={s.title}>Vehicle Type</h4>
        <div className={s.line}>
          <svg
            width="360"
            height="2"
            viewBox="0 0 360 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1H360" stroke="#DADDE1" />
          </svg>
        </div>

        <div className={s.item_container}>
          {SEARCH_FORM_VEHICLE_TYPES.map(({ key, label, icon }) => (
            <div
              className={s.item}
              key={key}
              onClick={() => handleIconClick(key)}
            >
              <svg
                className={s.icon}
                style={{
                  fill: tempFilters[key] ? "red" : "gray",
                  cursor: "pointer",
                  width: "24px",
                  height: "24px",
                }}
              >
                <use xlinkHref={`/icons-sprite.svg#${icon}`} />
              </svg>
              <p className={s.p}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопка пошуку */}
      <button
        type="submit"
        className={s.button}
        disabled={
          !tempFilters.location || !cities.includes(tempFilters.location)
        }
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
