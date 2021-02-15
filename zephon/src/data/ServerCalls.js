import { baseUrl, chatsUrl} from "../constants/Constants";
import axios from "axios";


// get messages from a certain chat
export const getMessages = (user, conversation, setMessages) =>{
    axios.post(chatsUrl, {user, room: conversation})
        .then(res => res.data)
        .then(data => setMessages(data))
        .catch(err => console.log(err));
}

// get all chats for a user
export const getChats = (user, setConversations) => {
    axios.post(baseUrl, {user})
        .then(res => res.data)
        .then(data => setConversations(data))
        .catch(err => {
            console.log(err);
            setConversations([]);
        });
}