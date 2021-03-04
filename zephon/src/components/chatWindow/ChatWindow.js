import React, {useEffect, useContext, useState} from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import Header from '../common/Header'
import { getPublicKey } from '../services/encryption';
import { useSelector, useDispatch } from 'react-redux'
import { SocketContext } from '../context/SocketContext'
import { addMessage } from '../reducers/redux'
import { E3Context } from '../context/E3Context';
import firebase from "firebase";

const ChatWindow = () => {
  const {socket} = useContext(SocketContext);
  const {token} = useContext(E3Context);
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.email);
  // const token = useSelector(state => state.user.token);
  const current = useSelector(state => state.selected);
  // console.log("ChatWindow", current);

  // getMessagesThunk(email, conversation)

  const [isDisabled, setIsDisabled] = useState(true);
  const [currentPK, setCurrentPK] = useState(null); 
  const [recipientPK, setRecipientPK] = useState(null); 

  
 

  useEffect(() =>{
    socket.on("message", (message) =>{
      // console.log("here again", current);
      if (message.sender === current){
        dispatch(addMessage(message));
      }
      // if (current !== ""){
      //   getMessages(email, current, setMessages);
      // }
      // else{
      //   getMessages(email, message.sender, setMessages);

      // }
    });
  }, [dispatch, current, socket]);
  // }, [socket]);

  useEffect(() =>{
    if(current !== undefined && current !== ""){
      setIsDisabled(false);
      getPublicKey(email, token, setCurrentPK);
      getPublicKey(current, token, setRecipientPK);

    }
    else setIsDisabled(true);
    // eslint-disable-next-line
  }, [current]);

  const addNewMessage = (message) =>{
    if(message) {
      const date = new Date();
      const dateFirebase = firebase.firestore.Timestamp.fromDate(date);
      // console.log("????", firebase.firestore.Timestamp.now())
      
      token.authEncrypt(message, [currentPK, recipientPK])
        .then(enc => {
          socket.emit('message', {message: enc, from: email, date});
          // getMessages(email, current, setMessages);
          console.log("Chat window", {message: enc, from: email, date})
          dispatch(addMessage({text: enc, sender: email, date: dateFirebase}));

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
              <MessageInput addMessage={addNewMessage} />
            </>}
          
      </div>
  )
}

export default ChatWindow
