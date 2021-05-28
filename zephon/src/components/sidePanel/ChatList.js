import React, {useContext, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../utils/context/SocketContext';
import { getConversationsThunk } from '../../utils/reducers/redux';
import SideItem from './SideItem';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import Chat from './Chat';

// Chat list
// display the chats and the buttons for adding other chats
// if the PrivateChat form is open, the add button will change to Close and the chat list will disappear
// same if the GroupChat form is open
const ChatList = () => {
    const {socket} = useContext(SocketContext);
    const conversations = useSelector(state => state.conversations);
    const email = useSelector(state => state.user.email);
    const dispatch = useDispatch();
    const [addChat, setAddChat] = useState(false);

    useEffect(() =>{
        socket.on("new chat", () => {
            // not the best choice - this will add the chat with the same name
            // same for the group
            // dispatch(addConversation(newChat.chatName));
            console.log("new chat");
            dispatch(getConversationsThunk({email}));
        });
        // eslint-disable-next-line
    }, [socket]);

    const toggleChatForm = () =>{
        
        setAddChat(!addChat);
    };

    return (
        <div className="chat_list">
            <button className="side_container add_button" onClick={toggleChatForm}>{addChat ? <><CloseOutlinedIcon />Close</> : <><AddOutlinedIcon />Add a new chat</>}</button>
            {!addChat ? 
                <>
                    {conversations.map(elem => <SideItem key={Math.random() * 1000} element={elem}/>)}
                </>
                :
                <></>}
            {addChat ? <Chat close={setAddChat}/> : <></>}
        </div>
    );
};

export default ChatList;
