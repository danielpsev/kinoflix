import React from "react";
import AdminCSS from '../Admin.module.css';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
export default function AdmFilm(props) {
    const {obj, deleteFilm} = props;
    const {_id, title, description, duration, releaseYear, posterSrc, director} = obj;

    const title_sub = title.length > 14 ? title.substring(0, 14) + "...": title;
    const description_sub = description.length > 50 ? description.substring(0, 50) + "...": description;
    return (
    <tr>
        <td><img src={posterSrc} alt={title} className={AdminCSS.tableImg}/></td>
        <td>{title_sub}</td>
        <td className={AdminCSS.hideOnMobile}>{description_sub}</td>
        <td>{duration}</td>
        <td>{releaseYear}</td>
        <td>{director}</td>
        <td><AiFillEdit className={AdminCSS.tableActionIcon} title="Redaguoti"/> <AiFillDelete className={AdminCSS.tableActionIcon} title="Ištrinti" onClick={() => deleteFilm(_id)}/> </td>
    </tr>
    );
}
