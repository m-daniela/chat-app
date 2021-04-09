
import firebase from "firebase";


export const port = 5000;
export const baseUrl = `http://localhost:${port}/`;
export const chatsUrl = `${baseUrl}chats`;
export const deleteMessageUrl = `${baseUrl}message`;
export const authUrl = `${baseUrl}auth`;
export const jwtUrl = `${baseUrl}virgil-jwt`;

const addZero = (number) => {
  return number < 10 ? `0${number}` : number;
}

// transform date to formatted string
export const getDate = (format) => {
  let today = null;

  if (format._seconds !== undefined){
    const date = new firebase.firestore.Timestamp(format._seconds, format._nanoseconds);
    today = date.toDate();
  }
  else if(format.seconds > 0){
    const date = new firebase.firestore.Timestamp(format.seconds, format.nanoseconds);
    today = date.toDate();
  }
  else{
    today = new Date(format);
  }

  if (today === undefined || today === null){
    return "";
  }
  const hour = today.getHours();
  const minutes = today.getMinutes();

  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  return `${addZero(hour)}:${addZero(minutes)} ${addZero(day)}/${addZero(month + 1)}/${year}`;
}

