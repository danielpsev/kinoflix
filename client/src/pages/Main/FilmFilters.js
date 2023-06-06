import React, {useEffect, useState} from "react";
import MainCSS from "./Main.module.css";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
const FilmFilters = (props) => {
  const {setFilters, setCurrPage} = props;
  const [searchInputVal, setSearchInputVal] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('desc');

 const handleFilterValChange = (e) => {
  setSortBy(e.target.value);
  // handleFiltersChange();
 }
 const handleSearchChange = (e) => {
  setSearchInputVal(e.target.value);
 }
 useEffect(() => {
  handleFiltersChange();
}, [order, sortBy]);

  const handleFiltersChange = async(reset) => {
      const filters = !reset ? `&sort_name=${sortBy}&sort_type=${order}&title=${searchInputVal}` : '';
      setFilters(filters);
      setCurrPage(1);
  }
  const onSubmit = (e) => {
    e.preventDefault();;
    handleFiltersChange();
  }
  const resetFilters = () => {
    setSortBy('');
    setSearchInputVal('');
    handleFiltersChange('reset');
  }
  return (
    <div className={MainCSS.MainTopContainer}>
      <div className={MainCSS.Banner}></div>
      <div className={MainCSS.FiltersContainer}>
        <form onSubmit={onSubmit}>
          {/* <select className={MainCSS.FilterDropdown}>
            <option>Žanras</option>
            <option>Komedija</option>
            <option>Fantastika</option>
            <option>Kriminalas</option>
          </select> */}
          <select className={MainCSS.FilterDropdown} onChange={handleFilterValChange} value={sortBy}>
            <option value=''>Rūšiuoti pagal</option>
            <option value='createdAt'>Pridėjimo datą</option>
            <option value='releaseYear'>Metus</option>
            <option value='rating'>Reitingą</option>
          </select>
          {order === 'desc' ? (
  <span onClick={() => { setOrder('asc'); handleFiltersChange(); }}><AiOutlineSortDescending className={MainCSS.FilterAscDescBtn}/></span>
) : (
  <span onClick={() => { setOrder('desc'); handleFiltersChange(); }}><AiOutlineSortAscending className={MainCSS.FilterAscDescBtn}/></span>
)}          <input
            type="text"
            className={`${MainCSS.searchInput}`}
            name="search"
            placeholder="Paieška..."
            onChange={handleSearchChange}
            value={searchInputVal}
          />
          <button type="submit" className={`${MainCSS.SearchBtn} btn btn-primary`} onClick={() => onSubmit}>Ieškoti</button>
          { sortBy || searchInputVal ? <button type="button" className={`btn btn-error`} onClick={() => resetFilters()}>Atstatyti</button> : null}
        </form>
      </div>
    </div>
  );
};

export default FilmFilters;
