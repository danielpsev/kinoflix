
import React, {useContext, useState} from "react";
import {NavLink} from "react-router-dom";
import axios from "../../axios";
import { useAuth } from "../../context/Auth";
import ProfileCSS from "./Profile.module.css";
import FilmsList from "../Main/FilmsList";
const Profile = () => {
    const auth = useAuth();
    return ( 
        <main>
            <div className="wrapper">
            <div className="main-inner">
                <h2 className={ProfileCSS.ProfileTitle}>Vartotojo {auth.user.username} mėgstamiausių filmų sąrašas</h2>
                <FilmsList/>
            </div>
            
         </div>
   </main>
    );
}

export default Profile;