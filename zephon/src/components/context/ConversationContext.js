import React, {useReducer, createContext} from 'react'

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
    // const state = {test: []};
    const state = "";
    const [conversation, dispatch] = useReducer(reducer, state);

    return (
        <ConversationContext.Provider value={{conversation, dispatch}}>
            {props.children}
        </ConversationContext.Provider>
    )
}

export default ConversationProvider
