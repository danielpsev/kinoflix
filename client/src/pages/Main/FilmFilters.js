import React, {useState} from "react";
import MainCSS from "./Main.module.css";
const FilmFilters = (props) => {
  const {getFilms, setFilms} = props;
  const [searchInputVal, setSearchInputVal] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('desc');

 const handleFilterValChange = (e) => {
  setSortBy(e.target.value);
 }
 const handleSearchChange = (e) => {
  setSearchInputVal(e.target.value);
 }
  const handleFiltersChange = async(reset) => {
      const filters = !reset ? `&sort_name=${sortBy}&sort_type=${order}&title=${searchInputVal}` : '';
      console.log(filters);
      const res = await getFilms(1, filters);
      if(!res){
        setFilms([]);
      }
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
          <select className={MainCSS.FilterDropdown}>
            <option>Žanras</option>
            <option>Komedija</option>
            <option>Fantastika</option>
            <option>Kriminalas</option>
          </select>
          <select className={MainCSS.FilterDropdown} onChange={handleFilterValChange} value={sortBy}>
            <option value=''>Rūšiuoti pagal</option>
            <option value='createdAt'>Pridėjimo datą</option>
            <option value='releaseYear'>Metus</option>
            <option value='rating'>Reitingą</option>
          </select>
          {order === 'desc' ? (
  <span onClick={() => { setOrder('asc'); handleFiltersChange(); }}>asc</span>
) : (
  <span onClick={() => { setOrder('desc'); handleFiltersChange(); }}>desc</span>
)}          <input
            type="text"
            className={`${MainCSS.searchInput}`}
            name="search"
            placeholder="Ieškoti..."
            onChange={handleSearchChange}
            value={searchInputVal}
          />
          <button type="submit" onClick={() => onSubmit}>Ieškoti</button>
          { sortBy || searchInputVal ? <button type="button" onClick={() => resetFilters()}>reset</button> : null}
        </form>
      </div>
    </div>
  );
};

export default FilmFilters;
