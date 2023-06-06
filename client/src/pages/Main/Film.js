import React, {useState} from "react";
import MainCSS from './Main.module.css';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {BsFillPlayCircleFill} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import '../../style/main.css'; 
import { likeFilm, dislikeFilm } from "../../func.js";
import { useAuth } from "../../context/Auth";
export default function Film(props) {
    const navigate = useNavigate();
    const auth = useAuth();
    const {obj} = props;
    const {_id, title, country, releaseYear, posterSrc, isLiked} = obj;
    const [like, setLike] = useState(isLiked);

    const title_sub = title.length > 14 ? title.substring(0, 14) + "...": title;
    return (
    <div className={MainCSS.MainFilmContainer}>
        <img className={MainCSS.MainFilmContainer__img} src={posterSrc} alt={title}/>
        <div onClick={() => navigate(`/film/${_id}`)} className={MainCSS.MainFilmContainer__overlay}><BsFillPlayCircleFill className={MainCSS.MainFilmContainer__overlay__playIcon}/></div>
        <div className={MainCSS.MainFilmContainer__ratingBox}></div>
        <div className={MainCSS.MainFilmContainer__infoContainer}>
        <h3 className={MainCSS.MainFilmContainer__infoContainer__title}>{title_sub}</h3>
        <h4 className={MainCSS.MainFilmContainer__infoContainer__details}> {country} | {releaseYear}</h4>
         
         {like && auth.user ? <AiFillHeart onClick={() => dislikeFilm(_id, setLike)} className={`${MainCSS.MainFilmContainer__infoContainer__heart}  ${MainCSS.filledHeart}`}/> : <AiOutlineHeart onClick={() => likeFilm(_id, setLike)} className={`${MainCSS.MainFilmContainer__infoContainer__heart}  ${MainCSS.notFilledHeart}`}/>
        }
        
        </div>

    </div>
    );
}
