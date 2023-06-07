import React, {useState} from "react";
import MainCSS from './Main.module.css';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {BsFillPlayCircleFill} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import '../../style/main.css'; 
import { likeFilm, dislikeFilm } from "../../func";
import { useAuth } from "../../context/Auth";
import IFilm from "../../interfaces/IFilm"; 
interface IPropsFilm{
    obj: IFilm,
}

const Film: React.FC<IPropsFilm> = (props) =>{
// export default function Film(props: IPropsFilm) {
    const navigate = useNavigate();
    const auth = useAuth() ?? { user: null };
    const {obj} = props;
    const {_id, title, country, releaseYear, posterSrc, isLiked} = obj;
    const [like, setLike] = useState<boolean>(isLiked as boolean);

    const title_sub = title.length > 18 ? title.substring(0, 18) + "...": title;
    return (
    <div className={MainCSS.MainFilmContainer}>
        <img className={MainCSS.MainFilmContainer__img} src={posterSrc} alt={title}/>
        <div onClick={() => navigate(`/film/${_id}`)} className={MainCSS.MainFilmContainer__overlay}><BsFillPlayCircleFill className={MainCSS.MainFilmContainer__overlay__playIcon}/></div>
        <div className={MainCSS.MainFilmContainer__ratingBox}></div>
        <div className={MainCSS.MainFilmContainer__infoContainer}>
        <h3 className={MainCSS.MainFilmContainer__infoContainer__title} title={title}>{title_sub}</h3>
        <h4 className={MainCSS.MainFilmContainer__infoContainer__details}> {country} | {releaseYear}</h4>
         
         {like && auth.user ? <AiFillHeart onClick={() => dislikeFilm(_id, setLike)} className={`${MainCSS.MainFilmContainer__infoContainer__heart}  ${MainCSS.filledHeart}`} title="Pašalinti"/> : <AiOutlineHeart onClick={() => likeFilm(_id, setLike)} className={`${MainCSS.MainFilmContainer__infoContainer__heart}  ${MainCSS.notFilledHeart}`} title="Išsaugoti"/>
        }
        
        </div>

    </div>
    );
}

export default Film;