import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FilmCSS from "./Film.module.css";
import axios from "../../axios";
import { useLocation } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { likeFilm, dislikeFilm } from "../../func";
import BeatLoader from "react-spinners/BeatLoader";
import { useAuth } from "../../context/Auth";
import YouTube from "react-youtube";
import IFilm from "../../interfaces/IFilm";

 const FilmPage: React.FC = () => {
  const auth = useAuth() ?? {user: null};
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [film, setFilm] = useState<IFilm | null>(null);
  const location = useLocation();
  const path:string = location.pathname.split("/")[2];
  const [like, setLike] = useState<boolean>(false);
  const getFilm = async () => {
    try {
      const res = await axios.get("/films/" + path);
      setFilm(res.data);
      setLike(res.data.isLiked);
      setIsLoading(false);
    } catch (err : any) {
      toast.error(err.response.data.mess);
      navigate('/');
    }
  }
  useEffect(() => {
    setIsLoading(true);
    
    getFilm();
  }, [path, auth.user]);


  const {
    _id,
    title,
    description,
    genres = [],
    country,
    duration,
    releaseYear,
    rating,
    posterSrc = 'img_placeholder.webp',
    bgSrc = 'img_placeholder.webp',
    trailerID,
  } = film ?? {};

  const videoId = trailerID;
  const playerOptions = {
    playerVars: {
      autoplay: 0 as 0 | 1 | undefined, // Specify the type of autoplay
      mute: 1,
    },
  };
  return (
    <main>
      <style>
        {`.App::before {
          background-image: url(${bgSrc && bgSrc.substr(0, 4) === 'http' ? bgSrc : '../' + bgSrc}) !important;
          background-size: cover;
        }`}
      </style>
      <div className="wrapper">
        <div>
          <div className={FilmCSS.FilmCover}>
            {isLoading ? (
              <BeatLoader
                color="#3474eb"
                margin={15}
                size={40}
                cssOverride={{
                  textAlign: "center",
                }}
              />
            ) : (
              <>
                <div className={FilmCSS.FilmCover__overlay}></div>
                <section className={FilmCSS.FilmContainer}>
                  <div className={FilmCSS.PosterBox}>
                    <img
                      className={FilmCSS.FilmContainer__img}
                      alt="poster"
                      src={posterSrc.substr(0, 4) === 'http' ? posterSrc : '../' + posterSrc}
                      // src={posterSrc}
                      // ${bgSrc.substr(0, 3) == 'http' ? bgSrc : '../'+bgSrc+''}
                    />
                    <div className={FilmCSS.RatingBox}>
                      <AiFillStar className={FilmCSS.RatingBox__star} />
                      <h3 className={FilmCSS.RatingBox__rate}>{rating}</h3>
                    </div>
                  </div>
                  <div className={FilmCSS.FilmContainer__RightSideContainer}>
                    <h2 className={FilmCSS.FilmRightSideContainer__title}>
                      {title}
                    </h2>
                    <p className={FilmCSS.FilmRightSideContainer__description}>
                      {description}
                    </p>
                    <div className={FilmCSS.FilmRightSideContainer__detailsBox}>
                      <div>
                        <p className="nowrap">
                          Išleidimo metai: <b>{releaseYear}</b>
                        </p>
                        <p className="nowrap">
                          Žanras: <b>{genres.length > 1 ? `${genres[0]}, ${genres[1]}` : genres[0]}</b>
                        </p>
                        <p className="nowrap">
                          Trukmė <b>{duration} min.</b>
                        </p>
                      </div>
                      {!like ? (
                        <button
                          className={`btn btn-success ${FilmCSS.FilmRightSideContainer__detailsBtn}`}
                          onClick={() => likeFilm(_id, setLike)}
                        >
                          Išsaugoti
                        </button>
                      ) : (
                        <button
                          className={`btn btn-error ${FilmCSS.FilmRightSideContainer__detailsBtn}`}
                          onClick={() => dislikeFilm(_id, setLike)}
                        >
                          Pašalinti
                        </button>
                      )}
                    </div>
                  </div>
                </section>
                <div className={FilmCSS.FilmTrailerContainer}>
                  <YouTube videoId={videoId} opts={playerOptions} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
export default FilmPage;
