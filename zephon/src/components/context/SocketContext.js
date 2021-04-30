import React, { createContext } from 'react'
import {io} from "socket.io-client";
import {baseUrl} from "../../constants/Constants";

export const SocketContext = createContext();

let socket;

// SocketProvider
// context provider for the socket
const SocketProvider = ({children}) =>{
    // initialize the socket if it is not already
    if (!socket){
        socket = io(baseUrl);
    }
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;