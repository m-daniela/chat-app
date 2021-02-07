import { baseUrl, chatsUrl, authUrl } from "../constants/Constants";
import axios from "axios";


export const authenticate = (user) => {
    axios.post(authUrl, {user});
}

export const getMessages = (user, conversation, setMessages) =>{
    axios.post(chatsUrl, {user, room: conversation})
        .then(res => res.data)
        .then(data => setMessages(data))
        .catch(err => console.log(err));
    }

export const getChats = (user, setConversations) => {
    axios.post(baseUrl, {user})
        .then(res => res.data)
        .then(data => setConversations(data))
        .catch(err => console.log(err));
}