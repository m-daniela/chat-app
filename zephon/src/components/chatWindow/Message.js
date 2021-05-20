
import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmDialog, getDate } from '../../utils/constants/Constants';
import { deleteMessage } from '../../utils/reducers/redux';
import { deleteMessageChat } from '../../utils/data/ServerCalls';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Attachment from './Attachment';

// Message
// displays the message 
// the deletion option is bound to each message
const Message = ({message}) => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.user.email);
    const current = useSelector(state => state.selected);
    const [author, setAuthor] = useState("other");


    // delete the message
    const deleteUserMessage = () =>{
        const choice = confirmDialog("this message");
        if(choice){
            deleteMessageChat(email, current, message.id)
                .then(_ => dispatch(deleteMessage(message.id)))
                .catch(err => console.log(err));
        }
    };

    // if the sender is the current user, give the message block different style
    useEffect(() => {
        if (message.sender === email){
            setAuthor("current");
        }
        // eslint-disable-next-line
    }, []);
  
    return (
        <div className={`message ${author}`}>
          
            <div className="sender">
                <span>{message.sender}</span>
                <button onClick={() => deleteUserMessage()}><CloseOutlinedIcon fontSize="small"/></button>
            </div>
            <div className="text">
                {/* {!message.attachment ? message.text : (<Attachment attachment={message.text} sender={message.sender} />)} */}
                {message.text}
            </div>
            <div className="date">
                {getDate(message.date)}
            </div>
          
        </div>
    );
};


export default Message;