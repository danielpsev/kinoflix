import React, { useEffect, useState } from "react";
import axios from "../../axios";
import AdmNav from "./AdmNav";
import AdmAddFilm from "./AdmAddFilm";
import AdmFilmsList from "./FilmsList/AdmFilmsList";
import { useNavigate, useLocation } from "react-router-dom";
const Admin = () => {
  const [showPage, setShowPage] = useState("films_list");
  const navigate = useNavigate();
  const location = useLocation();

  const funcShowPage = (title) => {
    setShowPage(title);
    navigate("?type=" + title, { replace: true });
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("type");
    if (type == "films_list" || type == "add_film") {
      setShowPage(type);
    }
  }, [location.search]);
  return (
    <main>
      <div className="wrapper">
        <AdmNav funcShowPage={funcShowPage} showPage={showPage} />
        {showPage == "films_list" ? <AdmFilmsList /> : null}
        {showPage == "add_film" ? <AdmAddFilm /> : null}
      </div>
    </main>
  );
};

export default Admin;
