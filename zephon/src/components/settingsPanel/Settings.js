import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../common/Header'
import { E3Context } from '../context/E3Context'
import { clearChat, clearConversations, clearSelected, logout } from '../reducers/redux'

const Settings = () => {
    const email = useSelector(state => state.user.email);
    const dispatch = useDispatch();
    const {clear} = useContext(E3Context);

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
            <span className="side_item" >{email}</span>
            <span className="side_item" onClick={handleLogout}>Log out</span>
        </div>
    )
}

export default Settings
