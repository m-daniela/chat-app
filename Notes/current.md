- [lab 1](#lab-1)
- [lab 2](#lab-2)
- [Paper review](#paper-review)
	- [CURRENT](#current)
	- [Reviewed](#reviewed)
	- [Partially](#partially)
- [Working features](#working-features)
- [To fix/ do](#to-fix-do)
- [Fixed](#fixed)
	- [In firebase](#in-firebase)


# lab 1
- stabilirea temei
- document
	- titlu
	- 2-3 paragrafe cu ideea
	- 3 referinte
	- semnaturi


# lab 2
- cuprins
- 1 chapter - situatia curenta din domeniu



References
- https://eprint.iacr.org/2016/1013.pdf - A Formal Security Analysis of the Signal Messaging Protocol
- https://www.ndss-symposium.org/wp-content/uploads/ndss2021_1C-4_24180_paper.pdf - Improving Signal’s Sealed Sender 
- https://eprint.iacr.org/2020/224.pdf - signcryption in iMessage
- https://signal.org/docs/ - Signal official docs


---

# Paper review

## CURRENT

- [20. Vatandas2020_Chapter_OnTheCryptographicDeniabilityO.pdf](./pdf/papers/signal/20.%20Vatandas2020_Chapter_OnTheCryptographicDeniabilityO.pdf) - deniability and some analysis on this


## Reviewed
- [20. Signal Protocol - Makalah-Kripto-2020-06.pdf](./Pdf/papers/signal/20.%20Signal%20Protocol%20-%20Makalah-Kripto-2020-06.pdf) - 2pg, good for a quick refresher of what tech is signal using
- [21. r - The Secure Messaging App Conundrum Signal vs. Telegram - 80890725610443713565418232349082attachment.pdf](./pdf/papers/signal/21.%20r%20-%20The%20Secure%20Messaging%20App%20Conundrum%20Signal%20vs.%20Telegram%20-%2080890725610443713565418232349082attachment.pdf) - 4pg, a little comparisong between the 2 apps and sometimes wapp (**states that telegram has no enc for groups**)

## Partially
- [Signal analysis](PDF/Papers/Signal/16.%2019.%20r%20-%20A%20Formal%20Security%20Analysis%20of%20the%20Signal%20Messaging%20Protocol%20-%202016-1013.pdf) - 46pg, strong analysis with schemes and theorems
- [20. Cohn-Gordon2020_Article_AFormalSecurityAnalysisOfTheSi](./PDF/Papers/Signal/20.%20Cohn-Gordon2020_Article_AFormalSecurityAnalysisOfTheSi.pdf) - same as the one called "signal analysis", it might have some more details since it was reviewed in 2020


---

- attachement enc
- group enc
- demo + no encryption

# Working features
- login
- signup
- logout
- see conversations
- add conversation
- see messages
- send msg (real time)
- encryption + decryption


# To fix/ do
- groups
	- add group and add chat should look normal together
- error handling
- duplicating messages again???
- state updates twitching/ loading 
- same id for messages
- check private keys
- add session
- cache accessed chats
- optimize data clearing, data loading
- maybe add deletion on messages/ chats


# Fixed
- signup fix (login model)
- reset everything on logout - conversation remains selected
- chat name selection - working only on second click - need to change the state
- fix the real time thing
- refresh mesages
- order by timestamp

example5@mail.com


## In firebase
- users (name of the user)
	- conversations (name of the chat)
		- messages
		+ participants (better as an array, probably, with everyone)

sendMessage(sender, name, receivers, text, date)


# Contents

- [1. Introduction](#1-introduction)
	- [The application](#the-application)
- [2. Basic concepts](#2-basic-concepts)
	- [MACs](#macs)
	- [PRFs](#prfs)
	- [HMAC](#hmac)
	- [Auth encryption](#auth-encryption)
	- [Auth enc with assoc data](#auth-enc-with-assoc-data)
	- [Symmetric key enccryption](#symmetric-key-enccryption)
	- [Public key encryption](#public-key-encryption)
	- [Authentication](#authentication)
	- [Digital signatures](#digital-signatures)
	- [End to end encryption](#end-to-end-encryption)
	- [How it works, MAC](#how-it-works-mac)
	- [Limitations](#limitations)
		- [Metadata about the users](#metadata-about-the-users)
		- [Man-in-the-middle attacks](#man-in-the-middle-attacks)
		- [Endpoint security](#endpoint-security)
		- [Backdoors](#backdoors)
	- [Classical Diffie Hellamn](#classical-diffie-hellamn)
	- [Elliptic curves cryptography](#elliptic-curves-cryptography)
- [3. Existing Technologies](#3-existing-technologies)
	- [Signal protocol](#signal-protocol)
		- [Diffie Hellamn](#diffie-hellamn)
		- [Extended Triple Diffie Hellamn](#extended-triple-diffie-hellamn)
		- [Double Ratchet](#double-ratchet)
		- [EdDSA signature](#eddsa-signature)
	- [MTProto](#mtproto)
	- [Signcryption and iMessage](#signcryption-and-imessage)
		- [Signcryption](#signcryption)
	- [Letter Sealing](#letter-sealing)
	- [Threema](#threema)
	- [Group messaging](#group-messaging)
	- [About MLS?](#about-mls)
- [4. Technologies used](#4-technologies-used)
- [5. The application](#5-the-application)
- [6. Conclusions](#6-conclusions)
- [7. References](#7-references)

---

Main thing
- what schemes are used by each protocol
- signal
	- x3dh handshake
	- curve 25519
	- aes 256
	- HMAC sha 256
- mtproto
	- sha 256
	- 
- signcryption
	- ecsda
	- rsa 1280 key, ec 256 bit key
	- hmac sha 256
	- aes
- letter sealing
	- ecdh
	- ecsda
	- aes gcm
	- ec secp256k1
- threema
	- ecdh curve 25519
	- xsalsa 20
	- sha 256
	- poly 1305
- common parts
- what is added by each protocol 

1. Introduction

2. Basic concepts
- some diagrams can be added, from the book or wiki
- Symmetric
	- more details?
- AES / ++ from the book
	- details
	- implementation
	- vulnerabilities
- PK
	- maybe something about TLS and RSA?
	- Attacks/
		- Impersonation/
		- Chosen plaintext/
			- vulnerability mitigation /
		- Chosen ciphertext/
			- better definition
			- mitigation
- Authentication
- Entity Auth
- AE + AEAD
- MAC
	- more details?
	- Attacks
	- HMAC
- PRF
- Digital signatures
- End to end encryption
	- details
	- the algorithm/how it works
	- Limitations
		- metadata
		- MITM
		- backdoors
- Diffie Hellman
- Elliptic curve crypto

3. Existing tech
- Signal
	- ecdh
	- double ratchet
	- eddsa
- MTProto
- Signcryption
- Letter sealing
- Threema
- Group messaging
	- MLS 
		- MORE DETAILS OMG I SHOULD READ THE DRAFTS AND CHECK THE IMPLEMENTATIONS 

4. Tech used
- React + redux toolkit
- Nodejs
- Socket.io
- Firebase
- Virgil Security
- Docker

5. Application
- specs and features idk

- login/ signup
- logout
- display chats
- select chat and send messages
- add chat
- delete chats? 
- delete messages?

6. Conclusions

7. References <3

Different from last time:
- "basic concepts" section, updates on:
	- symmetric key
	- public key
	- auth
	- AES
	- Diffie Hellman
	- Elliptic curves
- "existing tech" section
	- group messaging 
- "application" section
	- features and layout


---


- send the message id back somehow
- send something back when you delete so that thing can be handled
- learn to speak lol
- change the default confirm window, maybe use a component

- do the same things for the conversations /
- change to another chat or initial page after you delete a chat/
- implement the broadcast method that tells everyone you left/ - implemented but only writes to the console
- delete the messages for the user that removes


- the message loading was changed to the previous version of calling everything again from the db, on new message
- I will keep this for now because fuck everything
- maybe I'll add a limit and infinite scroll
- and I will definetly need to fix the twitching issue

BROADCAST WILL ONLY WORK FOR THE GROUPS

FIREBASE DOESN'T DELETE THE DOCUMENTS IN THE COLLECTION


- new
- delete conversations 
- broadcast "user left" message - console
- add group functionality is back


- https://developer.virgilsecurity.com/docs/e3kit/end-to-end-encryption/large-files-and-streams/
- for the attachment fun
- encryptSharedFile - new key pair to enc the file 
- the encrypted file needs to be uploaded to remote storage and the link and the enc stream key need to be sent to the recipient

- decryptSharedFile - for decryption

https://material-ui.com/components/icons/#color
https://material-ui.com/components/material-icons/

icons
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

---

12.04

2. Basic concepts

- sym/
	- general details + def

- pkc/
	- attacks


- authentication
	- macs
	- hmac
	- prfs
	- auth enc
	- aead

- digital sign/
	- attacks
	- general alg


- e2ee/

- aes/

- dh/

- eec/

3. existing tech

- signal

- mtproto

- signcryption

- letter sealing

- threema

- group encryption
