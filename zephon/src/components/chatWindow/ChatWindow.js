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


/*
Chat window with the Message Input and Message List
- addMessage
- socket emit and on "message"
*/

const ChatWindow = () => {
  const {socket} = useContext(SocketContext);
  const {token} = useContext(E3Context);
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.email);
  const current = useSelector(state => state.selected);

  const [isDisabled, setIsDisabled] = useState(true);
  const [currentPK, setCurrentPK] = useState(null); 
  const [recipientPK, setRecipientPK] = useState(null); 

  useEffect(() =>{
    socket.on("message", (message) =>{
      if (message.sender === current){
        dispatch(addMessage(message));
      }
    });
  }, [dispatch, current, socket]);

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
      
      token.authEncrypt(message, [currentPK, recipientPK])
        .then(enc => {
          socket.emit('message', {message: enc, from: email, date});
          console.log("Chat window", {message: enc, from: email, date})
          dispatch(addMessage({text: enc, sender: email, date: dateFirebase}));
        })
        .catch(err => console.log(err));
    }
  }

  return (
      <div className="chat_window">
          <Header title={current} />
          {isDisabled ? 
            <div className="empty">
              <h2>Welcome</h2>
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
