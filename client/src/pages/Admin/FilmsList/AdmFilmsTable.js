import React from "react";
import AdmFilm from "./AdmFilm";
import { v4 as uuidv4 } from "uuid";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "../../../axios";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import AdminCSS from "../Admin.module.css";
export default function AdmFilmsTable(props) {
  const { films, isLoading, getFilms} = props;

  const deleteFilm = async (id) => {
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
          } catch (err) {
            console.log(err);
            toast.error(err.response.data.mess);
          }
        }
      });
  }


  let films_render = films.map((el) => {
    return <AdmFilm obj={el} key={uuidv4()} deleteFilm={deleteFilm} />;
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
