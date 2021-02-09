import { baseUrl, chatsUrl, authUrl } from "../constants/Constants";
import axios from "axios";


// export const authenticate = (user) => {
//     axios.post(authUrl, {user})
//         .then(res => res.data)
//         .then(data => {
//             console.log("Authentication token", data)
//             const config = {headers:{
//                 Authorization: `Bearer ${data.authToken}`,
//             }}
//             axios.get(`${baseUrl}virgil-jwt`, config)
//             .then(res => res.data)
//             .then(data => console.log("Virgil token", data))
//             .catch(err => console.log(err));
//         })
//         .catch(err => console.log(err));

// }

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