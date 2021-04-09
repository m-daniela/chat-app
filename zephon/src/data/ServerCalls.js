import { baseUrl, chatsUrl, deleteMessageUrl} from "../constants/Constants";
import axios from "axios";


// get messages from a certain chat
// return a promise for redux thunk
export const getMessages = (user, conversation) =>{
    return axios
        .post(chatsUrl, {user, room: conversation})
        .then(res => res.data)
        .catch(err => {
            console.log("Get messages", err);
            return [];
        });
}


// get conversations of a user
// return a promise for redux thunk
export const getChats = (user) => {
    return axios.post(baseUrl, {user})
        .then(res => res.data)
        .catch(err => {
            console.log("Get chats", err);
            return [];
        });
}

export const deleteMessageChat = (user, chat, messageId) =>{
    return axios.post(deleteMessageUrl, {user, chat, messageId});
}