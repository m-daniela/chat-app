import React, {useReducer, createContext, useEffect, useState, useContext} from 'react'
import { getMessages } from '../../data/ServerCalls';
import { AuthenticationContext } from './Authentication';


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
    const {email} = useContext(AuthenticationContext);

    const state = "";
    const [conversation, dispatch] = useReducer(reducer, state);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        getMessages(email, conversation, setMessages);
    }, [conversation, email]);

    return (
        <ConversationContext.Provider value={{current: conversation, dispatch, messages, setMessages}}>
            {props.children}
        </ConversationContext.Provider>
    )
}

export default ConversationProvider
