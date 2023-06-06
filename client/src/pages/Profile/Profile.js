
import React, {useContext, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import axios from "../../axios";
import { useAuth } from "../../context/Auth";
import ProfileCSS from "./Profile.module.css";
import FilmsList from "../Main/FilmsList";
const Profile = () => {
    const auth = useAuth();
    const [currPage, setCurrPage] = useState(1);
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getLikedFilms = async (page) => {
        try {
            const res = await axios.get(`/films/like/123?page=${page}`);
            setFilms(res.data.data.films);
            setIsLoading(false);
            return res;
        } catch (err) {
            console.log(err);
            return false;
        }
    };
    useEffect(() => {
        getLikedFilms(currPage);
    }, [currPage]);
    return ( 
        <main>
            <div className="wrapper">
            <div className="main-inner">
                <h2 className={ProfileCSS.ProfileTitle}>Vartotojo {auth.user.username} mėgstamiausių filmų sąrašas</h2>
                <FilmsList getFilms={getLikedFilms} films={films} isLoading={isLoading}/>
            </div>
            
         </div>
   </main>
    );
}

export default Profile;