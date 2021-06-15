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
const SideItem = ({element}) => {
    const {name, id, isEncrypted, participants} = element;
    const chatInformation = {id, name};
    const dispatch = useDispatch();
    const email = useSelector(state => state.user.email);
    const {socket} = useContext(SocketContext);

    const handleClick = () =>{
        dispatch(changeConversation(chatInformation));
        dispatch(getMessagesThunk({email, conversation: id}));
        socket.emit("join", ({username: email, room: id}));
    };

    // delete the chat 
    const handleDelete = ()=>{
        const choice = confirmDialog(`chat ${name}`);
        if (choice){
            deleteConversationUser(email, id)
                .then(_ => {
                    dispatch(changeConversation(""));
                    dispatch(deleteConversation(id));
                    const receivers = participants.slice().filter(elem => elem !== email);
                    // broadcast only when there are more users than yourself
                    if (participants.length > 1){
                        const date = new Date();
    
                        socket.emit("user left", ({username: email, room: chatInformation.id, date, receivers}));
                    }
                    
                    
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="side_container">
            <div className="side_item" onClick={() => handleClick()}>
                {name}
                <span>{isEncrypted ? "Encrypted" : "Not encrypted"}</span>
                
            </div>
            <button onClick={() => handleDelete()}><CloseOutlinedIcon fontSize="small"/></button>
        </div>
    );
};

export default SideItem;
