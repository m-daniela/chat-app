import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../common/Header'
import { E3Context } from '../context/E3Context'
import { clearChat, clearConversations, clearSelected, logout } from '../reducers/redux'

const Settings = () => {
    const email = useSelector(state => state.user.email);
    const participants = useSelector(state => state.chat.participants);
    const dispatch = useDispatch();
    const {clear} = useContext(E3Context);

    console.log(participants)
    const handleLogout = () =>{
        dispatch(logout());
        dispatch(clearConversations());
        dispatch(clearChat());
        dispatch(clearSelected());
        clear();
    }

    return (
        <div className="settings_panel">
            <Header title={"Privacy Settings"}/>
            <span className="side_container" >{email}</span>
            <div className="side_container participants">
                {participants.length !== 0 ? <span key={1}>Participants</span> : <></>}
                {participants?.map(element => <span key={element}>{element === email ? "You" : element}</span>)}
            </div>
            <span className="side_container side_item" onClick={handleLogout}>Log out</span>
        </div>
    )
}

export default Settings
