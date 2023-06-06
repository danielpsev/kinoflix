import React from "react";
import AdminCSS from './Admin.module.css';
const AdmNav = (props) => {
  const {funcShowPage, showPage} = props;
  return (
        <nav className={AdminCSS.NavContainer}>
          <button
            className={
              showPage == "films_list"
                ? "Admin-nav-item btn btn-success"
                : "Admin-nav-item btn btn-primary"
            }
            onClick={() => funcShowPage("films_list")}
          >
            Filmų sąrašas
          </button>
          <button
            className={
              showPage == "add_film"
                ? "Admin-nav-item btn btn-success"
                : "Admin-nav-item btn btn-primary"
            }
            onClick={() => funcShowPage("add_film")}
          >
            Pridėti filmą
          </button>
        </nav>
  );
};
export default AdmNav;
