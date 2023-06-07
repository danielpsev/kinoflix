import React from "react";
import AdminCSS from '../Admin.module.css';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import IFilm from "../../../interfaces/IFilm";



interface IPropsAdmFilm{
    obj: IFilm,
    deleteFilm: (id: string) => void
}

export default function AdmFilm(props : IPropsAdmFilm) {
    const navigate = useNavigate();
    const {obj, deleteFilm} = props;
    const {_id, title, description, duration, releaseYear, posterSrc, director} = obj;

    const title_sub = title.length > 18 ? title.substring(0, 18) + "...": title;
    const description_sub = description.length > 50 ? description.substring(0, 50) + "...": description;
    return (
    <tr>
        <td><img src={posterSrc.substr(0, 4) == 'http' ? posterSrc : '../' + posterSrc} alt={title} className={`${AdminCSS.tableImg} pointer`} onClick={() => navigate(`/film/${_id}`)}/></td>
        <td>{title_sub}</td>
        <td className={AdminCSS.hideOnMobile}>{description_sub}</td>
        <td>{duration}</td>
        <td>{releaseYear}</td>
        <td>{director}</td>
        <td><AiFillEdit className={AdminCSS.tableActionIcon} title="Redaguoti" onClick={() => navigate(`/admin/film/edit/${_id}`)}/> <AiFillDelete className={AdminCSS.tableActionIcon} title="Ištrinti" onClick={() => deleteFilm(_id)}/> </td>
    </tr>
    );
}
