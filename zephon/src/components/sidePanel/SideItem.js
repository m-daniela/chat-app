import React, {useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from '../../utils/constants/Constants';
import { deleteConversationUser } from '../../utils/data/ServerCalls';
import { SocketContext } from '../../utils/context/SocketContext';
import { changeConversation, deleteConversation, getMessagesThunk } from '../../utils/reducers/redux';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

// Side item
// displays the chats in the ChatList
// the deletion option is present here
const SideItem = ({name}) => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.user.email);
    const {socket} = useContext(SocketContext);

    const handleClick = () =>{
        dispatch(changeConversation(name));
        dispatch(getMessagesThunk({email, conversation: name}));
        socket.emit("join", ({username: email, room: name}));
    };

    // delete the chat 
    const handleDelete = ()=>{
        const choice = confirmDialog(`chat ${name}`);
        if (choice){
            deleteConversationUser(email, name)
                .then(_ => {
                    dispatch(changeConversation(""));
                    dispatch(deleteConversation(name));
                    socket.emit("user left", ({username: email, room: name}));
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="side_container">
            <div className="side_item" onClick={() => handleClick()}>
                {name}
                <span>Status maybe</span>
                
            </div>
            <button onClick={() => handleDelete()}><CloseOutlinedIcon fontSize="small"/></button>
        </div>
    );
};

export default SideItem;
