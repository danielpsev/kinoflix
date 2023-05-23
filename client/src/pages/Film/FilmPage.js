import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FilmCSS from "./Film.module.css";
import axios from "../../axios";
import { useLocation } from "react-router-dom";
import { AiFillStar, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { likeFilm, dislikeFilm } from "../../func.js";
import BeatLoader from "react-spinners/BeatLoader";
import YouTube from "react-youtube";
export default function FilmPage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [film, setFilm] = useState({});
  const location = useLocation();
  let path = location.pathname.split("/")[2];
  const [like, setLike] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const getFilm = async () => {
      try {
        const res = await axios.get("/films/" + path);
        setFilm(res.data);
        setLike(res.data.isLiked);
        setIsLoading(false);
        // setBg(res.data.bgSrc);
      } catch (err) {
        // toast.error(err.response.data.mess);
        // navigate('/');
      }
    };
    getFilm();
  }, [path]);
  const {
    _id,
    title,
    description,
    country,
    releaseYear,
    rating,
    posterSrc,
    bgSrc,
    trailerID,
  } = film;

  const [bg, setBg] = useState(bgSrc);

  const videoId = trailerID;
  const playerOptions = {
    playerVars: {
      autoplay: 0,
      mute: 1,
    },
  };

  return (
    <main>
      <style>
        {`.App::before {
          background-image: url(${bgSrc}) !important;
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
                {" "}
                <div className={FilmCSS.FilmCover__overlay}></div>
                <section className={FilmCSS.FilmContainer}>
                  <div className={FilmCSS.PosterBox}>
                    <img
                      className={FilmCSS.FilmContainer__img}
                      alt="poster"
                      src={posterSrc}
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
                          Žanras: <b>Fantastika</b>
                        </p>
                        <p className="nowrap">
                          Trukmė <b>2 val. 45 min.</b>
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

{
  /* <main>
<style>
  {`.App::before {
    background-image: ${bg} !important;
    background-size: cover;
  }`}
</style>
  <div className="wrapper">
      <div>
          <div className={FilmCSS.FilmCover}>
          {/* <img className={FilmCSS.FilmCover__img} src="https://www.scubadivermag.com/wp-content/uploads/2019/12/avatar-2-cover.jpg" title="cover"/> */
}
// <div className={FilmCSS.FilmCover__overlay}>
// </div>
{
  /* <div className="wrapper"> */
}
// <section className={FilmCSS.FilmContainer}>
// <div className={FilmCSS.PosterBox}>
//                   <img className={FilmCSS.FilmContainer__img} alt="poster" src="https://www.comingsoon.net/wp-content/uploads/sites/3/2022/09/Avatar-Dolby-Poster.jpg"/>
//                   <div className={FilmCSS.RatingBox}><AiFillStar className={FilmCSS.RatingBox__star}/><h3 className={FilmCSS.RatingBox__rate}>9.7</h3></div>
//                   </div>
//                   <div className={FilmCSS.FilmContainer__RightSideContainer}>
//                       <h2 className={FilmCSS.FilmRightSideContainer__title}>Avatar 2</h2>
//                       <p className={FilmCSS.FilmRightSideContainer__description}>Po beveik 13 metų režisierius James Cameron kviečia sugrįžti į fantastinį Pandoros pasaulį, kur vanduo susieja viską – prieš gimstant ir po mirties.

// Po konflikto tarp žmonių kolonizatorių ir vietinių Na‘vi genties atstovų, buvęs jūrų pėstininkas Džeikas Salis (akt. Sam Worthington) tapo tikru Na‘vi genties nariu ir dabar gyvena su savo nauja šeima.

// Bet pažįstama grėsmė sugrįžta užbaigti tai, kas buvo pradėta anksčiau ir Džeikas privalo įkvėpti Neytiri (akt. Zoe Saldana) bei visą Na‘vi armiją, kad apsaugotų jų planetą.

// Nuo mokslinės fantastikos ir veiksmo filmo „Terminatorius“ iki romantinės dramos „Titanikas“, režisierius James Cameron ne kartą įrodė, kad už jį niekas geriau nesupranta kino žiūrovų. Tačiau jo didžiausias pasisekimas kino teatruose išlieka daugiausiai visoje kino istorijoje bilietų kasose uždirbęs 2009 metų mokslinės fantastikos ir veiksmo filmas „Įsikūnijimas“. Šis filmas buvo nominuotas devyniems JAV kino meno ir mokslo akademijos apdovanojimams, įskaitant už geriausią filmą ir geriausią režisierių, ir laimėjo tris „Oskarus“ už geriausią kinematografiją, gamybos dizainą ir vaizdo efektus.

// Originalaus filmo „Įsikūnijimas“ pirmajame tęsinyje, kurio veiksmas vyksta praėjus daugiau nei dešimtmečiui po pirmojo filmo įvykių, sugrįžta aktoriai Zoe Saldana, Sam Worthington ir Sigourney Weaver, taip pat pasirodys Kate Winslet, Vin Diesel ir Michelle Yeoh. </p>
//                 <div className={FilmCSS.FilmRightSideContainer__detailsBox}>
//                   <div>
//                   <p className="nowrap">Išleidimo metai: <b>2023</b></p>
//                   <p className="nowrap">Žanras: <b>Fantastika</b></p>
//                   <p className="nowrap">Trukmė <b>2 val. 45 min.</b></p>
//                   </div>
//                   <button className={`btn btn-secondary ${FilmCSS.FilmRightSideContainer__detailsBtn}`}>Išsaugoti</button>
//                 </div>
//                 </div>
//               </section>
//               <div className={FilmCSS.FilmTrailerContainer}>
//               <YouTube videoId={videoId} opts={playerOptions} />
//               </div>

{
  /* </div> */
}
//         </div>
//     </div>
//  </div>
// </main> */}
