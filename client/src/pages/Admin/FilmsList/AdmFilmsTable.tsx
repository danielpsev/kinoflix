import React from "react";
import AdmFilm from "./AdmFilm";
import { v4 as uuidv4 } from "uuid";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "../../../axios";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import AdminCSS from "../Admin.module.css";
import IFilm from "../../../interfaces/IFilm";
interface IPropsAdmFilmsTable{
  films : Array<string>,
  isLoading : boolean,
  getFilms: () => void
}
export default function AdmFilmsTable(props : IPropsAdmFilmsTable) {
  const { films, isLoading, getFilms} = props;

  const deleteFilm = async (id : string) => {
    swal
      .fire({
        title: "Veiksmo patvirtinimas",
        text: "Ar tikrai norite ištrinti filmą?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D83C3E",
        cancelButtonColor: "#1e273d",
        confirmButtonText: "Ištrinti",
        cancelButtonText: "Atšaukti!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axios.delete("/films/" + id);
            swal.fire({
              title: "Sėkmingai",
              text: "Filmas ištrintas",
              icon: "success",
              confirmButtonColor: "#3BA55B",
            });
            getFilms();
          } catch (err : any) {
            console.log(err);
            toast.error(err.response.data.mess);
          }
        }
      });
  }


  let films_render = films.map((el) => {
    const filmObj: IFilm = el as unknown as IFilm;
    return <AdmFilm obj={filmObj} key={uuidv4()} deleteFilm={deleteFilm} />;
  });



  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Pavadinimas</th>
            <th className={AdminCSS.hideOnMobile}>Aprašymas</th>
            <th>Trukmė</th>
            <th>Išleidimo metai</th>
            <th>Režisierius</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                <BeatLoader
                  color="#3474eb"
                  margin={15}
                  size={40}
                  cssOverride={{
                    textAlign: "center",
                    display: "block",
                  }}
                />
              </td>
            </tr>
          ) : films_render.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                Nerasta
              </td>
            </tr>
          ) : (
            films_render
          )}
        </tbody>
      </table>
    </>
  );
}
