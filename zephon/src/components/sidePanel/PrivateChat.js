import React, {useContext, useState} from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../utils/context/SocketContext';

// Private chat
// the form for the private chat
const PrivateChat = ({close}) =>{
    const [newChat, setNewChat] = useState("");
    const [isEncrypted, setIsEncrypted] = useState(true);

    const {socket} = useContext(SocketContext);
    const email = useSelector(state => state.user.email);

    const searchUser = (e) =>{
        e.preventDefault();
        const date = new Date();
        socket.emit("new chat", {receivers: [email, newChat], sender: email, date, isEncrypted});
        close(false);
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
                Username or email
                <input type="text" value={newChat} onChange={(e) => setNewChat(e.target.value)}/>
            </label>
            <button type="submit">Add</button>
            <button onClick={(e) => handleEncryption(e)}>{isEncrypted ? "Encrypted" : "Not Encrypted"}</button>
        </form>
    );
};

export default PrivateChat;