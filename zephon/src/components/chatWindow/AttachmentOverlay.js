import React from 'react'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';


// Attachment overlay
// show the attachment after it is added
// if it is an image, show the image
// otherwise show its name and a file icon
const AttachmentOverlay = ({attachment, setAttachment}) => {
    const [image, setImage] = React.useState(true);
    
    // close the overlay and delete the attachment
    const close = () => {
        setAttachment({
            name: "",
            attachment: "",
            show: false,
            file: null,
        });
    }

    return (
        <div className="attachment ">
            <div className="preview" onClick={() => close()}>
                <span id="filename">{attachment.name}</span>
                <div>
                    <CloseOutlinedIcon fontSize="medium"/>
                    <span>Close</span>
                </div>
            </div>
            {image ? <img src={attachment.attachment} alt="img" onError={() => setImage(false)} /> : <DescriptionOutlinedIcon  />}
        </div>
    )
}

export default AttachmentOverlay
