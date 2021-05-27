import React, {useContext, useState} from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../utils/context/SocketContext';

// Chat
// the form for the private and group chat
// if you add one participant, it will be a pivate chat
// and the chat name field will be disabled
// otherwise, for 3+ participants, you can choose a name
const Chat = ({close}) =>{
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
                <input type="text" value={newChat} onChange={(e) => setNewChat(e.target.value)} disabled={participants.length < 2}/>
            </label>
            <label>
                Email
                <input type="text" value={current} onChange={(e) => setCurrent(e.target.value)}/>
            </label>
            <div className="side_container buttons">
                <button className="side_container" onClick={(e) => addMoreUsers(e)}>Add another email</button>
                <button className="side_container" type="submit">Finish</button>
            </div>
            
            <button className="side_container" onClick={(e) => handleEncryption(e)}>{isEncrypted ? "Encrypted" : "Not Encrypted"}</button>
            <div className="side_container participants">
                {participants.length !== 0 ? <span key={1}>Participants</span> : <></>}
                {participants?.map(element => <span key={Math.random()}>{element === email ? "You" : element}</span>)}
            </div>
        </form>
    );
};

export default Chat;