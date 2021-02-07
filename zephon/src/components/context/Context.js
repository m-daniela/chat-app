import React, {useReducer, createContext, useState, useEffect, useContext} from 'react'
import {io} from "socket.io-client";
import {baseUrl} from "../../constants/Constants";
import { AuthenticationContext } from './Authentication';
import {getChats} from "../../data/ServerCalls";

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

const ContextProvider = (props) => {
    const {email} = useContext(AuthenticationContext);

    const state = [];
    const [conversations, setConversations] = useState([]);
    const [messages, dispatch] = useReducer(reducer, state);

    if (!socket){
        socket = io(baseUrl);
    }

    const getConversations = () =>{
        getChats(email, setConversations);
    }

    const addNewConversation = (newConversation) =>{
        setConversations([...conversations, newConversation]);
    }

    useEffect(() => {
        getConversations();
    }, []);

    return (
        <ChatContext.Provider value={{messages, dispatch, conversations, addNewConversation, socket}}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ContextProvider
