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


const NewGroupChat = ({close}) =>{
    const [newChat, setNewChat] = useState("");
    const [current, setCurrent] = useState("");
    const [participants, setParticipants] = useState([]);
    const {socket} = useContext(SocketContext);
    const email = useSelector(state => state.user.email);

    const searchUser = (e) =>{
        e.preventDefault();
        console.log("New chat", email)
        const date = new Date();
        socket.emit("new group", {chat: newChat, sender: email, receivers: participants, date});
        close(false);
    }

    // fix fix fix
    const addMoreUsers = (e) =>{
        e.preventDefault();
        setParticipants([...participants, current]);
        console.log("Chat list group", participants)
        setCurrent("");
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
                    Chat name
                    <input type="text" value={newChat} onChange={(e) => setNewChat(e.target.value)}/>
                </label>
                <label>
                    Username or email
                    <input type="text" value={current} onChange={(e) => setCurrent(e.target.value)}/>
                </label>
                <button onClick={(e) => addMoreUsers(e)}>Add another email</button>
                <button type="submit">Add</button>
            </form>
        </>
    );
}

// button 1 - make add simple chat visible
// button 2 - make add group visible

const ChatList = () => {
    const {socket} = useContext(SocketContext);
    const conversations = useSelector(state => state.conversations);
    const dispatch = useDispatch();
    const [addChat, setAddChat] = useState(false);
    const [addGroup, setAddGroup] = useState(false);

    useEffect(() =>{
        socket.on("new chat", (newChat) => {
            dispatch(addConversation(newChat.chatName));
        });
        // eslint-disable-next-line
    }, [socket]);

    useEffect(() =>{
        socket.on("new group", (newChat) => {
            dispatch(addConversation(newChat.chatName));
        });
        // eslint-disable-next-line
    }, [socket]);

    const addNewChat = () =>{
        setAddChat(true);
        setAddGroup(false);
    }

    const addNewGroup = () =>{
        setAddChat(false);
        setAddGroup(true);
    }

    return (
        <div className="chat_list">
            {addChat ? <NewChat close={setAddChat}/> : <button className="side_item" onClick={addNewChat}>Add new chat</button>}
            {addGroup ? <NewGroupChat close={setAddGroup}/> : <button className="side_item" onClick={addNewGroup}>Add new group</button>}
            {conversations.map(elem => <SideItem key={Math.random() * 100} name={elem}/>)}
        </div>
    )
}

export default ChatList
