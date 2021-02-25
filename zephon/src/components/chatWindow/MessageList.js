import React, {useContext, useEffect, useState} from 'react'
import { getDate } from '../../constants/Constants';
import { AuthenticationContext } from '../context/Authentication';
import { ConversationContext } from '../context/ConversationContext';


const Message = ({message, pks}) => {
  const {email, eThree} = useContext(AuthenticationContext);
  const [decryptedMessage, setMessage] = useState("Decrypting...");
  const [author, setAuthor] = useState("other");

  // clean this part
  useEffect(() => {
    if (message.sender !== "sys"){
      if (email === message.sender) {
        setAuthor("current");
        eThree.authDecrypt(message.text, pks.currentPK)
          .then(decrypted => {
            console.log("Plaintext", decrypted);
            setMessage(decrypted)
          })
          .catch(err => console.log(err));
      }
      else{
        eThree.authDecrypt(message.text, pks.recipientPK)
          .then(decrypted => {
            console.log("Plaintext", decrypted);
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
            {console.log(message.date)}
            {getDate(message.date)}
            {/* {!message.date._seconds ? getDate(message.date) : ""} */}
          </div>
        </div>
  )
}

const MessageList = ({pks}) => {
  const {messages} = useContext(ConversationContext);

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
