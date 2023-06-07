import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useAuth } from "../../context/Auth";
import ProfileCSS from "./Profile.module.css";
import FilmsList from "../Main/FilmsList";
import Pagination from "../../components/Pagination/Pagination";
const Profile = () => {
  const auth = useAuth();
  const [films, setFilms] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currPage, setCurrPage] = useState(1);
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
          <h2 className={ProfileCSS.ProfileTitle}>
            <span className="acc-color">{auth.user.username}</span> mėgstamiausių filmų sąrašas
          </h2>
          <FilmsList
            getFilms={getLikedFilms}
            films={films}
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

export default Profile;
