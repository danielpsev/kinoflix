import React from "react";
import Film from "./Film";
import MainCSS from "./Main.module.css";
import { v4 as uuidv4 } from "uuid";
import BeatLoader from "react-spinners/BeatLoader";
import IFilm from "../../interfaces/IFilm";


interface IPropsFilmList{
  films : Array<string>
  isLoading: boolean
}

export default function FilmsList(props : IPropsFilmList) {
  const {films, isLoading } = props;
  let films_render = films.map((el) => {
    const filmObj: IFilm = el as unknown as IFilm;
    return <Film obj={filmObj} key={uuidv4()} />;
  });
  return (
    <>
      {isLoading ? (
        <BeatLoader
          color="#3474eb"
          margin={15}
          size={40}
          cssOverride={{
            textAlign: "center",
          }}
        />
      ) : null}

      <div className={MainCSS.FilmListContainer}>
        {!isLoading ? (
          films.length > 0 ? (
            films_render
          ) : (
            <p className="text-color-second">Nerasta.</p>
          )
        ) : null}
      </div>
    </>
  );
}
