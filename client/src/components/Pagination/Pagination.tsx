import React from "react";
import ReactPaginate from "react-paginate";

interface IPaginationprops {
  totalPages : number,
  currPage: number,
  setCurrPage: React.Dispatch<React.SetStateAction<number>>
}

export default function Pagination(props : IPaginationprops) {
  const {totalPages, currPage, setCurrPage } = props;
  const handlePageClick = async (data : any) => {
    setCurrPage(data.selected + 1);
  };

  return (
    <>
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
            pageLinkClassName={"pagination-item"}
            previousLinkClassName={"pagination-item"}
            nextLinkClassName={"pagination-item"}
            breakClassName={""}
            breakLinkClassName={""}
            activeClassName={"pagination-item__active"}
            key={currPage}
            initialPage={currPage - 1}
          />
        </div>
      </div>
    </>
  );
}
