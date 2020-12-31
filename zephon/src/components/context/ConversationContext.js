import React, {useReducer, createContext, useEffect, useState} from 'react'
import { getChats } from '../../data/ServerCalls';


export const ConversationContext = createContext();

const reducer = (state, action) => {
    switch(action.type){
        case ("CHANGE_CONVERSATION"): {
            return action.name;
        }
       
        default: 
            return state;
    }
}


const ConversationProvider = (props) => {
    // const state = {conversation: "", messages: []};
    const state = "";
    const [conversation, dispatch] = useReducer(reducer, state);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        getChats(conversation, setMessages);
    }, [conversation]);

    return (
        <ConversationContext.Provider value={{current: conversation, dispatch, messages, setMessages}}>
            {props.children}
        </ConversationContext.Provider>
    )
}

export default ConversationProvider
