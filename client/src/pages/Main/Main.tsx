import React, { useEffect, useState } from "react";
import FilmsList from "./FilmsList";
import axios from "../../axios";
import FilmFilters from "../../components/FilmFilters/FilmFilters";
import Pagination from "../../components/Pagination/Pagination";
import MainCSS from "./Main.module.css";

const Main: React.FC = () => {
  const [films, setFilms] = useState([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currPage, setCurrPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<string>("");
  const getFilms = async (filters : string) => {
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
    getFilms(filters);
  }, [currPage, filters]);
  return (
    <main>
      <div className={MainCSS.Banner}></div>
      <div className="wrapper">
        <div className={`main-inner ${MainCSS.MainInner}`}>

          <FilmFilters
            setFilters={setFilters}
            setCurrPage={setCurrPage}
          />
          <FilmsList
            films={films}
            isLoading={isLoading}
          />
          <Pagination
            totalPages={totalPages}
            currPage={currPage}
            setCurrPage={setCurrPage}
          />
        </div>
      </div>
    </main>
  );
};

export default Main;
