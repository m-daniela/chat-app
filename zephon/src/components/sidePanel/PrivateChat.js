import React, {useContext, useState} from 'react'
import { useSelector } from 'react-redux';
import { SocketContext } from '../context/SocketContext';

// Private chat
// the form for the private chat
const PrivateChat = ({close}) =>{
    const [newChat, setNewChat] = useState("");
    const {socket} = useContext(SocketContext);
    const email = useSelector(state => state.user.email);

    const searchUser = (e) =>{
        e.preventDefault();
        const date = new Date();
        socket.emit("new chat", {receivers: [email, newChat], sender: email, date});
        close(false);
    }

    return (
        <form 
            className="search_input" 
            onSubmit={(e) => searchUser(e)}>
            <label>
                Username or email
                <input type="text" value={newChat} onChange={(e) => setNewChat(e.target.value)}/>
            </label>
            <button type="submit">Add</button>
        </form>
    );
}

export default PrivateChat;