import React, {useEffect, useContext, useState} from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import Header from '../common/Header'
import { encryptFile, encryptMessage} from '../../utils/services/encryption';
import { useSelector, useDispatch } from 'react-redux'
import { SocketContext } from '../../utils/context/SocketContext'
import { addMessage, getMessagesThunk } from '../../utils/reducers/redux'
import { E3Context } from '../../utils/context/E3Context';
import firebase from "firebase";
import { addMessageServer } from '../../utils/data/ServerCalls';
import AttachmentOverlay from './AttachmentOverlay';
import { uploadFile } from '../../utils/services/firebase';


// Chat Window
// the logic for message sending and receiving
// combines MessageInput and MessageList
const ChatWindow = () => {
  const {socket} = useContext(SocketContext);
  const {token} = useContext(E3Context);
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.email);
  const current = useSelector(state => state.selected);
  const participants = useSelector(state => state.chat.participants);

  const [isDisabled, setIsDisabled] = useState(true);
  // const [filename, setFilename] = useState({
  //   filename: "",
  //   enc: {},
  //   key: {},
  //   file: ""
  // });
  const [attachment, setAttachment] = useState({
    name: "",
    attachment: "", 
    show: false,
    file: null,
  });

  // disable the message input if the chatroom is not selected
  // or there are no participants
  useEffect(() =>{
    if(participants !== null && current !== undefined && current !== ""){
      setIsDisabled(false);
    }
    else setIsDisabled(true);
    // eslint-disable-next-line
  }, [current, participants]);


  // a message is received
  useEffect(() =>{
    socket.on("message", (message) =>{
      // state update issues going on here
      // the selected chat changes when the recv
      // is on another chat and recv a message
      // and the wrong messages are loaded
      // POSSIBLE FIX: use different containers for this bacause the state
      // changes on one window when it changes on the other one
      // it doesn't even do what is in the if
      console.log("Chat Window You get here on message")
      console.log(message.room, current)
      // TODO: fix this
      // don't reload the messages when a new one is sent
      // state update issues here too 
      if (message.room === current || message.sender === current){
        // dispatch(addMessage(message));
        console.log(current)
        dispatch(getMessagesThunk({email, conversation: current}));
      }
      console.log("Chat Window on new message", current)

    });
    // eslint-disable-next-line
  }, [current, dispatch, socket]);


  useEffect(() => {
    socket.on("attachment", (message) =>{
      console.log("Chat Window You get here on attachment")

      // TODO: fix this
      // don't reload the messages when a new one is sent
      // state update issues here too 
      if (message.room === current || message.sender === current){
        // dispatch(addMessage(message));
        dispatch(getMessagesThunk({email, conversation: current}));
      }
    });
  // eslint-disable-next-line
  }, [current, socket]);

  // a user leaves the group chat
  // TODO: add a notification to the group members
  useEffect(() =>{
    socket.on("user left", ({username}) =>{
      console.log("User left", username)
    });
  }, [socket]);

  // add a message
  // the message is encrypted and sent to the server
  // the server returns the id and then the complete 
  // message is sent via sockets
  // in: message - string 
  const addNewMessage = (message) =>{
    console.log(message)
    if(message) {
      const date = new Date();
      const dateFirebase = firebase.firestore.Timestamp.fromDate(date);

      // the current user doesn't need to be passed in the auth enc function
      const part = participants.filter(elem => elem !== email)

      encryptMessage(part, token, message)
        .then(enc => {
          
          const msg = {message: enc, from: email, room: current, date, receivers: participants, attachment: false}

          addMessageServer(msg)
            .then(id => {
              console.log(id)
              dispatch(addMessage({id, text: enc, sender: email, date: dateFirebase}));
              // TODO: better way to handle chat types
              socket.emit('message', {message: {id, text: enc, sender: email, date: dateFirebase, room: current, attachment: false}, type: participants.length});
            });

          // dispatch(getMessagesThunk({email, conversation: current}));

          console.log("After add message dispatch")
        })
        .catch(err => console.log(err));
    }
    if(attachment.show){
      addAttachment();
    }
  }

  // encrypt the attachment and obtain the file key and encrypted file
  // upload the encrypted file and get its filename
  // encrypt the filekey and filename and sent it to the recipient like a normal message
  const addAttachment = () =>{

    encryptFile(token, attachment.file)
      .then(({encryptedSharedFile, fileKey}) => {
        console.log("HELP", fileKey)
        uploadFile(encryptedSharedFile)
          .then((filename) => {
            setAttachment({
              name: "",
              attachment: "",
              show: false,
              file: null,
            });
            const message = JSON.stringify({fileKey, filename});
            console.log("File key message", message);
            const date = new Date();
            const dateFirebase = firebase.firestore.Timestamp.fromDate(date);

            // the current user doesn't need to be passed in the auth enc function
            const part = participants.filter(elem => elem !== email)

            encryptMessage(part, token, message)
              .then(enc => {
                
                const msg = {message: enc, from: email, room: current, date, receivers: participants, attachment: true}

                addMessageServer(msg)
                  .then(id => {
                    console.log(id)
                    dispatch(addMessage({id, text: enc, sender: email, date: dateFirebase}));
                    // TODO: better way to handle chat types
                    socket.emit('attachment', {message: {id, text: enc, sender: email, date: dateFirebase, room: current, attachment: true}, type: participants.length});
                  });

                // dispatch(getMessagesThunk({email, conversation: current}));
              })
              .catch(err => console.log(err));
                  // setFilename({filename, enc: encryptedSharedFile, key: fileKey})
                  
                // socket.emit("attachment", {message: {text: attachment.attachment, sender: email, room: current}, type: participants.length})
                })
      })
  }

  

  return (
      <div className="chat_window">
          <Header title={current} />
          {/* <button onClick={click} >click</button> */}
          {/* <img src={filename.file} alt="img" /> */}
          {/* <input type="file" value={filename.file} style={{display: "block"}}/> */}
          {/* <a href={filename.file}>click</a> */}
          {isDisabled ? 
            <div className="empty centered">
              <h2>Welcome</h2>
              <p>Choose or add a new conversation to start.</p>
            </div> : 
            <>
              {attachment.show ? 
                <AttachmentOverlay attachment={attachment} setAttachment={setAttachment} /> 
                : 
                <MessageList />}
              <MessageInput addMessage={addNewMessage} setAttachment={setAttachment} />
            </>}
      </div>
  )
}

export default ChatWindow
