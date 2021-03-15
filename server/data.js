
// database interaction

var admin = require("firebase-admin");
var serviceAccount = require("../../key.json");

const { cts } = require("./constants");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zephon-45471.firebaseio.com"
});

const db = admin.firestore();
const users = {};


const convertToTimestamp = (date) =>{
  const timestamp = admin.firestore.Timestamp.fromDate(new Date(date));
  return timestamp;
}


// add new user
// check if it exists, and if not, 
// add a new document in the users collection 
// uid (email)
// create a conversations collection with 
// and empty document called "ignore"
// email - email of the user
const addUser = async (email, req, res) =>{
  try{
    const user = await db.collection(cts.users).doc(email).get();
    if (!user.exists){
      const userAdded = await db.collection(cts.users).doc(email);
      await userAdded.set({});
      await userAdded.collection(cts.conversations).doc("ignore").set({});
    }
    else{
      console.log(`Add user: ${email} already here`)
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
// date - date used for the default message
const createChat = async (sender, receiver, date) =>{
  const message = {
    sender: "sys",
    text: "Start chatting", 
    date: convertToTimestamp(date),
  }
  console.log("Create chat: Message to be sent", message);
  try{
    const participants = [sender, receiver];
    createChatDatabase(sender, receiver, participants, message);
    createChatDatabase(receiver, sender, participants, message);

    // const conversation1 = await db.collection(cts.users)
    //   .doc(sender)
    //   .collection(cts.conversations)
    //   .doc(receiver);
    // await conversation1.set({});
    // await conversation1.collection(cts.messages)
    //   .add(message);

    // const conversation2 = await db.collection(cts.users)
    //   .doc(receiver)
    //   .collection(cts.conversations)
    //   .doc(sender);
    // await conversation2.set({});
    // await conversation2
    //   .collection(cts.messages)
    //   .add(message);
    // console.log("Create chat: New chat created");
  }
  catch(err){
    console.log("Create chat: err");
  }
  
}

// create a group chat
// sender - email of the user who starts the conversation
// name - name of the chat
// receivers - array of emails with the users added to the group
// date - date used for the default message
const createGroup = async (sender, name, receivers, date) => {
  const message = {
    sender: "sys",
    text: "Start chatting, group.", 
    date: convertToTimestamp(date),
  }
  console.log("Create group: Message to be sent", message);
  try{
    const participants = [sender, ...receivers];
    createChatDatabase(sender, name, participants, message);

    for (const receiver of receivers){
      createChatDatabase(receiver, name, participants, message);
    }

    console.log("Create group chat: New chat created");
  }
  catch(err){
    console.log("Create group chat: ", err);
  }
}

// chat creation logic
// it will add to the list of participants
// automatically, even if it is a private chat
// sender - email of the user who starts the conversation
// receiver - email of the recv or the name of the chat
// participants - array of emails with the participants
// message - the default message object
const createChatDatabase = async (sender, receiver, participants, message) =>{
  try{
    const conversation = await db.collection(cts.users)
      .doc(sender)
      .collection(cts.conversations)
      .doc(receiver);
    await conversation.set({participants});
    await conversation
      .collection(cts.messages)
      .add(message);
    // await conversation
    //   .collection(cts.participants)
    //   .doc(receiver)
    //   .set({});
  }
  catch(err){
    console.log("Create chat database: ", err);
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
    date: convertToTimestamp(date),
  }

  console.log("Send message: ", message);

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

    console.log("Send message: Message sent");
  }
  catch(err) {
    console.log("Send message: ", err);
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
    if (snapshot.id !== "ignore") conversations.push(snapshot.id);
  });

  return conversations;
}

// get messages from a conversation for a user
const getMessages = async (user, conversation) =>{
  const messages = [];
  const conversationDB = await db
  .collection(cts.users)
  .doc(user)
  .collection(cts.conversations)
  .doc(conversation);

  const rawMessages = await conversationDB
    .collection(cts.messages)
    .orderBy("date")
    .get();

  // const rawMessages = await db
  //   .collection(cts.users)
  //   .doc(user)
  //   .collection(cts.conversations)
  //   .doc(conversation)
  //   .collection(cts.messages)
  //   .orderBy("date")
  //   .get();

  rawMessages.forEach(snapshot =>{
    messages.push(snapshot.data());
  });

  const participants = await db
    .collection(cts.users)
    .doc(user)
    .collection(cts.conversations)
    .doc(conversation)
    .get();
  // participants.forEach(snapshot => {
  //     console.log("Get messages: ", snapshot)

  //   })

  console.log("Get messages: ", participants.data())

  return {messages, participants: participants.data().participants};
}


const join = (chatid, username, room) =>{
    const user = {chatid, username, room};
    users[chatid] = {chatid, username, room};
    return user;

}

const current = (chatid) => users[chatid];

module.exports = {
  join, 
  users, 
  addUser, 
  current, 
  createChat, 
  createGroup,
  sendMessage, 
  getMessages, 
  getConversations,
};