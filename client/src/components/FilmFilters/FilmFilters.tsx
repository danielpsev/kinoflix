import React, { useEffect, useState } from "react";
import FilmFiltersCSS from "./FilmFilters.module.css";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

interface IPropsFilmFilters {
  setFilters: React.Dispatch<React.SetStateAction<string>>,
  setCurrPage: React.Dispatch<React.SetStateAction<number>>
}
const FilmFilters : React.FC<IPropsFilmFilters> = (props) => {
// const FilmFilters = (props) => {
  const { setFilters, setCurrPage } = props;
  const [searchInputVal, setSearchInputVal] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("desc");

  const handleFilterValChange = (e : React.ChangeEvent<HTMLSelectElement>) : void => {
    setSortBy(e.target.value);
  };
  // const handleSearchChange = (e : React.ChangeEvent<HTMLFormElement>) : void => {
  //   setSearchInputVal(e.target.value);
  // };
  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchInputVal(e.target.value);
  };
  useEffect(() => {
    handleFiltersChange();
  }, [order, sortBy]);

  const handleFiltersChange = async (reset ?: string) => {
    const filters = !reset
      ? `&sort_name=${sortBy}&sort_type=${order}&title=${searchInputVal}`
      : "";
    setFilters(filters);
    setCurrPage(1);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) : void => {
    e.preventDefault();
    handleFiltersChange();
  };
  const resetFilters = () : void => {
    setSortBy("");
    setSearchInputVal("");
    handleFiltersChange("reset");
  };
  return (
    <div className={FilmFiltersCSS.FiltersContainer}>
      <form onSubmit={onSubmit}>
        <select
          className={FilmFiltersCSS.FilterDropdown}
          onChange={handleFilterValChange}
          value={sortBy}
        >
          <option value="">Rūšiuoti pagal</option>
          <option value="createdAt">Pridėjimo datą</option>
          <option value="releaseYear">Metus</option>
          <option value="rating">Reitingą</option>
        </select>
        {order === "desc" ? (
          <span
            onClick={() => {
              setOrder("asc");
              handleFiltersChange();
            }}
          >
            <AiOutlineSortDescending
              className={FilmFiltersCSS.FilterAscDescBtn}
            />
          </span>
        ) : (
          <span
            onClick={() => {
              setOrder("desc");
              handleFiltersChange();
            }}
          >
            <AiOutlineSortAscending
              className={FilmFiltersCSS.FilterAscDescBtn}
            />
          </span>
        )}
        <input
          type="text"
          className={`${FilmFiltersCSS.searchInput}`}
          name="search"
          placeholder="Paieška..."
          onChange={handleSearchChange}
          value={searchInputVal}
        />
        <button
          type="submit"
          className={`${FilmFiltersCSS.SearchBtn} btn btn-primary`}
          onClick={() => onSubmit}
        >
          Ieškoti
        </button>
        {sortBy || searchInputVal ? (
          <button
            type="button"
            className={`${FilmFiltersCSS.FilterResetBtn} btn btn-error`}
            onClick={() => resetFilters()}
          >
            Atstatyti
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default FilmFilters;
