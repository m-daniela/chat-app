import React, {useReducer, createContext} from 'react'
import {io} from "socket.io-client";

export const ChatContext = createContext();

const reducer = (state, action) => {
    switch(action.type){
        case ("SEND_MESSAGE"): {
            // console.log(action.conversation)
            // return {
            //     ...state,
            //     [action.conversation]: [...state[action.conversation], action.message]
            // };
            return [...state, action.message];
        }
       
        default: 
            return state;
    }
}

let socket;

const ContextProvider = (props) => {
    // const state = {test: [], yes: []};
    const state = [];
    const conversations = ["test", "yes"];
    const [messages, dispatch] = useReducer(reducer, state);

    if (!socket){
        socket = io("http://localhost:5000");
    }

    return (
        <ChatContext.Provider value={{messages, dispatch, conversations, socket}}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ContextProvider
