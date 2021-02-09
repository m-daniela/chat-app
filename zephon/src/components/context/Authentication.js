import React, {useState, createContext, useEffect} from 'react'
import { authenticate } from '../services/encryption';

export const AuthenticationContext = createContext({
    login: (uid, email) => {},
    logout: () => {},
    // token: null,
    uid: "" | null,
    email: "" | null,
    username: "" | null,
    loggedIn: false,

});

const Authentication = ({children}) => {
    const [{uid, email, loggedIn}, setAuthenthication] = useState({
        uid: localStorage.getItem("uid"),
        email: localStorage.getItem("email"),
        loggedIn: localStorage.getItem("uid") ? true: false
    });
    const [token, setToken] = useState("");
    
    const login = (uid, email) =>{
        console.log(uid);
        localStorage.setItem("uid", uid);
        localStorage.setItem("email", email);
        setAuthenthication({uid, email, loggedIn: true});
    }

    const logout = () =>{
        localStorage.removeItem("uid");
        localStorage.removeItem("email");
        setAuthenthication({uid, email, loggedIn: false});
    }

    useEffect(() =>{
        authenticate(email, setToken);
        console.log(token);
    }, [email])

    return (
        <AuthenticationContext.Provider value={{login, logout, uid, email, loggedIn}}>{children}</AuthenticationContext.Provider>
    )
}

export default Authentication;
