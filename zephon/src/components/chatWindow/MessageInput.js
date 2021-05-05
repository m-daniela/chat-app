import React, {useState} from 'react'
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
// import {storage, storageReference} from "../../utils/services/firebase";


// Message input
// handles the message text and attachments
// this information is sent to the ChatWindow
const MessageInput = ({addMessage, setIsAttached}) => {
  const [message, setMessage] = useState("");
  // const [attachment, setAttachment] = useState(null);
  // const [a, setA] = useState("");

  const onChangeInput = (text) => {
    setMessage(text);
  }

  // get the file from the file input
  const onChangeAttachment = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (res) => {
      console.log(res.target.result);
      // setAttachment(res.target.result);
      setIsAttached({
        attachment: res.target.result,
        show: true,
      });
    }
    reader.readAsDataURL(file);
    
  }

  const onSendMessage = (e) => {
    e.preventDefault();
    addMessage(message);
    setMessage("");
  }

  // const downloadFile = (e) =>{
  //   e.preventDefault();
  //   const state = storageReference.child("3013.jpg");
  //   console.log(state);
  //   state.getDownloadURL()
  //     .then((url) => {
  //       console.log(url);
  //       setA(url);
  //     })
  // }

  // const uploadFile = (e) =>{
  //   e.preventDefault();
  //   const metadata = {
  //     contentType: 'image/jpeg',
  //   };
  //   console.log(attachment);
  //   const id = Math.floor(Math.random() * 10000);

  //   const state = storageReference.child(`${id}.txt`).put(attachment, metadata);
  //   state.on(storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  //     (snapshot) => {
  //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log('Upload is ' + snapshot + '% done');
  //       switch (snapshot.state) {
  //         case storage.TaskState.PAUSED: // or 'paused'
  //           console.log('Upload is paused');
  //           break;
  //         case storage.TaskState.RUNNING: // or 'running'
  //           console.log('Upload is running');
  //           break;
  //       }
  //     }, 
  //     (error) => {
  //       console.log("Error")
  //       }, 
  //     () => {
  //       // Upload completed successfully, now we can get the download URL
  //       state.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //         console.log('File available at', downloadURL);
  //       });
  //     }
  //   );
  // }

  return (
    <form className="message_input" onSubmit={e => onSendMessage(e)}>
      <label>
        <AttachFileOutlinedIcon/>
        <input type="file" onChange={onChangeAttachment}/>
      </label>
      <input type="text"
        onChange={e => onChangeInput(e.target.value)}
        placeholder={"Your message..."}
        value={message}/>
      <button type="submit"><SendOutlinedIcon/></button>
    </form>
  )
}
export default MessageInput
