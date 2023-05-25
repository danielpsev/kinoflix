import React, {useState} from "react";
import FilmsList from './FilmsList';
import axios from "../../axios";
import MainCSS from "./Main.module.css";
import FilmFilters from "./FilmFilters";
const Main = () => {
    const [films, setFilms] = useState([]);
    const getFilms = async (page, filters) => {
        try {
            const res = await axios.get(`/films?page=${page}${filters}`);
            setFilms(res.data.data.films);
            return res;
        } catch (err) {
            console.log(err);
            return false;
        }
    };
    return (
        <main>
        <div className="wrapper">
            <div className="main-inner">
                <FilmFilters getFilms={getFilms} setFilms={setFilms}/>
                <FilmsList getFilms={getFilms}  films={films} setFilms={setFilms}/>
            </div>
         </div>
    </main>
    );
}

export default Main;