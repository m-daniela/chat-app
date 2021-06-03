import React, {useEffect, useContext, useState} from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Header from '../common/Header';
import { encryptFile, encryptMessage} from '../../utils/services/encryption';
import { useSelector, useDispatch } from 'react-redux';
import { SocketContext } from '../../utils/context/SocketContext';
import { addMessage, getConversationsThunk, getMessagesThunk } from '../../utils/reducers/redux';
import { E3Context } from '../../utils/context/E3Context';
import firebase from "firebase";
import { addMessageServer } from '../../utils/data/ServerCalls';
import AttachmentOverlay from './AttachmentOverlay';
import { uploadFile } from '../../utils/services/firebase';


// Chat Window
// the logic for message sending and receiving
// combines MessageInput and MessageList
// TODO: refactor this part
// TODO: the code for add message and add attachment is similar, extract it
const ChatWindow = () => {
    const {socket} = useContext(SocketContext);
    const {token} = useContext(E3Context);
    const dispatch = useDispatch();
    const email = useSelector(state => state.user.email);
    const current = useSelector(state => state.selected);
    const participants = useSelector(state => state.chat.participants);
    const isEncrypted = useSelector(state => state.chat.isEncrypted);

    const [fileKey, setFileKey] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [attachment, setAttachment] = useState({
        name: "",
        attachment: "",
        show: false,
        file: null,
    });
    const [successfulAttachment, setSuccessfulAttachment] = useState({
        filename: "",
        url: "",
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

    // obtain the download link and filename when the attachment is successfully uploaded
    // reset the attachment data and close the overlay
    useEffect(() =>{
        if (successfulAttachment.filename !== ""){
            const date = new Date();
            if(isEncrypted){
                const message = JSON.stringify({fileKey, filename: successfulAttachment.filename});
                sendEncryptedMessage(message, date, true);
            }
            else{
                const message = JSON.stringify({fileKey: "", filename: successfulAttachment.filename});
                sendUnencryptedMessage(message, date, true);
            }
            setAttachment({
                name: "",
                attachment: "", 
                show: false,
                file: null,
            });
        }
    }, [successfulAttachment]);


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

            // TODO: fix this
            // don't reload the messages when a new one is sent
            // state update issues here too 
            if (message.room === current.id){

                dispatch(addMessage(message));
                // things change here?
                // dispatch(getMessagesThunk({email, conversation: current.id}));
            }


        });
        // eslint-disable-next-line
    }, [current, dispatch, socket]);

    // a user leaves the group chat
    useEffect(() =>{
        socket.on("user left", (res) =>{
            // reload the conversations
            dispatch(getConversationsThunk({email}));
            console.log("Merge, bravo");
            console.log("User left", res.room, current);
            // TODO: the selected conversation changes when 
            // the user deletes it, like it happens for the 
            // conversation onMessage
            if (res.room === current.id){
                console.log("Message from the user");
                dispatch(addMessage(res));
                // things change here?
                // dispatch(getMessagesThunk({email, conversation: current.id}));
            }
        });
    }, [socket, participants]);

    // add a message
    // the message is encrypted and sent to the server
    // the server returns the id and then the complete 
    // message is sent via sockets
    // in: message - string 
    const onMessage = (message) =>{
        if(message) {
            const date = new Date();
            if (isEncrypted){
                sendEncryptedMessage(message, date, false);
            }
            else{
                sendUnencryptedMessage(message, date, false);
            }
        }
        if(attachment.show){
            if(isEncrypted){
                addAttachment();
            }
            else{
                addUnencryptedAttachment();
            }
        }
    };


    const sendEncryptedMessage = (message, date, isAttached) =>{
        const dateFirebase = firebase.firestore.Timestamp.fromDate(date);

        // the current user doesn't need to be passed in the auth enc function
        const recipients = participants.filter(elem => elem !== email);

        encryptMessage(recipients, token, message)
            .then(enc => {
                const msg = {text: enc, sender: email, room: current.id, date, receivers: participants, attachment: isAttached};

                addMessageServer(msg)
                    .then(id => {
                        dispatch(addMessage({id, text: enc, sender: email, date: dateFirebase, attachment: isAttached}));
                        socket.emit('message', {id, text: enc, sender: email, date: dateFirebase, room: current.id, attachment: isAttached});
                    });

                // dispatch(getMessagesThunk({email, conversation: current}));
            })
            .catch(err => console.log(err));
    };

    const sendUnencryptedMessage = (message, date, isAttached) =>{
        const dateFirebase = firebase.firestore.Timestamp.fromDate(date);
       
        const msg = {text: message, sender: email, room: current.id, date, receivers: participants, attachment: isAttached};

        addMessageServer(msg)
            .then(id => {
                dispatch(addMessage({id, text: message, sender: email, date: dateFirebase, attachment: isAttached}));
                socket.emit('message', {id, text: message, sender: email, date: dateFirebase, room: current.id, attachment: isAttached});
            });

        // dispatch(getMessagesThunk({email, conversation: current}));
            
    };

    
    // encrypt the attachment and obtain the file key and encrypted file
    // upload the encrypted file and get its filename
    // encrypt the filekey and filename and sent it to the recipient like a normal message
    const addAttachment = () =>{

        encryptFile(token, attachment.file)
            .then(({encryptedSharedFile, fileKey}) => {
                uploadFile(encryptedSharedFile, setSuccessfulAttachment);
                setFileKey(fileKey);
            });
    };


    const addUnencryptedAttachment = () =>{
        uploadFile(attachment.file, setSuccessfulAttachment);
    };

    return (
        <div className="chat_window">
            <Header title={current.name} />
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
                    <MessageInput addMessage={onMessage} setAttachment={setAttachment} />
                </>}
        </div>
    );
};

export default ChatWindow;

