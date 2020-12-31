import React, {useContext} from 'react'
import { ChatContext } from '../context/Context'
import SideItem from './SideItem'

const ChatList = () => {
    const {conversations} = useContext(ChatContext);
    console.log(conversations);
    return (
        <div className="chat_list">
            {conversations.map(elem => <SideItem key={Math.random() * 100} name={elem}/>)}
        </div>
    )
}

export default ChatList
