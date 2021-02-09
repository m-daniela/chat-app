import React, {useContext, useEffect} from 'react'
import { getDate } from '../../constants/Constants';
import { AuthenticationContext } from '../context/Authentication';
import { ConversationContext } from '../context/ConversationContext';


const Message = ({message}) => {
  const {email} = useContext(AuthenticationContext);
  let author = "other";

  if (email === message.sender) author = "current"

  return (
        <div className={`message ${author}`}>
          <div className="sender">
            {message.sender}
          </div>
          <div className="text">
            {message.text}
          </div>
          <div className="date">
            {!message.date._seconds ? getDate(message.date) : ""}
          </div>
        </div>
  )
}

const MessageList = () => {
  const {messages} = useContext(ConversationContext);

  useEffect(() => {
    const container = document.querySelector(".message_list");
    container.scrollTop = container.scrollHeight;
  }, [messages]);
  
  return (
    <div className="message_list">
      {
        messages.map(elem => <Message key={Math.random() * 100} message={elem}/>)
      }
    </div>
  )
}

export default MessageList
