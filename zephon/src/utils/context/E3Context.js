import React, { createContext, useState } from 'react'

export const E3Context = createContext();

// E3Provider 
// context provider for the user token and information
// that will be used for enrcyption
const E3Provider = ({children}) =>{
    const [token, setToken] = useState(null);

    // clear the context
    const clear = () =>{
        setToken(null);
    }

    return (
        <E3Context.Provider value={{token, setToken, clear}}>
            {children}
        </E3Context.Provider>
    )
}

export default E3Provider;