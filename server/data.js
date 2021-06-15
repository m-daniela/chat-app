
// database interaction

var admin = require("firebase-admin");
var serviceAccount = require("./key.json");

// access the constants
const { cts } = require("./constants");


// initialize the firebase instance
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zephon-45471.firebaseio.com"
});

const db = admin.firestore();
const users = {};

// convert the date to a firestore timestamp
const convertToTimestamp = (date) =>{
  const timestamp = admin.firestore.Timestamp.fromDate(new Date(date));
  return timestamp;
}


// add new user
// check if it exists, and if not, 
// add a new document in the users collection 
// create a conversations collection with 
// and empty document called "ignore"
// - email - email of the user
const addUser = async (email) =>{
  try{
    const user = await db.collection(cts.users).doc(email).get();
    if (!user.exists){
      const userAdded = await db.collection(cts.users).doc(email);
      await userAdded.set({});
      await userAdded.collection(cts.conversations).doc("ignore").set({});
      console.log("Data/ Add user: user added", email);
    }
    else{
      console.log(`Data/ Add user: ${email} already here`)
    }
  }
  catch (err){
    console.log("Data/ Add user error: ", err);
  }
}


// add a new chat for each participant
// in:
// - name - the name of the chat, can be empty if there are two participants
// - participants - array of emails
// - date - creation date
// - isEncrypted - boolean representing whether the conversation is encrypted
const createChat = async (name, participants, date, isEncrypted) => {
  const newDate = convertToTimestamp(date);

  const message = {
    sender: "sys",
    text: "Start chatting", 
    date: newDate,
    attachment: false,
  }

  // TODO: change it to name !== undefined
  // and then test it
  console.log(name);
  if (name === ""){
    
    const [recv1, recv2] = [...participants];

    const chat1 = {
      name: recv1,
      isEncrypted,
      participants,
      date: newDate
    }

    const chat2 = {
      name: recv2,
      isEncrypted,
      participants,
      date: newDate
    }

    const chatId = await addConversationDatabase(recv1, chat2, message);
    await addConversationWithIdDatabase(chatId, recv2, chat1, message);
    
  }
  else{
    const chat = {
      name,
      isEncrypted,
      participants,
      date: newDate
    }
    const chatId = await addConversationDatabase(participants[0], chat, message);
    for (const receiver of participants.slice(1)){
      await addConversationWithIdDatabase(chatId, receiver, chat, message);
    }
  }
}

// remove the participant from the participants list
// in:
// - chat - id of the chat
// - participant - email of the participant
// - user - email of the current user
const removeParticipant = (chat, participant, user) =>{
  try{
    db
      .collection(cts.users)
      .doc(user)
      .collection(cts.conversations)
      .doc(chat)
      .update({
        participants: admin.firestore.FieldValue.arrayRemove(participant)
      });
    console.log("Data/ Participant removed", participant);
  }
  catch(err){
    console.log("Data/ Participant removed, error", err);
  }
  
}

// handle user leaving 
// remove the user from the lists
// of the rest of the participants
// and send a sys message stating it
// return the message so it can be 
// added to each participant that remains
// in:
// - message - the message object
// out: 
// - the message with id and everything
const userLeftMessage = async (message) => {
  try{
    const newMessage = {
      sender: "sys",
      text: `${message.username} has left the chat.`,
      date: convertToTimestamp(message.date),
      attachment: false
    }
  
    console.log("Removing", message.receivers);
    await removeParticipant(message.room, message.username, message.receivers[0]);
    const messageId = await sendMessageDatabase(message.room, message.receivers[0], newMessage);

    // skip this step when you one participant left
    if (message.receivers.length !== 0){
      for (const receiver of message.receivers.slice(1)){
        await removeParticipant(message.room, message.username, receiver);
        sendMessageWithIdDatabase(message.room, receiver, newMessage, messageId);
      }
    }
    
    newMessage["id"] = messageId;
    newMessage["room"] = message.room;
    console.log("Data/ UserLeftMessage")
  
    return newMessage;
  }catch(err){
    console.log("Data/ UserLeftMessage", err)
    return {};
  }
}

// add a conversation to the database
// in:
// - receiver - name of the receiving user
// - chat - object containing the information about the chat (name, 
// - participants, isEncrypted)
// - message - the message object
// out: 
// - id - the id of the conversation set in the db
const addConversationDatabase = async (receiver, chat, message) =>{
  try{
    const ref = await db.collection(cts.users)
      .doc(receiver)
      .collection(cts.conversations)
      .doc();
    await ref.set(chat);
    await ref
      .collection(cts.messages)
      .add(message);

    console.log("Data/ Add Conversation DB", ref.id);
    return ref.id;
  }
  catch(err) {
    console.log("Data/ Add Conversation DB: ", err);
    return "";
  }
}

