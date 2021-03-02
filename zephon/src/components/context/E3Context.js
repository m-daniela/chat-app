import React, { createContext, useState } from 'react'

export const E3Context = createContext();


const E3Provider = ({children}) =>{
    const [token, setToken] = useState(null);

    const logout = () =>{
        setToken(null);
    }

    return (
        <E3Context.Provider value={{token, setToken, logout}}>
            {children}
        </E3Context.Provider>
    )
}

export default E3Provider;