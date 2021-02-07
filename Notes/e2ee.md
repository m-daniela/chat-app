
# Contents
- [Contents](#contents)
- [Abstract](#abstract)
- [Basic concepts](#basic-concepts)
	- [Symmetric-key encryption](#symmetric-key-encryption)
	- [Public-key encryption](#public-key-encryption)
	- [TODO: Auth + digital signatures](#todo-auth--digital-signatures)
	- [End-to-end encryption](#end-to-end-encryption)
	- [How it works](#how-it-works)
	- [Challenges](#challenges)
- [Technologies used](#technologies-used)
- [Existing e2ee systems](#existing-e2ee-systems)
	- [Signal protocol - how the other popular message apps work](#signal-protocol---how-the-other-popular-message-apps-work)
- [App + comparison with other apps](#app--comparison-with-other-apps)
	- [Resources](#resources)
	- [Tutorials, code resources](#tutorials-code-resources)
	- [Frameworks, packages (mostly Virgil security)](#frameworks-packages-mostly-virgil-security)
		- [Firebase tutorials and integration](#firebase-tutorials-and-integration)
- [To check](#to-check)

# Abstract

- base crypto concepts used
- frameworks + tech used
- existing current e2ee systems
- description + comparison with existing apps

# Basic concepts

## Symmetric-key encryption
- HOAC 33
- https://en.wikipedia.org/wiki/Symmetric-key_algorithm

Symmetric-key encryption is an encryption scheme which uses the same key for both encryption and decryption. In this case, the key must be a shared secret between the communicating parties, which might result in security issues if the key is intercepted, if it is sent through an insecure channel. 

## Public-key encryption
- HOAC 43
- https://en.wikipedia.org/wiki/Public-key_cryptography

Public-key encryption, also known as asymmetric encryption, is an encryption scheme which uses a public and a private key. The public key can be publicly available, while the private key must be kept secret by the user. 

To encrypt a message, the sender uses the public key of the receiver, but the messages can be decrypted only by the recipient, using their private key. 

## TODO: Auth + digital signatures

## End-to-end encryption
- [Wiki](https://en.wikipedia.org/wiki/End-to-end_encryption)


End-to-end encryption is a communication system where the messages can be read only by those participating in the conversation, because it is encrypted by the sender. This ensures that the data cannot be read or modified by the service provider (or any third party involved) etc. because the keys to decrypt it are held by the recipients. 

Google bad fragment, data encrypted in transit

## How it works

End-to-end encryption involves, at first, a key exchange between the two parties.


## Challenges

End-to-end encryption 

**Man in the middle attacks**

**Endpoint security**

**Backdoors**

# Technologies used
- React for frontend
- Nodejs for backend
- Socket.io for real-time communication
- Firebase for authentication and storage
- Virgil Security for e2ee and key management


# Existing e2ee systems

## Signal protocol - how the other popular message apps work
- Triple Diffie Hellman key exchange
- Prekey bundle
- Double ratchet algo

# App + comparison with other apps

## Resources

- [Protonmail e2ee](https://protonmail.com/blog/what-is-end-to-end-encryption/)
- [e2ee](https://squareup.com/us/en/townsquare/end-to-end-encryption)
- [GFG e2ee](https://www.geeksforgeeks.org/what-is-e2eeend-to-end-encryption/)
- 10 - 2/2.15
- 11
- Key protocols - Applied crypto chapter 12
- Key agreement (asym) - Diffie Helman 531 (515)
- [Double Ratchet algo](https://en.wikipedia.org/wiki/Double_Ratchet_Algorithm)
- [JSON web tokens (JWT)](https://jwt.io/introduction)
- [JWT](https://developer.virgilsecurity.com/docs/e3kit/fundamentals/jwt/)

**Videos**
- [Brief presentation about ee2e](https://www.youtube.com/watch?v=jkV1KEJGKRA)
- [Diffie-Helman key exchange (colors)](https://www.youtube.com/watch?v=NmM9HA2MQGI)
- [Diffie-Helman key exchange (maths)](https://www.youtube.com/watch?v=Yjrfm_oRO0w)
- [How Signal Instant Messaging Protocol Works - more explanations](https://www.youtube.com/watch?v=DXv1boalsDI)
- [How End-to-End encryption Works? - wapp](https://www.youtube.com/watch?v=hwQbPgvEQyw)
- [Double Ratchet Messaging Encryption](https://www.youtube.com/watch?v=9sO2qdTci-s)
- [Key Exchange problems](https://www.youtube.com/watch?v=vsXMMT2CqqE)
- [Elliptic curve](https://www.youtube.com/watch?v=NF1pwjL9-DE)

Extra
- [Group chats encryption](https://www.youtube.com/watch?v=Q0_lcKrUdWg)
- [Context tutorial, probably better](https://www.taniarascia.com/using-context-api-in-react/)

## Tutorials, code resources
- [How to implement end-to-end encryption for simplified security](https://virgilsecurity.com/blog/simplified-firebase-sdk)
- [End-to-End Encryption implementation guide](https://matrix.org/docs/guides/end-to-end-encryption-implementation-guide)
- [Encrypted chatbot](https://medium.com/better-programming/building-an-end-to-end-encrypted-chatbot-with-stream-react-chat-virgil-security-and-google-c000bb585453)
- [How to Build a Real-Time Chat web app using Node + Reactjs + Socket.io having E2E Encryption](https://medium.com/analytics-vidhya/how-to-build-a-real-time-chat-web-app-using-node-reactjs-socket-io-having-e2e-encryption-18fbbde8a190)
- [Implement Virgil Security’s End-to-End Encryption in your Firebase App — Why and How?](https://medium.com/@geekyants/implement-virgil-securitys-end-to-end-encryption-in-your-firebase-app-why-and-how-dc5286920a32)
- [Build an Encrypted Messaging App for Android (Stream chat)](https://getstream.io/blog/encrypted-messaging-app-android/)
- [Developing a Secure Messaging App for Telehealth with React Using Virgil Security, Higher-Order Components and React Context API](https://webrtc.ventures/2019/06/developing-a-secure-messaging-app-for-telehealth-with-react-using-virgil-security-higher-order-components-and-react-context-api/)
- [How to build a HIPAA-compliant Firebase Chat using security SDK](https://virgilsecurity.com/blog/hipaa-firebase-2020)
- [Building an Encrypted, HIPAA Compliant Chatbot](https://getstream.io/blog/building-an-end-to-end-encrypted-chatbot-with-stream-react-chat-virgil-security-and-google-dialogflow/)

https://stackoverflow.com/questions/48249900/end-to-end-encryption-for-a-chat-application

## Frameworks, packages (mostly Virgil security)
- [Virgil security thing](https://developer.virgilsecurity.com/docs/e3kit/get-started/)
- [VS Supported algorithms + articles about each](https://developer.virgilsecurity.com/docs/e3kit/fundamentals/supported-algorithms/)
- [App structure](https://developer.virgilsecurity.com/docs/e3kit/fundamentals/application-architecture/)
- [WWDC/AltConf: Implement Apple’s End-to-End security in iOS, Android, web, Firebase, Twilio](https://www.youtube.com/watch?v=IdP300_VuZM)
- [End-to-End Encryption for any app](https://www.youtube.com/watch?v=79fQ8PwZqmQ)
- [](https://virgilsecurity.com/blog/end-to-end-encrypted-chat-with-e3kit-and-stream)
- [Dashboard details and how to use](https://www.back4app.com/docs/security/gdpr-compliant-chat-app)
- [](https://virgilsecurity.com/blog/build-end-to-end-encrypted-chat-using-pubnub-and-virgil-security)

### Firebase tutorials and integration 
- [Intro](https://firebase.google.com/docs/firestore)
- [Getting started](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase auth](https://www.youtube.com/watch?v=PKwu15ldZ7k)
- [Firestore](https://www.youtube.com/playlist?list=PLl-K7zZEsYLmnJ_FpMOZgyg6XcIGBu2OX)
- [Firebase database and other setups (vanilla js)](https://www.youtube.com/watch?v=9kRgVxULbag)

- [Encryption with Virgil Security in React on Firebase | Part 1 | Installation and wasm error](https://www.youtube.com/watch?v=zwVuKz_zpMc)
- [Encryption with Virgil Security in React on Firebase | Part 2 | Cloud Function for JWT Token](https://www.youtube.com/watch?v=h4SJcntOU0Y)
- [Encryption with Virgil Security in React on Firebase | Part 3 | Encryption](https://www.youtube.com/watch?v=jgOpfkVRE8E)

**Understanding this**
- [Data model + example for chats db structure](https://firebase.google.com/docs/firestore/data-model#node.js)
- [Data types + type ordering](https://firebase.google.com/docs/firestore/manage-data/data-types)
- [Structuring data](https://firebase.google.com/docs/firestore/manage-data/structure-data)

- [End-to-End Encryption for Firebase](https://developer.virgilsecurity.com/docs/e3kit/integrations/firebase/)

- []()


# To check
- [](https://matrix.org/docs/guides/end-to-end-encryption-implementation-guide)


- users (collection)
- documents with ids the emails
	- each document has an array of references

- conversations (collection)
- documents with autogenerated ids
	- user1 - email
	- user2 - email
	- messages (collection)
		- id
		- sender (email)
		- text
		- date

collection/conversations/document/70WekVIwy5ERt7gL5hyx


convos represented for each user
[
	{
		uid: "...",
		user1: ...,
		user2: ...,
		messages: [...]
	}

]

or

{
	uid: {
		user1: ...
		user2: ...
		messages: ...
	}
}

---

to timestamp: const timestamp = dateString => Date(dateString) / 1000
to date: const date = timestamp => new Date(timestamp * 1000)