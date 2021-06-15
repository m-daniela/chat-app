import React, { useEffect, useState, useContext} from 'react';
import { useSelector } from 'react-redux';
import { E3Context } from '../../utils/context/E3Context';
import { decryptFile } from '../../utils/services/encryption';
import { downloadFile } from '../../utils/services/firebase';
import { ThirdPartyContext } from '../../utils/context/ThirdPartyContext';

// Attachment
// if the message contains an attachment, download it
// and display the image or the file name, so it can be
// accessed
const Attachment = ({attachment, sender}) => {
    const [url, setUrl] = useState("");
    const {token} = useContext(E3Context);
    const isEncrypted = useSelector(state => state.chat.isEncrypted);
    const {fileKey, filename} = JSON.parse(attachment);

    useEffect(() => {
        if(isEncrypted){
            downloadAndDecrypt();
        }
        else{
            downloadOnly();
        }
        // eslint-disable-next-line
    }, [isEncrypted]);

    // download and decrypt the file from the database
    const downloadAndDecrypt = () => {
        downloadFile(filename)
            .then((url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (e) => {
                    const blob = xhr.response;
                    decryptFile(token, blob, new Uint8Array(fileKey.data), sender)
                        .then((res) => setUrl(URL.createObjectURL(res)))
                        .catch(err => console.log("Download and decrypt", err));
                };
                xhr.open('GET', url);
                xhr.send();

            })
            .catch(err => {
                console.log("Download and decrypt: file deleted");
                setUrl("#");
            });
    };

    // download the file from the database
    const downloadOnly = () =>{
        downloadFile(filename)
            .then((url) => {
                setUrl(url);
            })
            .catch(err => console.log("Download only: file deleted"));
    };

    // hide the broken images and display the filepath directly
    const handleBrokenImage = (e, filename) =>{
        try{
            if(!e.target.parentNode){
                e.target.parentNode.text = filename;
                e.target.style.display = "hidden";
            }
        }
        catch(err){
            console.log(err);
        }
    };

    return (
        <a href={url} download rel="noreferrer">
            <img src={url} alt={filename} loading="lazy" onError={(e) => handleBrokenImage(e, filename)}/>
        </a>
        
    );
    
};

export default Attachment;