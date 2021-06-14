import React, { useEffect, useState, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmDialog, getDate } from '../../utils/constants/Constants';
import { E3Context } from '../../utils/context/E3Context';
import { decryptFile, getDecryptedMessages } from '../../utils/services/encryption';
import { deleteMessage } from '../../utils/reducers/redux';
import { deleteMessageChat } from '../../utils/data/ServerCalls';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { downloadFile } from '../../utils/services/firebase';
import { ThirdPartyContext } from '../../utils/context/ThirdPartyContext';
import Message from './Message';

// Message List
// message decryption happens here, using the participant's key 
// the messages are displayed in a container that is automatically scrolled to the bottom 
const MessageList = () => {
    const messages = useSelector(state => state.chat.messages);
    const {token} = useContext(E3Context);
    const {thirdPartyView} = useContext(ThirdPartyContext);
    const participants = useSelector(state => state.chat.participants);
    const isEncrypted = useSelector(state => state.chat.isEncrypted);
    const [newMessages, setNewMessages] = useState([]);

    // decrypt the messages that are in the current state
    useEffect(() => {
        if(isEncrypted){
            getDecryptedMessages(participants, token, messages)
                .then(msg => setNewMessages(msg))
                .catch(err => console.log(err));
        }
        else{
            setNewMessages(messages);
        }
        
    // eslint-disable-next-line
  }, [messages])

    // scroll to the bottom of the container
    useEffect(() => {
        const container = document.querySelector(".message_list");
        container.scrollTop = container.scrollHeight;
    }, [newMessages]);
  
    return (
        <div className={`message_list ${thirdPartyView ? "third_party" : ""}`}>
            {
                thirdPartyView ? 
                    messages?.map(elem => <Message key={elem.id} message={elem}/>)
                    :
                    newMessages?.map(elem => <Message key={elem.id} message={elem}/>)
            }
        </div>
    );
};

export default MessageList;
