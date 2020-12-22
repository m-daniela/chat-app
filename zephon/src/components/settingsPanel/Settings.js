import React, {useContext} from 'react'
import Header from '../common/Header'

import { AuthenticationContext } from '../context/Authentication'

const Settings = () => {
    const {logout, email} = useContext(AuthenticationContext);
    const handleLogout = () =>{
        logout();
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
