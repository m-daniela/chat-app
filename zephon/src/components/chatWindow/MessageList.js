import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { getDate } from '../../constants/Constants';


const Message = ({message, pks}) => {
  const email = useSelector(state => state.email);
  const token = useSelector(state => state.token);

  const [decryptedMessage, setMessage] = useState("Decrypting...");
  const [author, setAuthor] = useState("other");

  // clean this part
  useEffect(() => {
    if (message.sender !== "sys"){
      if (email === message.sender) {
        setAuthor("current");
        token.authDecrypt(message.text, pks.currentPK)
          .then(decrypted => {
            // console.log("Plaintext", decrypted);
            setMessage(decrypted);
          })
          .catch(err => console.log(err));
      }
      else{
        token.authDecrypt(message.text, pks.recipientPK)
          .then(decrypted => {
            // console.log("Plaintext", decrypted);
            setMessage(decrypted);
          })
          .catch(err => console.log(err));
      }
    }
    else{
      setMessage(message.text);
    }
  // eslint-disable-next-line
  }, []);
  
  

  return (
        <div className={`message ${author}`}>
          <div className="sender">
            {message.sender}
          </div>
          <div className="text">
            {decryptedMessage}
          </div>
          <div className="date">
            {getDate(message.date)}
          </div>
        </div>
  )
}

const MessageList = ({pks}) => {
  const messages = useSelector(state => state.chat.messages);

  useEffect(() => {
    const container = document.querySelector(".message_list");
    container.scrollTop = container.scrollHeight;
  }, [messages]);
  
  return (
    <div className="message_list">
      {
        messages.map(elem => <Message key={Math.random() * 10000} pks={pks} message={elem}/>)
      }
    </div>
  )
}

export default MessageList
