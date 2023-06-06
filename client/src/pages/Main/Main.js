import React, { useEffect, useState } from "react";
import FilmsList from "./FilmsList";
import axios from "../../axios";
import FilmFilters from "../../components/FilmFilters/FilmFilters";
import Pagination from "../../components/Pagination/Pagination";
import MainCSS from "./Main.module.css";
const Main = () => {
  const [films, setFilms] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState("");
  const getFilms = async (page, filters) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/films?page=${currPage}${filters}`);
      if (res.data.status != "error") {
        setFilms(res.data.data.films);
        setTotalPages(res.data.data.totalPages);
      } else {
        setTotalPages(1);
        setFilms([]);
      }
      setIsLoading(false);
      return res;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  useEffect(() => {
    getFilms(currPage, filters);
  }, [currPage, filters]);
  return (
    <main>
      <div className="wrapper">
        <div className="main-inner">
        <div className={MainCSS.Banner}></div>
          <FilmFilters
            getFilms={getFilms}
            setFilms={setFilms}
            setFilters={setFilters}
            setCurrPage={setCurrPage}
          />
          <FilmsList
            getFilms={getFilms}
            films={films}
            setFilms={setFilms}
            isLoading={isLoading}
          />
          <Pagination
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            currPage={currPage}
            setCurrPage={setCurrPage}
          />
        </div>
      </div>
    </main>
  );
};

export default Main;
