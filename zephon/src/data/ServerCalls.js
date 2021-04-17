import { addMessageUrl, baseUrl, chatsUrl, deleteChatUrl, deleteMessageUrl} from "../constants/Constants";
import axios from "axios";


// get messages from a certain chat
// return a promise for the redux thunk
// - user - email of the user
// - room - the chat name
export const getMessages = (user, room) =>{
    return axios
        .post(chatsUrl, {user, room})
        .then(res => res.data)
        .catch(err => {
            console.log("Get messages", err);
            return [];
        });
}


// add a message
// this will return an index on success
// otherwise, just an empty string
// - message - the message, containing the
// the actual message, room, from, receivers, date
export const addMessageServer = (message) =>{
    console.log("????")
    return axios
        .post(addMessageUrl, {message})
        .then(res => res.data)
        .catch(err => {
            console.log("addMessage", err);
            return "";
        });
}


// get conversations of a user
// return a promise for the redux thunk
// - user - email of the user
export const getChats = (user) => {
    return axios.post(baseUrl, {user})
        .then(res => res.data)
        .catch(err => {
            console.log("Get chats", err);
            return [];
        });
}

// delete a message
// in:
// - user - current user that wants to delete the message
// - chat - chat name
// - messageId - the id of the message
export const deleteMessageChat = (user, chat, messageId) =>{
    return axios.post(deleteMessageUrl, {user, chat, messageId});
}


// delete a conversation
// in:
// - user - current user that wants to delete the message
// - chat - chat name
// - messageId - the id of the message
export const deleteConversationUser = (user, chat) =>{
    return axios.post(deleteChatUrl, {user, chat});
}