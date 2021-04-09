import React, { useEffect, useState, useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDate } from '../../constants/Constants';
import { E3Context } from '../context/E3Context';
import { getDecryptedMessages } from '../services/encryption';
import { deleteMessage } from '../reducers/redux'
import { deleteMessageChat } from '../../data/ServerCalls';

/*
Message List and Message
- decryption happens in Message, using the keys
*/

const Message = ({message}) => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.email);
  const current = useSelector(state => state.selected);
  const [author, setAuthor] = useState("other");

  const deleteUserMessage = () =>{
    const choice = window.confirm("Are you sure?");
    if(choice){
      deleteMessageChat(email, current, message.id)
        .then(_ => dispatch(deleteMessage(message.id)))
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    if (message.sender === email){
      setAuthor("current");
    }
  // eslint-disable-next-line
  }, []);
  
  return (
        <div className={`message ${author}`}>
          
          <div className="sender">
            {message.sender}
            <button onClick={() => deleteUserMessage()}>X</button>
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

const MessageList = () => {
  const messages = useSelector(state => state.chat.messages);
  const {token} = useContext(E3Context);
  const participants = useSelector(state => state.chat.participants);
  const [newMessages, setNewMessages] = useState([])

  useEffect(() => {
    getDecryptedMessages(participants, token, messages)
      .then(msg => setNewMessages(msg))
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, [messages])

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
