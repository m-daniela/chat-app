import React, {useReducer, createContext} from 'react'
import {io} from "socket.io-client";

export const ChatContext = createContext();

const reducer = (state, action) => {
    switch(action.type){
        case ("SEND_MESSAGE"): {
            return [...state, action.message];
        }
       
        default: 
            return state;
    }
}

let socket;

const sendMessage = (value) =>{
    socket.emit("message", value);
}

const Context = (props) => {
    const state = ["abcd", "hello", "lorem"];
    const [messages, dispatch] = useReducer(reducer, state);

    // if (!socket){
    //     socket = io(":5000");
    //     socket.on('broadcast', function(msg){
    //         dispatch({type: "SEND_MESSAGE", message: msg});
    //         console.log(msg);
    //     });
    // }

    return (
        <ChatContext.Provider value={{messages, dispatch, sendMessage}}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default Context