// same as addConversationDatabase, but the id is specified
const addConversationWithIdDatabase = async (chatId, receiver, chat, message) =>{
  try{
    const ref = await db.collection(cts.users)
      .doc(receiver)
      .collection(cts.conversations)
      .doc(chatId);

      await ref.set(chat);
      await ref
        .collection(cts.messages)
        .add(message)

    console.log("Data/ Add Conversation DB with ID");
  }
  catch(err) {
    console.log("Data/ Add Conversation DB with ID", err);
  }
}


// send a message
// in:
// - sender - sender of the message
// - name - name of the chat; can be either the email of the
// receiver or the name of the group chat
// - receivers - all the participants in the chat
// - date - date of the sent message
// out:
// - message id
const sendMessage = async (message) => {
  try{
    const newMessage = {
      sender: message.sender,
      text: message.text,
      date: convertToTimestamp(message.date),
      attachment: message.attachment ? message.attachment : false,
    }
    console.log("Data/ sendMessage");
    if (message.receivers.length === 2){
      const [recv1, recv2] = [...message.receivers];
      // console.log("Send messages: ", recv1, recv2, message.receivers)

      const messageId = await sendMessageDatabase(message.room, recv2, newMessage);
      sendMessageWithIdDatabase(message.room, recv1, newMessage, messageId);
      return messageId;
    }
    else{
      const messageId = await sendMessageDatabase(message.room, message.receivers[0], newMessage);
      for (const receiver of message.receivers.splice(1)){
        sendMessageWithIdDatabase(message.room, receiver, newMessage, messageId);
      }
      return messageId;
    }
  }
  catch(err){
    console.log("Data/ sendMessage", err);
    return "";
  }
}

// add a message to the database
// in:
// - name - name of the chat
// - receiver - name of the receiving user
// - message - the message object
// out:
// - message id
const sendMessageDatabase = async (room, receiver, message) =>{
  try{
    const ref = await db.collection(cts.users)
      .doc(receiver)
      .collection(cts.conversations)
      .doc(room)
      .collection(cts.messages)
      .add(message);

    console.log("Send message DB: Message saved");
    return ref.id;
  }
  catch(err) {
    console.log("Send message DB: ", err);
    return "";
  }
}


// does the same thing, but it already has an id
const sendMessageWithIdDatabase = async (room, receiver, message, messageId) =>{
  try{
    await db.collection(cts.users)
      .doc(receiver)
      .collection(cts.conversations)
      .doc(room)
      .collection(cts.messages)
      .doc(messageId)
      .set(message);

    console.log("Data/ Send message DB: Message saved");
  }
  catch(err) {
    console.log("Data/ Send message DB: ", err);
  }
}



// get all conversations of a user
// - user - email of the user
// out: 
// - conversation - list of conversation objects (id, name, participants)
const getConversations = async(user) =>{
  const conversations = [];
  const conversationDB = await db
  .collection(cts.users)
  .doc(user)
  .collection(cts.conversations)
  .orderBy("date")
  .get();
  
  conversationDB.forEach(snapshot =>{
    const chat = snapshot.data();
    chat["id"] = snapshot.id;
    conversations.push(chat);
  });

  return conversations;
}

// get messages from a conversation for a user
// - user - email of the user
// - conversation - name of the conversation
const getMessages = async (user, conversation) =>{
  const messages = [];
  console.log("Get messages", conversation)
  const conversationDB = await db
  .collection(cts.users)
  .doc(user)
  .collection(cts.conversations)
  .doc(conversation);

  const rawMessages = await conversationDB
    .collection(cts.messages)
    .orderBy("date")
    .get();

  rawMessages.forEach(snapshot =>{
    const message = snapshot.data();
    message["id"] = snapshot.id;
    messages.push(message);
  });

  const participants = await db
    .collection(cts.users)
    .doc(user)
    .collection(cts.conversations)
    .doc(conversation)
    .get();

  console.log("Get messages: messages collected");

  return {messages, participants: participants.data().participants, isEncrypted: participants.data().isEncrypted};
}

// delete a message for the given chat and user
// TODO: add a return thing so it can be checked
const deleteMessage = async (user, chat, messageId) =>{
  console.log("are we here?", user, chat, messageId)
  const res = await db
    .collection(cts.users)
    .doc(user)
    .collection(cts.conversations)
    .doc(chat)
    .collection(cts.messages)
    .doc(messageId)
    .delete();
  console.log("Message deleted");
}

// delete a conversation
// you need to delete all the message documents
// otherwise, they will stay there
// user - email of the user that deletes the chat
// chat - chat name
const deleteConversation = async (user, chat) =>{
  try{
    const conversation = await db
      .collection(cts.users)
      .doc(user)
      .collection(cts.conversations)
      .doc(chat);
      
    const messages = await conversation.collection(cts.messages).get();

    messages.forEach(snapshot => {
      snapshot.ref.delete();
    });

    await conversation.delete();

    console.log("Data/ Delete conversation", chat);
  }
  catch(err){
    console.log("Data/ Delete conversation", err)
  }
}

// add the user to the room
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
  sendMessage,
  getMessages, 
  deleteMessage,
  userLeftMessage,
  getConversations,
  deleteConversation,
};