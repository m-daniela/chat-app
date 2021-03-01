import React, {useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../context/SocketContext';
import { changeConversation } from '../reducers/redux';

// let socket;

const SideItem = ({name}) => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.user.email);
    const {socket} = useContext(SocketContext);

    const handleClick = () =>{
        dispatch(changeConversation({conversation: name}));
        // socket = io("http://localhost:5000");
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
