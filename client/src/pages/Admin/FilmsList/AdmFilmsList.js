import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import FilmFilters from "../../../components/FilmFilters/FilmFilters";
import AdmFilmsTable from "./AdmFilmsTable";
import Pagination from "../../../components/Pagination/Pagination";

const AdmFilmsList = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [films, setFilms] = useState([]);
  const [filters, setFilters] = useState('');
  const getFilms = async (page) => {
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
    getFilms(currPage);
  }, [currPage, filters]);

  return (
        <div className="main-inner mh-50vh">
         <FilmFilters
            getFilms={getFilms}
            setFilms={setFilms}
            setFilters={setFilters}
            setCurrPage={setCurrPage}
          />
          <AdmFilmsTable isLoading={isLoading} films={films} getFilms={getFilms}/>
          <Pagination
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            currPage={currPage}
            setCurrPage={setCurrPage}
          />
        </div>
  );
};

export default AdmFilmsList;
