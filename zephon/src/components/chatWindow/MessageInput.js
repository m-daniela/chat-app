import React, {useState} from 'react';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import SendIcon from '@material-ui/icons/Send';


// Message input
// handles the message text and attachments
// this information is sent to the ChatWindow
const MessageInput = ({addMessage, setAttachment}) => {
    const [message, setMessage] = useState("");

    const onChangeInput = (text) => {
        setMessage(text);
    };

    // get the file from the file input
    const onChangeAttachment = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (res) => {
            setAttachment({
                name: file.name,
                attachment: res.target.result,
                show: true,
                file,
            });
        };

        reader.readAsDataURL(file);
    
    };

    const onSendMessage = (e) => {
        e.preventDefault();
        addMessage(message);
        setMessage("");
    };

 
    return (
        <form className="message_input" onSubmit={e => onSendMessage(e)}>
            <label>
                <AttachFileOutlinedIcon/>
                <input id="attachment" type="file" onChange={onChangeAttachment}/>
            </label>
            <input id="message_input" type="text"
                onChange={e => onChangeInput(e.target.value)}
                placeholder={"Your message..."}
                value={message}/>
            <button id="send" type="submit"><SendIcon/></button>
        </form>
    );
};
export default MessageInput;
