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
    const {thirdPartyView} = useContext(ThirdPartyContext);
    const isEncrypted = useSelector(state => state.chat.isEncrypted);
    const {fileKey, filename} = JSON.parse(attachment);

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

    const downloadOnly = () =>{
        downloadFile(filename)
            .then((url) => {
                setUrl(url);
            })
            .catch(err => console.log("Download only: file deleted"));
    };

    useEffect(() => {
        if(isEncrypted){
            downloadAndDecrypt();
        }
        else{
            downloadOnly();
        }
        // eslint-disable-next-line
    }, [isEncrypted])

    return (
        // <>
        //     {thirdPartyView ? attachment : (<a href={url} download><img src={url} alt={filename} loading="lazy" /></a>)}
        // </>
        <a href={url} download><img src={url} alt={filename} loading="lazy" /></a>
        
    );
    
};



export default Attachment;