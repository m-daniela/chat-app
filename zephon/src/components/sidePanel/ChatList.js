import React, {useContext, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../context/SocketContext';
import { addConversation } from '../reducers/redux';
import SideItem from './SideItem';


/*
Chat List and New Chat
- Chat List 
    - add new chat
    - socket on "new chat"
- New Chat - socket emit "new chat"
*/
const NewChat = ({close}) =>{
    const [newChat, setNewChat] = useState("");
    const {socket} = useContext(SocketContext);
    const email = useSelector(state => state.user.email);

    const searchUser = (e) =>{
        e.preventDefault();
        console.log("New chat", email)
        const date = new Date();
        socket.emit("new chat", {chat: newChat, sender: email, date});
        close(false);
    }

    return (
        <>
            <button 
                className="side_item" 
                onClick={() => close(false)}>
                    Cancel
            </button>
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
    const {socket} = useContext(SocketContext);
    const conversations = useSelector(state => state.conversations);
    const dispatch = useDispatch();
    const [addChat, setAddChat] = useState(false);

    useEffect(() =>{
        socket.on("new chat", (newChat) => {
            dispatch(addConversation(newChat.chatName));
        });
        // eslint-disable-next-line
    }, [socket]);

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
