import React, { createContext } from 'react'
import {io} from "socket.io-client";
import {baseUrl} from "../../constants/Constants";

export const SocketContext = createContext();

let socket;

const SocketProvider = ({children}) =>{
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