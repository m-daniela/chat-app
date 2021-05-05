import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import React from 'react'

// Attachment overlay
// show the attachment after it is added
// if it is an image, show the image
// otherwise show its name and a file icon
const AttachmentOverlay = ({isAttached, setIsAttached}) => {

    // close the overlay and delete the attachment
    const close = () => {
        setIsAttached({
            attachment: "",
            show: false,
        });
    }

    return (
        <div className="message_list centered attachment">
            <button onClick={() => close()}><CloseOutlinedIcon fontSize="large"/></button>
            <img src={isAttached.attachment} alt="img" />
        </div>
    )
}

export default AttachmentOverlay
