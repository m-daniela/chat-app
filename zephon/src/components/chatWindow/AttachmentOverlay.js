import React from 'react'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';


// Attachment overlay
// show the attachment after it is added
// if it is an image, show the image
// otherwise show its name and a file icon
const AttachmentOverlay = ({isAttached, setIsAttached, addAttachment}) => {
    const [image, setImage] = React.useState(true);
    
    // close the overlay and delete the attachment
    const close = () => {
        addAttachment(isAttached);
        setIsAttached({
            name: "",
            attachment: "",
            show: false,
        });
    }

    return (
        <div className="attachment ">
            <div className="preview" onClick={() => close()}><span id="filename">{isAttached.name}</span><div><CloseOutlinedIcon fontSize="medium"/><span>Close</span></div></div>
            {image ? <img src={isAttached.attachment} alt="img" onError={() => setImage(false)} /> : <DescriptionOutlinedIcon  />}
        </div>
    )
}

export default AttachmentOverlay
