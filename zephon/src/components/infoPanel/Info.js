import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../common/Header';
import { E3Context } from '../../utils/context/E3Context';
import { clearChat, clearConversations, clearSelected, logout } from '../../utils/reducers/redux';
import { ThirdPartyContext } from '../../utils/context/ThirdPartyContext';
import { Switch } from '@material-ui/core';


// Info
// shows information about the user (email), the current chat (participants) and the logout button
// the logout button will delete and reset all the data about the user
const Info = () => {
    const email = useSelector(state => state.user.email);
    const participants = useSelector(state => state.chat.participants);
    const selected = useSelector(state => state.selected);
    const isEncrypted = useSelector(state => state.chat.isEncrypted);
    const dispatch = useDispatch();
    const {clear} = useContext(E3Context);
    const {thirdPartyView, toggleThirdPartyView} = useContext(ThirdPartyContext);
    const [theme, setTheme] = useState(false);

    // delete and reset the data from the state and context
    const handleLogout = () =>{
        dispatch(logout());
        dispatch(clearConversations());
        dispatch(clearChat());
        dispatch(clearSelected());
        clear();
    };

    // toggle between light and dark theme
    const toggleTheme = () =>{
        
        if (theme){
            document.documentElement.setAttribute("data-theme", "dark");
        }
        else{
            document.documentElement.setAttribute("data-theme", "light");
        }
        setTheme(!theme);
    };

    return (
        <div className="info_panel">
            <Header title={"Info"}/>
            <span className={`side_container ${thirdPartyView ? "third_party" : ""}`}>{email}</span>
            {selected !== "" ? 
                <>
                    {participants?.length !== 0 ? (<span className={`side_container ${thirdPartyView ? "third_party" : ""}`}>{isEncrypted ? "Encrypted" : "Not encrypted"}</span>) : <></>}
            
                    <div className={`side_container participants ${thirdPartyView ? "third_party" : ""}`}>
                
                        {participants?.length !== 0 ? <span key={1}>Participants</span> : <></>}
                        {participants?.map(element => <span key={element}>{element === email ? "You" : element}</span>)}
                    
                
                    </div>
                </> : 
                <></>}
            <div className="side_container side_item switch">
                <Switch size={"small"} 
                    id="theme" 
                    checked={theme} 
                    color={"primary"} 
                    onClick={toggleTheme} />
                <label>
                    Theme
                </label>
            </div>
            <div className="side_container side_item switch">
                <Switch size={"small"} 
                    id="thirdpartyview" 
                    checked={thirdPartyView} 
                    color={"primary"} 
                    onClick={toggleThirdPartyView} />
                <label>
                    Third party view
                </label>
            </div>
            <span id="logout" className="side_container side_item" onClick={handleLogout}>Log out</span>
        </div>
    );
};

export default Info;
