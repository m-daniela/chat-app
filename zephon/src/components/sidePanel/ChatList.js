import React, {useContext, useEffect, useState} from 'react'
import { AuthenticationContext } from '../context/Authentication';
import { ChatContext } from '../context/Context'
import SideItem from './SideItem'

// add a new chat
const NewChat = ({close}) =>{
    const [newChat, setNewChat] = useState("");
    const {socket} = useContext(ChatContext);

    const {email} = useContext(AuthenticationContext);

    const searchUser = (e) =>{
        e.preventDefault();
        socket.emit("new chat", {chat: newChat, sender: email});
        close(false);
    }

    return (
        <>
            <button 
                className="side_item" 
                onClick={() => close(false)}>Cancel</button>
            <form 
                className="search_input" 
                onSubmit={(e) => searchUser(e)}>
                <label>
                    Username or email
                    <input type="text" value={newChat} onChange={(e) => setNewChat(e.target.value)}/>
                </label>
                <button type="submit">Add</button>
            </form>
        </>
    );
}

const ChatList = () => {
    const {conversations, socket, addNewConversation} = useContext(ChatContext);
    const [addChat, setAddChat] = useState(false);

    useEffect(() =>{
        socket.on("new chat", (newChat) => {
            addNewConversation(newChat.chatName);
        });
    }, [socket, addNewConversation]);

    const addNewChat = () =>{
        setAddChat(true);
    }

    return (
        <div className="chat_list">
            {!addChat ? <>
                <button className="side_item" onClick={addNewChat}>Add new chat</button>
                {conversations.map(elem => <SideItem key={Math.random() * 100} name={elem}/>)}
                </>
                :
                <NewChat close={setAddChat}/>
            }
        </div>
    )
}

export default ChatList
