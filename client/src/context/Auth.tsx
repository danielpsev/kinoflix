import React from 'react';
import {useState, useEffect, createContext, useContext} from 'react'
import { Navigate } from 'react-router-dom';
import axios from "../axios";
const AuthContext = createContext(null)

interface IPropsRequireChildFunc {
  children: React.ReactNode;
}
interface IPropsLogin {
  token : string,
  username : string,
  role: string
}
type authType = {
  user?: {
    username: string;
    role: string;
  };
};

export const AuthProvider = ({children} : IPropsRequireChildFunc) => {
    let data = JSON.parse(localStorage.getItem("data") as string) || null;
    const [user, setUser] = useState<object | null>(data);
    let token = localStorage.getItem("token") || null;

    const getInfo = async () => {
      if(token){        
        try {
        const res = await axios.get("/auth/me");
        const {username, role} = res.data.data;

        localStorage.setItem("data", JSON.stringify({username: username, role: role}));
        setUser(res.data.data);
      } catch (err : any) {
        console.log(err.response.data.mess);
        logout();
      }
    }else{
      logout();
    }
    }   
    useEffect(() =>  {
      getInfo();
      }, []);
        
    const login = (data : IPropsLogin) => {
        localStorage.setItem("token", data.token);
        const {username, role} = data;
        localStorage.setItem("data", JSON.stringify({username: username, role: role}));
        setUser(data);
    }
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("data");
      }    
    return (
        <AuthContext.Provider value={{user,login, logout } as any}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}

// export const RequireAuth : React.FC<requireProps> = ({children }) => {
export const RequireAuth = ({ children } : IPropsRequireChildFunc) => {
    const auth : authType = useAuth() || {};
    if(!auth.user){
        return <Navigate to='/' replace/>
    }
    return children;
}
export const RequireAdmin = ({children} : IPropsRequireChildFunc) => {

  // const auth = useAuth();
  const auth : authType = useAuth() || {};
    if ( !auth.user || auth.user.role !== 'admin') {
      return <Navigate to='/' replace/>
  }
  return children;
}

export const AuthorizedRedirect = ({children} : IPropsRequireChildFunc) => {
  // const auth = useAuth();
  const auth : authType = useAuth() || {};
  if(auth.user){
      return <Navigate to='/' replace/>
  }
  return children;
}
