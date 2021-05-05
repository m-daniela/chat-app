import firebase from "firebase";
import { getId } from "../constants/Constants";

// configuration & authentication
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(config);

export const authentication = firebase.auth;
export const database = firebase.database();
export const storage = firebase.storage;
export const storageReference = storage().ref();

export const register = (email, password) => {
    return authentication().createUserWithEmailAndPassword(email, password);
}

export const signin = (email, password) => {
    return authentication().signInWithEmailAndPassword(email, password);
}

// upload a file to the firebase storage
// in:
// attachment - the encrypted file
// contenType - content type, taken from the file input
export const uploadFile = async (attachment, setFilename) =>{
    let filename = "";

    const metadata = {
      contentType: attachment.type,
    };
    
    // TODO: generalize
    if (attachment.type === "image/jpeg"){
        const id = getId();
        filename = `images/zephon_img_${id}`;
    }
    else{
        filename = `files/${attachment.name}`;
    }

    console.log(attachment);
    


    const state = storageReference.child(filename).put(attachment, metadata);
    return filename;
    // print the stages, for debugging purposes
    // state.on(storage.TaskEvent.STATE_CHANGED,
    // (snapshot) => {
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log('Upload is ' + progress + '% done');
    //         switch (snapshot.state) {
    //             case storage.TaskState.PAUSED: 
    //             console.log('Upload is paused');
    //             break;
    //             case storage.TaskState.RUNNING:
    //             console.log('Upload is running');
    //             break;
    //         }
    //     }, 
    //     (error) => {
    //         console.log("Error")
    //     }, 
    //     () => {
    //         // return the download url
    //         state.snapshot.ref.getDownloadURL().then(url => setFilename(filename));
    //     }
    // );
}


// obtain the file url from firebase storage and 
// download it to the device
// in: filename - path to the file
export const downloadFile = (filename) =>{
    const state = storageReference.child(filename);
    console.log(state);
    return state.getDownloadURL();
        // .then((url) => {
        //     console.log(url);
        // });
}
