import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useAuth } from "../../context/Auth";
import ProfileCSS from "./Profile.module.css";
import FilmsList from "../Main/FilmsList";
import Pagination from "../../components/Pagination/Pagination";
type authType = {
  user?: {
    username: string;
    role: string;
  }; 
};
const Profile: React.FC = () => {
  const auth : authType = useAuth() || {};
  const [films, setFilms] = useState <string[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currPage, setCurrPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getLikedFilms = async (page : number) => {
    try {
      const res = await axios.get(`/films/like/123?page=${page}`);
      setFilms(res.data.data.films);
      setIsLoading(false);
      setTotalPages(res.data.data.totalPages);
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
            <span className="acc-color">{auth.user?.username}</span> mėgstamiausių filmų sąrašas
          </h2>
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

export default Profile;
