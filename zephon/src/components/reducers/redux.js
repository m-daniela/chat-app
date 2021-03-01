import { configureStore, createSlice, createAsyncThunk, combineReducers } from "@reduxjs/toolkit";
import { getChats2, getMessages2 } from "../../data/ServerCalls";
import { e3login2, e3register2 } from "../services/encryption";

// initial states

const initialUserState = {
    uid: null,
    email: null,
    loggedIn: false,
    token: null,
};

const initialConversationsState = {
    current: "",
    conversations: [],
};

const initialStateChat = {
    messages: [],
};

// middleware


// get eThree token for the logged user
export const loginThunk = createAsyncThunk(
    "user/login", 
    async ({uid, email, password}, thunkAPI) => {
        console.log("Redux: login - email", email)
        // this is a non-serializable object
        // too bad
        const response = await e3login2(email, password);
        console.log("Redux: login", response);
        if (response === null){
            return initialUserState;
        }
        return {
            uid, 
            email, 
            loggedIn: true,
            token: response,
        };
    }
);

// get eThree token for new user
export const registerThunk = createAsyncThunk(
    "user/register", 
    async ({uid, email, password}, thunkAPI) => {
        const response = await e3register2(email, password);
        console.log("Redux: register", response);
        if (response === null){
            return initialUserState;
        }
        return {
            uid, 
            email, 
            loggedIn: true,
            token: response,
        };
    }
);


// get conversations for a given user
export const getConversationsThunk = createAsyncThunk(
    'conversations/getConversations',
    async ({email}, thunkAPI) => {
        const response = await getChats2(email);
        console.log("Redux: getConversations", response);
        return response;
    }
);

// get messages for a given chat and user
export const getMessagesThunk = createAsyncThunk(
    "chat/getMessages",
    async ({email, conversation}, thunkAPI) => {
        const response = await getMessages2(email, conversation);
        console.log("Redux: getMessages", response);
        return response;
    }
);


// reducers

const userSlice = createSlice({
    name: "user", 
    initialState: initialUserState,
    reducers: {
        logout: (state, action) => initialUserState
    },
    extraReducers: {
        [loginThunk.fulfilled]: (state, action) => action.payload,
        [registerThunk.fulfilled]: (state, action) => action.payload,
    }
});

// conversation reducer
// changing the current conversation 
// add new conversation
// get conversations of a user
const conversationsSlice = createSlice({
    name: "conversations",
    initialState: initialConversationsState,
    reducers: {
        changeConversation: (state, action) => state.current = action.payload.conversation,
        addConversation: (state, action) => state.conversations.push(action.payload.conversation)
    },
    extraReducers: {
        [getConversationsThunk.fulfilled]: (state, action) => {
            state.conversations = action.payload;
        }
    }
});

// chat reducer
// add the message to the chat
const chatSlice = createSlice({
    name: "chat", 
    initialState: initialStateChat,
    reducers: {
        addMessage: (state, action) => state.messages.push(action.payload.message)
    },
    extraReducers: {
        [getMessagesThunk.fulfilled]: (state, action) =>{
            state.messages = action.payload;
        }
    }
});

export const {
    logout
} = userSlice.actions;

export const {
    changeConversation,
    addConversation
} = conversationsSlice.actions;

export const {
    addMessage
} = chatSlice.actions;


const reducer = combineReducers({
    user: userSlice.reducer,
    conversations: conversationsSlice.reducer,
    chat: chatSlice.reducer,
})

export default configureStore({
    reducer
});