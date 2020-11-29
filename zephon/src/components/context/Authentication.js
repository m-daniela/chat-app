import React, {useState, createContext} from 'react'

export const AuthenticationContext = createContext({
    login: (uid, email) => {},
    logout: () => {},
    // token: null,
    uid: "" | null,
    email: "" | null,
    // username: null,
    loggedIn: false,

});

const Authentication = ({children}) => {
    const [{uid, email, loggedIn}, setAuthenthication] = useState({
        uid: localStorage.getItem("uid"),
        email: localStorage.getItem("email"),
        loggedIn: localStorage.getItem("uid") ? true: false
    });
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
    return (
        <AuthenticationContext.Provider value={{login, logout, uid, email, loggedIn}}>{children}</AuthenticationContext.Provider>
    )
}

export default Authentication;
