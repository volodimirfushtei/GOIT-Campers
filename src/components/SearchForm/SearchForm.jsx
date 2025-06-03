import { useState } from "react";
// Для використання іконок FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faSitemap,
  faDesktop,
  faCoffee,
  faBath,
  faCaravan,
} from "@fortawesome/free-solid-svg-icons";
import s from "./SearchForm.module.css";
const vehicleTypes = [
  { label: "Van", value: "van" },
  { label: "Fully Integrated", value: "motorhome" },
  { label: "Alcove", value: "trailer" },
];

const SearchForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    location: "", // Локація для пошуку
    AC: false, // Фільтр кондиціонера
    automatic: false, // Фільтр автоматичної коробки передач
    kitchen: false, // Фільтр кухні
    TV: false, // Фільтр телевізора
    bathroom: false, // Фільтр ванної
    vehicleType: "", // Фільтр типу транспортного засобу
  });

  const handleIconClick = (name) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: !prevState[name], // Інвертуємо значення фільтру при натисканні
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters); // Викликаємо onSearch з обраними фільтрами
  };

  return (
    <form onSubmit={handleSubmit} className={s.Form}>
      {/* Локація */}
      <div>
        <label className={s.Label}>Location</label>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          placeholder="Kyiv, Ukraine"
          className={s.Input}
        />
      </div>

      {/* Фільтри за обладнанням */}
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
          <div className={s.item}>
            <FontAwesomeIcon
              icon={faWind}
              size="lg"
              color="#101828"
              onClick={() => handleIconClick("AC")}
              style={{
                color: filters.AC ? "green" : "gray",
                cursor: "pointer",
              }}
            />
            <p className={s.p}>AC</p>
          </div>
          <div className={s.item}>
            <FontAwesomeIcon
              icon={faSitemap}
              size="lg"
              color="#101828"
              onClick={() => handleIconClick("automatic")}
              style={{
                color: filters.automatic ? "green" : "gray",
                cursor: "pointer",
              }}
            />
            <p className={s.p}>Automatic</p>
          </div>
          <div className={s.item}>
            <FontAwesomeIcon
              icon={faDesktop}
              size="lg"
              color="#101828"
              onClick={() => handleIconClick("TV")}
              style={{
                color: filters.TV ? "green" : "gray",
                cursor: "pointer",
              }}
            />
            <p className={s.p}>TV</p>
          </div>
          <div className={s.item}>
            <FontAwesomeIcon
              icon={faCoffee}
              size="lg"
              color="#101828"
              onClick={() => handleIconClick("kitchen")}
              style={{
                color: filters.kitchen ? "green" : "gray",
                cursor: "pointer",
              }}
            />
            <p className={s.p}>Kitchen</p>
          </div>
          <div className={s.item}>
            <FontAwesomeIcon
              icon={faBath}
              size="lg"
              color="#101828"
              onClick={() => handleIconClick("bathroom")}
              style={{
                color: filters.bathroom ? "green" : "gray",
                cursor: "pointer",
              }}
            />
            <p className={s.p}>Bathroom</p>
          </div>
        </div>
      </div>

      {/* Фільтр типу транспортного засобу */}
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
          {vehicleTypes.map(({ label, value }) => (
            <div className={s.item} key={value}>
              <FontAwesomeIcon
                icon={faCaravan}
                size="lg"
                onClick={() => setFilters({ ...filters, vehicleType: value })}
                style={{
                  color: filters.vehicleType === value ? "green" : "gray",
                  cursor: "pointer",
                }}
              />
              <p className={s.p}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопка пошуку */}
      <button type="submit" className={s.button}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
