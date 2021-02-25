
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
	- [Authentication](#authentication)
	- [Digital signatures](#digital-signatures)
	- [End to end](#end-to-end)
		- [Limitations](#limitations)
			- [Backdoors](#backdoors)
- [Technologies used](#technologies-used)
- [Existing Technologies](#existing-technologies)
	- [iMessage's end-to-end encryption](#imessages-end-to-end-encryption)
	- [Signal Protocol](#signal-protocol)
	- [PGP for emails](#pgp-for-emails)
	- [End-to-end encryption](#end-to-end-encryption)
	- [How it works, MAC](#how-it-works-mac)
	- [Limitations](#limitations-1)
		- [Metadata about the users](#metadata-about-the-users)
		- [Man-in-the-middle attacks](#man-in-the-middle-attacks)
		- [Endpoint security](#endpoint-security)
		- [Backdoors](#backdoors-1)
- [Technologies used](#technologies-used-1)
- [Existing e2ee systems](#existing-e2ee-systems)
	- [PGP](#pgp)
	- [Signal protocol - how the other popular message apps work](#signal-protocol---how-the-other-popular-message-apps-work)
		- [Diffie Hellamn](#diffie-hellamn)
- [App + comparison with other apps](#app--comparison-with-other-apps)
	- [Resources](#resources)
	- [Tutorials, code resources](#tutorials-code-resources)
	- [Frameworks, packages (mostly Virgil security)](#frameworks-packages-mostly-virgil-security)
		- [Firebase tutorials and integration](#firebase-tutorials-and-integration)
- [Papers](#papers)
- [To check](#to-check)


- base crypto concepts used
- frameworks + tech used
- existing current e2ee systems
- description + comparison with existing apps


# Abstract

# Introduction

# Basic concepts

General structure

1. A short definition
2. How it works and how it is used
3. Different properties
4. Examples


## Symmetric-key encryption
- HOAC 33
- https://en.wikipedia.org/wiki/Symmetric-key_algorithm
- https://resources.infosecinstitute.com/topic/padding-oracle-attack-2/

/ex

## Public-key encryption
- HOAC 43
- https://en.wikipedia.org/wiki/Public-key_cryptography
- https://resources.infosecinstitute.com/topic/padding-oracle-attack-2/


## Authentication
- intro - hoac 42
- identification and entity auth - hoac 401
- https://en.wikipedia.org/wiki/Authentication
- https://economictimes.indiatimes.com/definition/Authentication
- https://www.bu.edu/tech/about/security-resources/bestpractice/auth/

- https://www.idc-online.com/technical_references/pdfs/data_communications/ZERO%20KNOWLEDGE.pdf - ZEROKNOWLEDGEPASSWORDAUTHENTICATION PROTOCOL

Authentication (from Greek: αὐθεντικός authentikos, "real, genuine", from αὐθέντης authentes, "author") is the act of proving an assertion, such as the identity of a computer system user. In contrast with identification, the act of indicating a person or thing's identity, authentication is the process of verifying that identity.[1] It might involve validating personal identity documents, verifying the authenticity of a website with a digital certificate,[2] determining the age of an artifact by carbon dating, or ensuring that a product or document is not counterfeit. 

---

This chapter considers techniques designed to allow one party (the verifier) to gain assurances
that the identity of another (the claimant) is as declared, thereby preventing impersonation.
The most common technique is by the verifier checking the correctness of a message
(possibly in response to an earlier message) which demonstrates that the claimant is
in possession of a secret associated by design with the genuine party. Names for such techniques
include identification, entity authentication, and (less frequently) identity verification.

A major difference between entity authentication and message authentication (as provided
by digital signatures or MACs) is that message authentication itself provides no timeliness
guarantees with respect to when a message was created, whereas entity authentication
involves corroboration of a claimant’s identity through actual communications with an
associated verifier during execution of the protocol itself (i.e., in real-time, while the verifying
entity awaits). Conversely, entity authentication typically involves no meaningful
message other than the claim of being a particular entity, whereas message authentication
does. Techniques which provide both entity authentication and key establishment are deferred
to Chapter 12; in some cases, key establishment is essentially message authentication
where the message is the key.

**Identification objectives**

The general setting for an identification protocol involves a prover or claimantAand a verifier
B. The verifier is presented with, or presumes beforehand, the purported identity of the
claimant. The goal is to corroborate that the identity of the claimant is indeed A, i.e., to
provide entity authentication.

Entity authentication is the process whereby one party is assured (through acquisition
of corroborative evidence) of the identity of a second party involved in a protocol,
and that the second has actually participated (i.e., is active at, or immediately prior to, the
time the evidence is acquired).

**Objectives of identification protocols**

From the point of view of the verifier, the outcome of an entity authentication protocol is
either acceptance of the claimant’s identity as authentic (completion with acceptance), or
termination without acceptance (rejection). They include the following:

- In the case of honest parties A and B, A is able to successfully authenticate itself to
B, i.e., B will complete the protocol having accepted A’s identity.
- (transferability) B cannot reuse an identification exchange with A so as to successfully
impersonate A to a third party C.
- (impersonation) The probability is negligible that any party C distinct from A, carrying
out the protocol and playing the role of A, can cause B to complete and accept
A’s identity. Here negligible typically means “is so small that it is not of practical
significance”; the precise definition depends on the application.
- The previous points remain true even if: a (polynomially) large number of previous
authentications between A and B have been observed; the adversary C has participated
in previous protocol executions with either or both A and B; and multiple instances
of the protocol, possibly initiated by C, may be run simultaneously

## Digital signatures
- intro - hoac 40
- digital signatures (ch 11) - hoac 441 
- https://en.wikipedia.org/wiki/Digital_signature
- https://blog.pandadoc.com/what-is-a-digital-signature-and-how-does-it-work/
- https://www.docusign.com/how-it-works/electronic-signature/digital-signature/digital-signature-faq
- https://cybersecurity.att.com/blogs/security-essentials/digital-signatures-101-a-powerful-and-underused-cybersecurity-ally /////

A cryptographic primitive which is fundamental in authentication, authorization, and nonrepudiation
is the digital signature. The purpose of a digital signature is to provide a means
for an entity to bind its identity to a piece of information. The process of signing entails
transforming the message and some secret information held by the entity into a tag called
a signature. A generic description follows.


---

A digital signature is a mathematical scheme for verifying the authenticity of digital messages or documents. A valid digital signature, where the prerequisites are satisfied, gives a recipient very strong reason to believe that the message was created by a known sender (authentication), and that the message was not altered in transit (integrity).[1]

Digital signatures are a standard element of most cryptographic protocol suites, and are commonly used for software distribution, financial transactions, contract management software, and in other cases where it is important to detect forgery or tampering.


Digital signatures employ asymmetric cryptography. In many instances they provide a layer of validation and security to messages sent through a non-secure channel: Properly implemented, a digital signature gives the receiver reason to believe the message was sent by the claimed sender. Digital signatures are equivalent to traditional handwritten signatures in many respects, but properly implemented digital signatures are more difficult to forge than the handwritten type. Digital signature schemes, in the sense used here, are cryptographically based, and must be implemented properly to be effective. 

Digital signatures can also provide non-repudiation, meaning that the signer cannot successfully claim they did not sign a message, while also claiming their private key remains secret. Further, some non-repudiation schemes offer a timestamp for the digital signature, so that even if the private key is exposed, the signature is valid.[14][15] Digitally signed messages may be anything representable as a bitstring: examples include electronic mail, contracts, or a message sent via some other cryptographic protocol 

A digital signature scheme typically consists of three algorithms;

    A key generation algorithm that selects a private key uniformly at random from a set of possible private keys. The algorithm outputs the private key and a corresponding public key.
    A signing algorithm that, given a message and a private key, produces a signature.
    A signature verifying algorithm that, given the message, public key and signature, either accepts or rejects the message's claim to authenticity.

----


Adigital signature of a message is a number dependent on some secret known
only to the signer, and, additionally, on the content of the message being signed. Signatures
must be verifiable; if a dispute arises as to whether a party signed a document (caused by either
a lying signer trying to repudiate a signature it did create, or a fraudulent claimant), an
unbiased third party should be able to resolve the matter equitably, without requiring access
to the signer’s secret information (private key).

There are several properties which the signing and verification transformations must satisfy.
(a) s is a valid signature of A on message m if and only if VA(m, s) = true.
(b) It is computationally infeasible for any entity other than A to find, for any m∈M,
an s ∈ S such that VA(m, s) = true.

## End to end

### Limitations

#### Backdoors
- https://www.howtogeek.com/710509/apples-imessage-is-secure...-unless-you-have-icloud-enabled/

# Technologies used

# Existing Technologies

## iMessage's end-to-end encryption
- https://blog.cryptographyengineering.com/category/imessage/
- https://support.apple.com/guide/security/encryption-and-data-protection-overview-sece3bee0835/1/web/1
- https://blog.quarkslab.com/imessage-privacy.html not sure


## Signal Protocol
- https://www.financialexpress.com/industry/technology/explained-what-is-message-encryption-and-how-it-works/1862064/


## PGP for emails



## End-to-end encryption
- [Wiki](https://en.wikipedia.org/wiki/End-to-end_encryption)
- [Encryption in-transit and Encryption at-rest – Definitions and Best Practices](https://www.ryadel.com/en/data-encryption-in-transit-at-rest-definitions-best-practices-tutorial-guide/)
- [Data Protection: Data In transit vs. Data At Rest](https://digitalguardian.com/blog/data-protection-data-in-transit-vs-data-at-rest)
- [Brief presentation about ee2e](https://www.youtube.com/watch?v=jkV1KEJGKRA)
- [What end-to-end encryption is, and why you need it](https://www.kaspersky.com/blog/what-is-end-to-end-encryption/37011/)
- [What is End-to-End Encryption?](https://standardnotes.org/knowledge/2/what-is-end-to-end-encryption)
- [end-to-end encryption (E2EE) ](https://searchsecurity.techtarget.com/definition/end-to-end-encryption-E2EE)
- [A Deep Dive on End-to-End Encryption: How Do Public Key Encryption Systems Work?](https://ssd.eff.org/en/module/deep-dive-end-end-encryption-how-do-public-key-encryption-systems-work)
- [WhatsApp, Signal and End-To-End Encryption](https://fcivaner.medium.com/messaging-open-source-and-end-to-end-encryption-41a0252541bb)
- [using quantum key distribution](https://www.ijtsrd.com/papers/ijtsrd18723.pdf)
- [efficient](https://www.delltechnologies.com/en-us/collaterals/unauth/white-papers/products/storage/h18483-dell-emc-powermax-end-to-end-efficient-encryption.pdf)
- []()
- []()
- https://www.theitstuff.com/what-is-end-to-end-encryption - algo

## How it works, MAC
- [Protonmail e2ee](https://protonmail.com/blog/what-is-end-to-end-encryption/)

 

## Limitations
- details are usually present in the general sources

### Metadata about the users


### Man-in-the-middle attacks



### Endpoint security


### Backdoors



# Technologies used
- React for frontend
- Nodejs for backend
- Socket.io for real-time communication
- Firebase for authentication and storage
- Virgil Security for e2ee and key management


# Existing e2ee systems

## Signal Protocol
- Signal, Whatsapp, Facebook Messenger


## MTProto 2.0
- Telegram
https://core.telegram.org/mtproto

## Signcryption
- iMessage


## PGP
- https://en.wikipedia.org/wiki/Pretty_Good_Privacy
- https://ssd.eff.org/en/module/deep-dive-end-end-encryption-how-do-public-key-encryption-systems-work (end)

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
- https://en.wikipedia.org/wiki/Montgomery_curve

### Diffie Hellamn
- https://www.cs.jhu.edu/~rubin/courses/sp03/papers/diffie.hellman.pdf

## Line

- https://www.jstage.jst.go.jp/article/transfun/E103.A/1/E103.A_2019EAP1041/_article/-char/ja/
- https://eprint.iacr.org/2018/668.pdf - same as above, but free
- https://arstechnica.com/information-technology/2020/10/study-shows-which-messengers-leak-your-data-drain-your-battery-and-more/


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
- [Asymmetric Message Franking:Content Moderation for Metadata-Private End-to-End Encryption](https://eprint.iacr.org/2019/565.pdf)
- [On Ends-to-Ends Encryption:Asynchronous Group Messaging with Strong Security Guarantees](https://eprint.iacr.org/2017/666.pdf)
- [Achieve Fully Decentralized End to End encryptionmeeting via Blockchain](https://eprint.iacr.org/2020/1572.pdf)
- []()
- []()
- []()
- https://web.cs.ucdavis.edu/~rogaway/papers/moral.pdf
- https://link.springer.com/chapter/10.1007/978-3-319-45982-0_22
- https://www.jstage.jst.go.jp/article/ipsjjip/27/0/27_763/_pdf/-char/en
- https://www.mdpi.com/1424-8220/21/4/1058/htm - GROUP MESSAGING WITH RATCHET
- https://www.scirp.org/html/1-9302677_99260.htm - SMS
- https://www.securityweek.com/academics-devise-attacks-targeting-email-end-end-encryption


https://www.w3.org/2014/strint/papers/02.pdf


# To check
- [](https://matrix.org/docs/guides/end-to-end-encryption-implementation-guide)


---

to timestamp: const timestamp = dateString => Date(dateString) / 1000
to date: const date = timestamp => new Date(timestamp * 1000)

--- 


1. Introduction

Things about the text

2. Basic concepts
- Symmetric key crypto
- Public key
- Authentication
- Digital signatures
- E2ee 

2.1 Mathematical concepts
- 


3. Technologies used
- React
- Socket.io
- Nodejs
- Firebase
- Virgil security 

4. Existing technologies
- iphone imessage
- Signal protocol
- PGP for email

5. The app + comparison with existing ones
- Whatsapp
- Facebook messenger
- Signal
- Telegram
