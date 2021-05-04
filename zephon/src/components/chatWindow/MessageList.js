import React, { useEffect, useState, useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { confirmDialog, getDate } from '../../utils/constants/Constants';
import { E3Context } from '../../utils/context/E3Context';
import { getDecryptedMessages } from '../../utils/services/encryption';
import { deleteMessage } from '../../utils/reducers/redux'
import { deleteMessageChat } from '../../utils/data/ServerCalls';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';


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
        .catch(err => console.log(err))
    }
  }

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
            {message.text}
          </div>
          <div className="date">
            {getDate(message.date)}
          </div>
          
        </div>
  )
}

// Message List
// message decryption happens here, using the participant's key 
// the messages are displayed in a container that is automatically scrolled to the bottom 
const MessageList = () => {
  const messages = useSelector(state => state.chat.messages);
  const {token} = useContext(E3Context);
  const participants = useSelector(state => state.chat.participants);
  const [newMessages, setNewMessages] = useState([]);

  // decrypt the messages that are in the current state
  useEffect(() => {
    getDecryptedMessages(participants, token, messages)
      .then(msg => setNewMessages(msg))
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, [messages])

  // scroll to the bottom of the container
  useEffect(() => {
    const container = document.querySelector(".message_list");
    container.scrollTop = container.scrollHeight;
  }, [newMessages]);
  
  return (
    <div className="message_list">
      {
        newMessages.map(elem => <Message key={elem.id} message={elem}/>)
      }
    </div>
  )
}

export default MessageList
