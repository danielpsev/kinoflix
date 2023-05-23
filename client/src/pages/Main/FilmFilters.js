import React from "react";
import MainCSS from "./Main.module.css";
const FilmFilters = () => {
  return (
    <div className={MainCSS.MainTopContainer}>
      <div className={MainCSS.Banner}></div>
      <div className={MainCSS.FiltersContainer}>
        <form>
          <select className={MainCSS.FilterDropdown}>
            <option>Žanras</option>
            <option>Komedija</option>
            <option>Fantastika</option>
            <option>Kriminalas</option>
          </select>
          <select className={MainCSS.FilterDropdown}>
            <option>Rūšiuoti pagal</option>
            <option>Metus</option>
            <option>Reitingą</option>
          </select>
          <input
            type="text"
            className={`${MainCSS.searchInput}`}
            name="search"
            placeholder="Ieškoti..."
          />
        </form>
      </div>
    </div>
  );
};

export default FilmFilters;
