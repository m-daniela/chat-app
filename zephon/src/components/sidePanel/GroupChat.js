import React, {useContext, useState} from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../utils/context/SocketContext';

// Group chat
// the form for the group chat
const GroupChat = ({close}) =>{
    const [newChat, setNewChat] = useState("");
    const [current, setCurrent] = useState("");
    const [isEncrypted, setIsEncrypted] = useState(true);
    const {socket} = useContext(SocketContext);
    const email = useSelector(state => state.user.email);
    const [participants, setParticipants] = useState([email]);
    

    const searchUser = (e) =>{
        e.preventDefault();
        const date = new Date();
        socket.emit("new chat", {chat: newChat, sender: email, receivers: participants, date, isEncrypted});
        close(false);
    };

    const addMoreUsers = (e) =>{
        e.preventDefault();
        setParticipants([...participants, current]);
        setCurrent("");
    };

    const handleEncryption = (e) =>{
        e.preventDefault();
        setIsEncrypted(!isEncrypted);
    };

    return (
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
            <button onClick={(e) => handleEncryption(e)}>{isEncrypted ? "Encrypted" : "Not Encrypted"}</button>
        </form>
    );
};

export default GroupChat;