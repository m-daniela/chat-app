import React, {useContext} from 'react'
import { ConversationContext } from '../context/ConversationContext';
import { AuthenticationContext } from '../context/Authentication';
import { ChatContext } from '../context/Context';

// let socket;

const SideItem = ({name}) => {
    const {dispatch} = useContext(ConversationContext);
    const {email} = useContext(AuthenticationContext);
    const {socket} = useContext(ChatContext);

    const handleClick = () =>{
        dispatch({type: "CHANGE_CONVERSATION", name});
        // socket = io("http://localhost:5000");
        socket.emit("join", ({username: email, room: name}));
    }

    return (
        <div className="side_item" onClick={() => handleClick()}>
            {name}
            <span>Last message ig</span>
        </div>
    )
}

export default SideItem
