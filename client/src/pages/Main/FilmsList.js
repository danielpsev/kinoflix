import React, { useEffect, useState } from "react";
import Film from "./Film";
import axios from "../../axios";
import MainCSS from "./Main.module.css";
import { v4 as uuidv4 } from "uuid";
import ReactPaginate from "react-paginate";
import BeatLoader from "react-spinners/BeatLoader";
import { useAuth } from "../../context/Auth";
export default function FilmsList(props) {
  const auth = useAuth();
  const { getFilms, films, isLoading } = props;
  const [totalPages, setTotalPages] = useState(0);
  // const handleFilmsChange = async (page) => {
  //   setIsLoading(true);
  //   const res = await getFilms(page);
  //   if (res) {
  //     setTotalPages(res.data.data.totalPages);
  //     setIsLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   handleFilmsChange(1);
  // }, [auth.user]);
  let films_render = films.map((el) => {
    return <Film obj={el} key={uuidv4()} />;
  });

  // const handlePageClick = async (data) => {
  //   let currPage = data.selected + 1;
  //   handleFilmsChange(currPage);
  // };

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
        {!isLoading ? (
          films.length > 0 ? (
            films_render
          ) : (
            <p className="text-color-second">Nerasta.</p>
          )
        ) : null}
      </div>
      {/* <div className="pagination-container">
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
      </div> */}
    </>
  );
}
