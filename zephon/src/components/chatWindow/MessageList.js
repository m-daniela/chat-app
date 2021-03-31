import React, { useEffect, useState, useContext} from 'react'
import { useSelector } from 'react-redux';
import { getDate } from '../../constants/Constants';
import { E3Context } from '../context/E3Context';
import { getDecryptedMessages } from '../services/encryption';

/*
Message List and Message
- decryption happens in Message, using the keys
*/

const Message = ({message}) => {
  const email = useSelector(state => state.user.email);
  const [author, setAuthor] = useState("other");

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
        newMessages.map(elem => <Message key={Math.random() * 10000} message={elem}/>)
      }
    </div>
  )
}

export default MessageList
