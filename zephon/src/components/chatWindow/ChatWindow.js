import React, {useEffect, useContext, useState} from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import Header from '../common/Header'
import {ChatContext} from "../context/Context"
import { ConversationContext } from '../context/ConversationContext';
import { getMessages } from '../../data/ServerCalls'
import { AuthenticationContext } from '../context/Authentication'
import { getPublicKey } from '../services/encryption'


const ChatWindow = () => {
  const {dispatch, socket} = useContext(ChatContext);
  const {current, setMessages} = useContext(ConversationContext);
  const {email, eThree} = useContext(AuthenticationContext);

  const [isDisabled, setIsDisabled] = useState(true);
  const [currentPK, setCurrentPK] = useState(null); 
  const [recipientPK, setRecipientPK] = useState(null); 

  useEffect(() =>{
      socket.on("message", (msg) =>{
        getMessages(email, current, setMessages);
      });
  }, [email, dispatch, current, socket, setMessages]);

  useEffect(() =>{
    if(current !== ""){
      setIsDisabled(false);
      getPublicKey(email, eThree, setCurrentPK);
      getPublicKey(current, eThree, setRecipientPK);

    }
    else setIsDisabled(true);
    // eslint-disable-next-line
  }, [current]);

  const addMessage = (message) =>{
    if(message) {
      const date = Date();
      eThree.authEncrypt(message, [currentPK, recipientPK])
        .then(enc => {
          socket.emit('message', {message: enc, from: email, date});
          getMessages(email, current, setMessages);
        })
        .catch(err => console.log(err));
      

      // testing the encryption and decryption
      // eThree.findUsers(email)
      //   .then(user => {
      //     eThree.authEncrypt("here we go", user)
      //       .then(encrypted => {
      //         console.log("So called ciphertext", encrypted);
      //         eThree.authDecrypt(encrypted, user)
      //           .then(decrypted => {
      //             console.log("Plaintext", decrypted);
      //           })
      //       })
      //   })


    }
  }

  return (
      <div className="chat_window">
          <Header title={current} />
          {isDisabled ? 
            <div className="empty">
              <p>Welcome</p>
              <p>Please choose a chat to see magical stuff</p>
            </div> : 
            <>
              <MessageList pks={{currentPK, recipientPK}}/>
              <MessageInput addMessage={addMessage} />
            </>}
          
      </div>
  )
}

export default ChatWindow
