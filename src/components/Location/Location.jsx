import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectLocation } from "../../redux/filters/selectors";
import { selectError } from "../../redux/Vans/selectors";
import { setFilters } from "../../redux/filters/slice";

import cities from "../../data/sities.json"; // js-файл містить масив міст

import css from "./Location.module.css";

const Location = ({ tempFilters, setTempFilters }) => {
  const dispatch = useDispatch();
  const reduxLocation = useSelector(selectLocation);
  const error = useSelector(selectError);
  const [inputValue, setInputValue] = useState(
    tempFilters.location || reduxLocation || ""
  );
  const [suggestions, setSuggestions] = useState([]);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (error) {
      setInputValue("");
      dispatch(setFilters({ location: "" }));
    }
  }, [error, dispatch]);

  const filterCities = (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const filtered = cities
      .filter((city) => city.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5); // Показує тільки 5
    setSuggestions(filtered);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setTempFilters((prev) => ({ ...prev, location: value }));
    filterCities(value);
    setIsValid(true);
  };

  const handleSelectSuggestion = (city) => {
    setInputValue(city);
    setSuggestions([]);
    setTempFilters((prev) => ({ ...prev, location: city }));
    setIsValid(true);
  };

  const handleFocus = () => {
    filterCities(inputValue);
  };

  const handleBlur = () => {
    setTimeout(() => {
      const matched = cities.includes(inputValue);
      setIsValid(matched || inputValue === "");
      setSuggestions([]);
    }, 200);
  };

  return (
    <div className={css.location_wrapper}>
      <label htmlFor="location" className={css.location_label}>
        Location
      </label>
      <div className={css.input_container}>
        <svg className={`${css.icon} ${inputValue ? css.icon_active : ""}`}>
          <use xlinkHref="/icons-sprite.svg#icon-map" />
        </svg>
        <input
          id="location"
          type="text"
          placeholder="Enter location"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${css.location_input} ${!isValid ? css.invalid : ""}`}
          aria-autocomplete="list"
          aria-controls="location-suggestions"
          aria-haspopup="listbox"
        />

        {suggestions.length > 0 && (
          <ul
            id="location-suggestions"
            className={css.suggestions_list}
            role="listbox"
          >
            {suggestions.map((city, index) => (
              <li
                key={index}
                role="option"
                aria-selected={inputValue === city}
                className={css.suggestion_item}
                onClick={() => handleSelectSuggestion(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
      {isValid && (
        <p className={css.error_text}>
          Please select a valid city from the list
        </p>
      )}
    </div>
  );
};

export default Location;
