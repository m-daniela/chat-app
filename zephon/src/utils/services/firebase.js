import firebase from "firebase";

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
export const storage = firebase.storage();

export const register = (email, password) => {
    return authentication().createUserWithEmailAndPassword(email, password);
}

export const signin = (email, password) => {
    return authentication().signInWithEmailAndPassword(email, password);
}