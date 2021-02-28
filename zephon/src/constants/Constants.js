
import firebase from "firebase";


export const port = 5000;
export const baseUrl = `http://localhost:${port}/`;
export const chatsUrl = `${baseUrl}chats`;
export const authUrl = `${baseUrl}auth`;
export const jwtUrl = `${baseUrl}virgil-jwt`;

const addZero = (number) => {
  return number < 10 ? `0${number}` : number;
}

export const getDate = (format) => {
  let today = null;
  // console.log("getDate", format.seconds)

  if (format._seconds !== undefined){
    const date = new firebase.firestore.Timestamp(format._seconds, format._nanoseconds);
    today = date.toDate();
  }
  else{
    today = new Date(format);
  }
  // const today = format.toDate();
  // console.log(123, today)
  if (today === undefined || today === null){
    return "";
  }
  const hour = today.getHours();
  const minutes = today.getMinutes();

  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  

  return `${addZero(hour)}:${addZero(minutes)} ${addZero(day)}/${addZero(month)}/${year}`;
  
}

export const getDate2 = (format) =>{

  


  let today = null;
  console.log("getDate", format.seconds)

  if (format.seconds !== undefined){
    try{
      today = firebase.firestore.Timestamp(format.seconds, format.nanoseconds);
    }
    catch(err){
      // today = format.toDate();
      today = new Date(format);
      console.log(err)
    }
    // const today = format.toDate();
    console.log(123, today)
    if (today === undefined || today === null){
      return "";
    }
    const hour = today.getHours();
    const minutes = today.getMinutes();
  
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
  
    
  
    return `${addZero(hour)}:${addZero(minutes)} ${addZero(day)}/${addZero(month)}/${year}`;
  }

  
  
    
}