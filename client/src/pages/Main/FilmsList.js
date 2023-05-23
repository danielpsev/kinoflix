import React, { useEffect, useState } from "react";
import Film from "./Film";
import axios from "../../axios";
import MainCSS from "./Main.module.css";
import { v4 as uuidv4 } from "uuid";
import ReactPaginate from "react-paginate";
import BeatLoader from "react-spinners/BeatLoader";

export default function FilmsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const [films, setFilms] = useState([]);
  const getFilms = async (page) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/films?page=${page}`);
      setFilms(res.data.data.films);
      setTotalPages(res.data.data.totalPages);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFilms(1);
  }, []);
  let films_render = films.map((el) => {
    return <Film obj={el} key={uuidv4()} />;
  });

  const handlePageClick = async (data) => {
    let currPage = data.selected + 1;
    getFilms(currPage);
  };

  return (
    <>
      {isLoading ? (
        <BeatLoader
          color="#3474eb"
          margin={15}
          size={40}
          cssOverride={{
            textAlign: "center",
          }}
        />
      ) : null}

      <div className={MainCSS.FilmListContainer}>
        {!isLoading ? films_render : null}
      </div>
      <div className="pagination-container">
        <div className="pagination-inner">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination-items"}
            // pageClassName={'pagination-item'}
            pageLinkClassName={"pagination-item"}
            // previousClassName={'pagination-item'}
            previousLinkClassName={"pagination-item"}
            // nextClassName={'pagination-item'}
            nextLinkClassName={"pagination-item"}
            breakClassName={""}
            breakLinkClassName={""}
            activeClassName={"pagination-item__active"}
          />
        </div>
      </div>
    </>
  );
}
