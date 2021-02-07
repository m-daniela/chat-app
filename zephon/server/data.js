
// database interaction

var admin = require("firebase-admin");
var serviceAccount = require("../../../key.json");

const { cts } = require("./constants");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zephon-45471.firebaseio.com"
});

const db = admin.firestore();


// add new user
// check if it exists, and if not, 
// add a new document in the users collection 
// uid (email)
// create a conversations collection with 
// and empty document called "ignore"

const addUser = async (email) =>{
  console.log(email)
  try{
    const user = await db.collection(cts.users).doc(email).get();
    if (!user.exists){
      const userAdded = await db.collection(cts.users).doc(email);
      await userAdded.set({});
      await userAdded.collection(cts.conversations).doc("ignore").set({});
    }
    else{
      console.log("help")
    }
  }
  catch (err){
    console.log(err);
  }
}

// add a new chat to the database
// each participant will get a new document with 
// the other's participant email as uid
// sender (email) - the one who initialized the chat
// receiver (email) - the one added to the chat
const createChat = async (sender, receiver) =>{
  const message = {
    sender: "sys",
    text: "Start chatting", 
    date: new Date(),
  }
  try{
    const conversation1 = await db.collection(cts.users)
    .doc(sender)
    .collection(cts.conversations)
    .doc(receiver);
    await conversation1.set({});
    await conversation1.collection(cts.messages)
    .add({
      sender: "sys",
      text: "start chatting", 
      date: new Date(),
    });

    const conversation2 = await db.collection(cts.users)
      .doc(receiver)
      .collection(cts.conversations)
      .doc(sender);
    await conversation2.set({});
    await conversation2
      .collection(cts.messages)
      .add(message);
    console.log("New chat created");
  }
  catch(err){
    console.log(err);
  }
  
}

// send a message
// the message will be added to both users
// sender (email)
// receiver (email)
// text (string)
// date (Date)
const sendMessage = async (sender, receiver, text, date) => {
  const message = {
    sender,
    text, 
    date,
  }

  console.log("data", message);

  try{
    await db.collection(cts.users)
      .doc(sender)
      .collection(cts.conversations)
      .doc(receiver)
      .collection(cts.messages)
      .add(message);

    await db.collection(cts.users)
      .doc(receiver)
      .collection(cts.conversations)
      .doc(sender)
      .collection(cts.messages)
      .add(message);

    console.log("Message sent");
  }
  catch(err) {
    console.log("Send message - data", err);
  }
}


// get all conversations of a user (email)
const getConversations = async (user) =>{
  const conversations = [];
  const rawConversations = await db.collection(cts.users)
    .doc(user)
    .collection(cts.conversations)
    .get();

  rawConversations.forEach(snapshot =>{
    // console.log(snapshot.id);
    if (snapshot.id !== "ignore") conversations.push(snapshot.id);
  });

  return conversations;
}

// get messages from a conversation for a user
const getMessages = async (user, conversation) =>{
  const messages = [];
  const rawMessages = await db.collection(cts.users)
    .doc(user)
    .collection(cts.conversations)
    .doc(conversation)
    .collection(cts.messages)
    .orderBy("date")
    .get();

  rawMessages.forEach(snapshot =>{
    // console.log(snapshot.id);
    // console.log(snapshot.data());
    messages.push(snapshot.data());
  });

  return messages;
}



// here will go some user lvl logic
// user: id, name (for now)
// message: id, text
// conversation: id, user[], message[]

const users = {};

const join = (chatid, username, room) =>{
    const user = {chatid, username, room};
    users[chatid] = {chatid, username, room};
    return user;

}

// const current = (chatid) => users.find(elem => elem.chatid == chatid);
const current = (chatid) => users[chatid];

module.exports = {
  join, 
  users, 
  addUser, 
  current, 
  createChat, 
  sendMessage, 
  getMessages, 
  getConversations,
};