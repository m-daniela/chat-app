import React, { useEffect, useState, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmDialog, getDate } from '../../utils/constants/Constants';
import { E3Context } from '../../utils/context/E3Context';
import { decryptFile, getDecryptedMessages } from '../../utils/services/encryption';
import { deleteMessage } from '../../utils/reducers/redux';
import { deleteMessageChat } from '../../utils/data/ServerCalls';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { downloadFile } from '../../utils/services/firebase';

// Attachment
// if the message contains an attachment, download it
// and display the image or the file name, so it can be
// accessed
const Attachment = ({attachment, sender}) => {
    const [url, setUrl] = useState("");
    const {token} = useContext(E3Context);
    const {fileKey, filename} = JSON.parse(attachment);

    useEffect(() => {
        downloadFile(filename)
            .then((url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (e) => {
                    const blob = xhr.response;
                    decryptFile(token, blob, new Uint8Array(fileKey.data), sender)
                        .then((res) => setUrl(URL.createObjectURL(res)));
                };
                xhr.open('GET', url);
                xhr.send();

            });
        // eslint-disable-next-line
  }, [])

    return (
        <a href={url} download><img src={url} alt={filename} loading="lazy"/></a>
    );
    
};

// Message
// displays the message 
// the deletion option is bound to each message
const Message = ({message}) => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.user.email);
    const current = useSelector(state => state.selected);
    const [author, setAuthor] = useState("other");

    // delete the message
    const deleteUserMessage = () =>{
        const choice = confirmDialog("this message");
        if(choice){
            deleteMessageChat(email, current, message.id)
                .then(_ => dispatch(deleteMessage(message.id)))
                .catch(err => console.log(err));
        }
    };

    // if the sender is the current user, give the message block different style
    useEffect(() => {
        if (message.sender === email){
            setAuthor("current");
        }
        // eslint-disable-next-line
  }, []);
  
    return (
        <div className={`message ${author}`}>
          
            <div className="sender">
                <span>{message.sender}</span>
                <button onClick={() => deleteUserMessage()}><CloseOutlinedIcon fontSize="small"/></button>
            </div>
            <div className="text">
                {!message.attachment ? message.text : (<Attachment attachment={message.text} sender={message.sender} />)}
                {/* {message.text} */}
            </div>
            <div className="date">
                {getDate(message.date)}
            </div>
          
        </div>
    );
};

// Message List
// message decryption happens here, using the participant's key 
// the messages are displayed in a container that is automatically scrolled to the bottom 
const MessageList = () => {
    const messages = useSelector(state => state.chat.messages);
    const {token} = useContext(E3Context);
    const participants = useSelector(state => state.chat.participants);
    const [newMessages, setNewMessages] = useState([]);

    // decrypt the messages that are in the current state
    useEffect(() => {
        getDecryptedMessages(participants, token, messages)
            .then(msg => setNewMessages(msg))
            .catch(err => console.log(err));
    // eslint-disable-next-line
  }, [messages])

    // scroll to the bottom of the container
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
    );
};

export default MessageList;
