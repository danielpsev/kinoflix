import React from "react";
import FilmsList from './FilmsList';
import MainCSS from "./Main.module.css";
import FilmFilters from "./FilmFilters";
const Main = () => {
      
    return (
        <main>
        <div className="wrapper">
            <div className="main-inner">
                <FilmFilters/>
                <FilmsList/>
            </div>
         </div>
    </main>
    );
}

export default Main;