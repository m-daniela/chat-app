import React, {useReducer, createContext, useState, useEffect} from 'react'
import {io} from "socket.io-client";
import axios from "axios";
import {baseUrl} from "../../constants/Constants";

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
    const state = [];
    const [conversations, setConversations] = useState([]);
    const [messages, dispatch] = useReducer(reducer, state);

    if (!socket){
        socket = io(baseUrl);
    }

    const getConversations = () =>{
        axios.post(`${baseUrl}/`)
        .then(res => res.data)
        .then(data => setConversations(data))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getConversations();
        
    }, []);

    

    return (
        <ChatContext.Provider value={{messages, dispatch, conversations, socket}}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ContextProvider
