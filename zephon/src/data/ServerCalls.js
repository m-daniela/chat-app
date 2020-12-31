import { baseUrl } from "../constants/Constants";
import axios from "axios";

export const getChats = (conversation, setMessages) =>{
    // const {conversation, setMessages} = useContext(ConversationContext)
    axios.post(`${baseUrl}/chats`, {user: "example", room: conversation})
    .then(res => res.data)
    .then(data => setMessages(data))
    .catch(err => console.log(err));
}