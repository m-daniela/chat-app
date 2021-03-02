import React, {useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../context/SocketContext';
import { changeConversation, getMessagesThunk } from '../reducers/redux';

// let socket;

const SideItem = ({name}) => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.user.email);
    const current = useSelector(state => state.selected);
    const {socket} = useContext(SocketContext);

    const handleClick = () =>{
        console.log(current)
        dispatch(changeConversation(name));
        dispatch(getMessagesThunk({email, conversation: current}))
        // socket = io("http://localhost:5000");
        console.log(current)
        socket.emit("join", ({username: email, room: name}));
    }

    return (
        <div className="side_item" onClick={() => handleClick()}>
            {name}
            <span>Fancy text</span>
        </div>
    )
}

export default SideItem
