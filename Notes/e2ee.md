
/inc - incomplete
/rer - needs review/ needs to be rewritten
/ex - examples or diagrams missing
/math - mathematical aspects missing

# Contents
- [Contents](#contents)
- [Abstract](#abstract)
- [Introduction](#introduction)
- [Basic concepts](#basic-concepts)
	- [Symmetric-key encryption](#symmetric-key-encryption)
	- [Public-key encryption](#public-key-encryption)
	- [TODO: Auth + digital signatures](#todo-auth--digital-signatures)
	- [End-to-end encryption](#end-to-end-encryption)
	- [How it works, MAC](#how-it-works-mac)
	- [Limitations](#limitations)
		- [Metadata about the users](#metadata-about-the-users)
		- [Man-in-the-middle attacks](#man-in-the-middle-attacks)
		- [Endpoint security](#endpoint-security)
		- [Backdoors](#backdoors)
- [Technologies used](#technologies-used)
- [Existing e2ee systems](#existing-e2ee-systems)
	- [Signal protocol - how the other popular message apps work](#signal-protocol---how-the-other-popular-message-apps-work)
- [App + comparison with other apps](#app--comparison-with-other-apps)
	- [Resources](#resources)
	- [Tutorials, code resources](#tutorials-code-resources)
	- [Frameworks, packages (mostly Virgil security)](#frameworks-packages-mostly-virgil-security)
		- [Firebase tutorials and integration](#firebase-tutorials-and-integration)
- [Papers](#papers)
- [To check](#to-check)

# Abstract

# Introduction

- base crypto concepts used
- frameworks + tech used
- existing current e2ee systems
- description + comparison with existing apps

# Basic concepts

## Symmetric-key encryption
- HOAC 33
- https://en.wikipedia.org/wiki/Symmetric-key_algorithm

Symmetric-key encryption is an encryption scheme which uses the same key for both encryption and decryption. In this case, the key must be a shared secret between the communicating parties, which might result in security issues if the key is intercepted, if it is sent through an insecure channel. 

/ex

## Public-key encryption
- HOAC 43
- https://en.wikipedia.org/wiki/Public-key_cryptography

Public-key encryption, also known as asymmetric encryption, is an encryption scheme which uses a public and a private key. The public key can be publicly available, while the private key must be kept secret by the user. 

To encrypt a message, the sender uses the public key of the receiver, but the messages can be decrypted only by the recipient, using their private key. 

/ex

## TODO: Auth + digital signatures

## End-to-end encryption
- [Wiki](https://en.wikipedia.org/wiki/End-to-end_encryption)
- [Encryption in-transit and Encryption at-rest – Definitions and Best Practices](https://www.ryadel.com/en/data-encryption-in-transit-at-rest-definitions-best-practices-tutorial-guide/)
- [Data Protection: Data In transit vs. Data At Rest](https://digitalguardian.com/blog/data-protection-data-in-transit-vs-data-at-rest)
- [Brief presentation about ee2e](https://www.youtube.com/watch?v=jkV1KEJGKRA)
- [What end-to-end encryption is, and why you need it](https://www.kaspersky.com/blog/what-is-end-to-end-encryption/37011/)
- [What is End-to-End Encryption?](https://standardnotes.org/knowledge/2/what-is-end-to-end-encryption)
- [end-to-end encryption (E2EE) ](https://searchsecurity.techtarget.com/definition/end-to-end-encryption-E2EE)
- []()
- []()
- []()
- []()
- []()
- []()



End-to-end encryption is a communication system in which the messages can only be read by those participating in the conversation because they are encrypted by the sender. This ensures that the data cannot be read or modified by the service provider or any third party involved, hackers, Gov etc. since the keys to decrypt it are held by the recipients. 

/inc /rer /ex
This solution arised from the fact that many email or messaging applications use third parties to store the data and it is only encrypted "in transit", meaning that while the data is in motion, from one place to another (either through the internet or in a private network ex tls), it is encrypted. But when it reaches the server, the service provider is able to decrypt and read it, before sending it forward to the intended recipient. 

/inc
This might also lead to unauthorized access from the outside if the server is compromised. 

## How it works, MAC
- [Protonmail e2ee](https://protonmail.com/blog/what-is-end-to-end-encryption/)


/rer /ex /inc
End-to-end encryption involves public and private keys. The private key is held by the participant in the conversation and will be later used to decrypt the oncomming messages, thus it should not be accessible to anyone else. The public key of the recipient is publicly available and the sender uses it in order to encrypt a message for the recipient. 

## Limitations

### Metadata about the users

/inc
Various information, such as to whom or when the user sent messages, is still available to the third parties. 

### Man-in-the-middle attacks

Since the endpoints need the public key of the intended recipient, a man-in-the-middle attack is possible. The attacker can inject themselves in the middle and the sender will use the public key of the attacker. Now, they can decrypt it using their private key and read or temper with the message, and then send it to the recipient, by encrypting it with their public key. 

/inc /ex
This can be avoided if the identities of the participants are verified - digital signature, authentication or other certificates


### Endpoint security
/inc
The messages are only protected in transit and at rest from possible eavesdroppers on the communication channel but the endpoints are still vulnerable. This happens because after decryption, the messages in plaintext are available to anyone who has access to that device. 

### Backdoors
/ex
The application providers might include, intentionally or not, ways to access the data by bypassing the encryption, called backdoors.


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

- [Signal protocol - wiki](https://en.wikipedia.org/wiki/Signal_Protocol)
- [Signal docs](https://signal.org/docs/)
- [The X3DH Key Agreement Protocol](https://signal.org/docs/specifications/x3dh/)
- [A Formal Security Analysis of the Signal Messaging Protoco](https://eprint.iacr.org/2016/1013.pdf)
- [Hecar Lexicon: What Is the Signal Encryption Protocol?](https://www.wired.com/story/signal-encryption-protocol-hacker-lexicon/)
- []()
- []()



# App + comparison with other apps

## Resources

- [e2ee](https://squareup.com/us/en/townsquare/end-to-end-encryption)
- [GFG e2ee](https://www.geeksforgeeks.org/what-is-e2eeend-to-end-encryption/)
- 10 - 2/2.15
- 11
- Key protocols - Applied crypto chapter 12
- Key agreement (asym) - Diffie Helman 531 (515)
- [Double Ratchet algo](https://en.wikipedia.org/wiki/Double_Ratchet_Algorithm)
- [JSON web tokens (JWT)](https://jwt.io/introduction)
- [JWT](https://developer.virgilsecurity.com/docs/e3kit/fundamentals/jwt/)
- [Data Encryption in Transit](https://brightlineit.com/data-encryption-transit-business-needs-know/)
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()


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

# Papers
- [Breaking Message Integrity ofan End-to-End Encryption Scheme of LINE?](https://eprint.iacr.org/2018/668.pdf)
- [End-to-End Encryption Techniques](https://www.irjet.net/archives/V7/i6/IRJET-V7I6202.pdf)
- [Privacy Protected Email + various other papers on email privacy and encryption and others (01 - )](https://www.w3.org/2014/strint/papers/01.pdf)
- [AppliedCryptoHardening](https://www.w3.org/2014/strint/papers/05.pdf)
- [Strengtheningthe path and strengtheningthe end-points](https://www.w3.org/2014/strint/papers/09.pdf)
- []()
- []()
- []()
- []()
- []()
- []()

https://www.w3.org/2014/strint/papers/02.pdf


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

--- 

Analyzing the examples

Client
- identity - the name of the user (email in this case)