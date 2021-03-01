import React, {useState, createContext } from 'react'
// import { useHistory } from 'react-router-dom';
import { e3login, e3register } from '../services/encryption';

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
    // const history = useHistory();
    const [{uid, email, loggedIn}, setAuthenthication] = useState({
        uid: localStorage.getItem("uid"),
        email: localStorage.getItem("email"),
        loggedIn: localStorage.getItem("uid") ? true: false
    });
    const [eThree, setToken] = useState(null);
    

    const setLocal = (uid, email) => {
        console.log(uid);
        localStorage.setItem("uid", uid);
        localStorage.setItem("email", email);
        setAuthenthication({uid, email, loggedIn: true});
    }

    const login = (uid, email, pass) =>{
        setLocal(uid, email);
        e3login(email, pass, setToken);
    }

    const signup = (uid, email, pass) =>{
        setLocal(uid, email);
        e3register(email, pass, setToken);
    }

    const logout = () =>{
        localStorage.removeItem("uid");
        localStorage.removeItem("email");
        if (eThree !== null){
            eThree.cleanup();
        }
        setAuthenthication({uid, email, loggedIn: false});
    }

    // useEffect(() =>{
    //     if (email !== ""){
    //         e3login(email, setToken);
    //         console.log("token", token);
    //     }
    //     // eslint-disable-next-line
    // }, [email, setToken]);

    return (
        <AuthenticationContext.Provider value={{login, signup, logout, uid, email, loggedIn, eThree}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default Authentication;
