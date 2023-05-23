
import React, {useState} from "react";
import { useAuth } from "../../context/Auth";
import {NavLink} from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
const Header = () => {
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const auth = useAuth();
    return ( 
        <header className="header">
            {loginModal? <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} setRegisterModal={setRegisterModal}/> : null}
            {registerModal? <RegisterModal registerModal={registerModal} setRegisterModal={setRegisterModal} setLoginModal={setLoginModal}/> : null}
        <div className="wrapper header-inner">
            <nav className="header-nav">
                <ul>
                    <NavLink to="/" className="logoLink">
                          <li className="header-nav__active"><h1 className="logo">Kinoflix</h1></li>
                    </NavLink>
                </ul>
            </nav>
            

             {auth.user ? (
             <div className="header-logReg-btn">
                <NavLink to="/profile" className="header__register-btn">
                    <span className="btn-primary">Profilis</span>
                </NavLink>
                <NavLink to="/" className="header__login-btn" onClick={() => auth.logout()}>
                    <span className="btn-error" onClick={() => auth.logout()}>Atsijungti</span>
                </NavLink>
            </div>
             ) :
             <div className="header-logReg-btn">
             <a href="#" className="header__register-btn">
                  <span className="btn-secondary" onClick={() => setRegisterModal(true)}>Registracija</span>
              </a>
                  <a href="#" className="header__login-btn"><span className="btn-success " onClick={() => setLoginModal(true)}>Prisijungti</span></a>
             </div>
             }

             
   

        </div>
    </header>
    );
}

export default Header;