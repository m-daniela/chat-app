import React, {useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../context/SocketContext';
import { changeConversation, getMessagesThunk } from '../reducers/redux';

/* 
- chat item on the left
- socket emit "join" on click
*/
const SideItem = ({name}) => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.user.email);
    const {socket} = useContext(SocketContext);

    const handleClick = () =>{
        dispatch(changeConversation(name));
        dispatch(getMessagesThunk({email, conversation: name}));
        socket.emit("join", ({username: email, room: name}));
    }

    return (
        <div className="side_item" onClick={() => handleClick()}>
            {name}
            <span>Status maybe</span>
        </div>
    )
}

export default SideItem
