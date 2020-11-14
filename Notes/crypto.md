
# Plan

- since this will be a chat app: networking, networking, networking
- a way to switch between states (encryption, xss, whatever else I can introduce):
	- first idea: just add some options, like facebook did with secret conversations
- read about firebase or anything free with not so many limitations
	- if I stay with firebase: [](https://developer.virgilsecurity.com/docs/e3kit/)
- postman

## Getting started - the app

- react + node, maybe, more likely
- https://www.scaledrone.com/blog/tutorial-build-a-reactjs-chat-app/

### Tutorials
- [React Chat with Hooks Tutorial](https://reactjs.chat/)
- [Building a Live Chat App with React Tutorial - Express and Socket.io](https://www.youtube.com/watch?v=hiiaHyhhwBU)
- [Building a Real-Time Chat App with React and Firebase](https://css-tricks.com/building-a-real-time-chat-app-with-react-and-firebase/)
- [How To Build A Chat App With React, Socket.io, And Express](https://medium.com/dataseries/how-to-build-a-chat-app-with-react-socket-io-and-express-190d927b7002)
- [React JS Tutorial: Building Firebase Chat App (React Hooks)](https://www.djamware.com/post/5f2a1d9d9c794f177fd7b527/react-js-tutorial-building-firebase-chat-app-react-hooks)
- [Build a Chat App - React Tutorial Course - with chatkit, might be useful](https://www.youtube.com/watch?v=jFNHerJqvFw)
- [React Chat Tutorial - stream chat](https://getstream.io/chat/react-chat/tutorial/)
- [Real-Time Chat Application with React, Nodejs, & Socket.io](https://dev.to/mrshawnhum/real-time-chat-application-with-react-nodejs-socket-io-25c5)

#### Adding some encryption

- [Creating Real-Time Chat App using React And Socket.io with E2E Encryption](https://hackernoon.com/creating-real-time-chat-app-using-react-and-socketio-with-e2e-encryption-b0113u5s)
- [Building HIPAA Compliant End-to-End Encrypted Chat with Stream React Chat and Virgil Security ](https://dev.to/nickparsons/building-hipaa-compliant-end-to-end-encrypted-chat-with-stream-react-chat-and-virgil-security-2dfj)
- [Building an End-to-End Encrypted Chatbot With Stream React Chat, Virgil Security, and Google Dialogflow - might help](https://medium.com/better-programming/building-an-end-to-end-encrypted-chatbot-with-stream-react-chat-virgil-security-and-google-c000bb585453)
- [Like above](https://dzone.com/articles/building-an-end-to-end-encrypted-chatbot-with-stre)
- [How to make a GDPR compliant chat app](https://www.back4app.com/docs/security/gdpr-compliant-chat-app)
- [An Encrypted Chat App with React Hooks, Firebase and Seald](https://www.seald.io/blog/an-encrypted-chat-app-with-react-hooks-firebase-and-seald)
- [Adding end-to-end encrypted messaging to your app just got a lot easier](https://techcrunch.com/2016/05/03/adding-end-to-end-encrypted-messaging-to-your-app-just-got-a-lot-easier/?guccounter=1&guce_referrer=aHR0cHM6Ly9kdWNrZHVja2dvLmNvbS8&guce_referrer_sig=AQAAAGJ8VcmtiAe7RNfJ8fUtZHKSGwTf6pFjiGwP7N12b8_i4jDCyZODayyH1AQCX14vjHXiCouIzLvfu6jDZwCza7fje-M84EmdPfens8j73EiTjkFBVTUXjH32pJoXZxuO1QG2BniuVGRput3AI59jJTSMwlE8LQ1IHKQte9_U7mpU)


#### About XSS
- [CROSS-SITE SCRIPTING (XSS) TUTORIAL: LEARN ABOUT XSS VULNERABILITIES, INJECTIONS AND HOW TO PREVENT ATTACKS](https://www.veracode.com/security/xss)
- [Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

### Other projects and stuff to check out
- [](https://github.com/Kushagraw12/React-Chat-App)
- [Best React Chat Libraries](https://openbase.io/packages/top-react-chat-libraries)
- [cryptojs](https://github.com/brix/crypto-js)
- [](https://stackoverflow.com/questions/59942609/how-to-encrypt-and-decrypt-text-message-in-react-native-and-backend-node-js)
- [How End-to-End Encryption Works in Video and Text Messaging Apps - kinda old tho](https://xbsoftware.com/blog/video-messaging-apps-with-end-to-end-encryption-and-all-about-encrypted-text-messages/)
- [Why you can't secure a React Native (or any frontend) application](https://blog.kuzzle.io/why-you-cant-secure-a-frontend-application)



### General
- [Crypto concepts](https://developer.virgilsecurity.com/docs/e3kit/fundamentals/cryptography/)
- [putaindecode.io oui](https://putaindecode.io/articles)


## Getting started

Some vulnerability things
- https://snyk.io/vuln
- https://snyk.io/vuln/npm:react
- https://www.peerbits.com/blog/react-security-vulnerabilities-solutions.html
- https://www.simform.com/react-security-vulnerabilities-solutions/
- https://xbsoftware.com/blog/video-messaging-apps-with-end-to-end-encryption-and-all-about-encrypted-text-messages/ AND what encryption algorithms are used

How to build apps
- https://medium.com/swlh/encrypted-messaging-app-android-c57f14a180cb
- https://www.youtube.com/watch?v=vVpQ5jq3pdY adding the encryption
- http://4youngpadawans.com/end-to-end-encryption-between-react-and-spring/ java for some reason, might be useful
- https://www.codementor.io/@richardjohn/adding-end-to-end-encryption-to-your-messaging-apps-why-now-12xgaotg5v possibly better placed in Flowcharts
- https://www.freecodecamp.org/news/how-to-build-a-react-js-chat-app-in-10-minutes-c9233794642b/ 
- https://medium.com/@geekyants/implement-virgil-securitys-end-to-end-encryption-in-your-firebase-app-why-and-how-dc5286920a32

Flowcharts on e2ee
- https://heimdalsecurity.com/blog/the-best-encrypted-messaging-apps/

XSS
- https://auth0.com/blog/cross-site-scripting-xss/
- https://resources.infosecinstitute.com/how-to-prevent-cross-site-scripting-attacks/
- https://www.netsparker.com/blog/web-security/private-data-stolen-exploiting-css-injection/ css lol
- https://www.softwaretestinghelp.com/cross-site-scripting-xss-attack-test/

The simulation app - situations
- no e2ee
- http vs https if possible
- tampering with messages
- xss
- inspiration https://owasp.org/www-project-juice-shop/

Videos
- [Crypto & Block Cipher Modes (OpenSSL, AES 128, ECB, CBC)](https://www.youtube.com/watch?v=t0pREiDO7_g)
- [Cryptography Concepts - CompTIA Security+ SY0-501 - 6.1](https://www.youtube.com/watch?v=nb51aDeBcF0 )
- [What is Cryptography? | Introduction to Cryptography | Cryptography for Beginners | Edureka](https://www.youtube.com/watch?v=5jpgMXt1Z9Y)
- [Metadata](https://www.youtube.com/watch?v=IWMZ17Iyu3o)

- [Wireshark installation](https://www.youtube.com/watch?v=4_7A8Ikp5Cc)
- [ProxyChains](https://www.youtube.com/watch?v=qsA8zREbt6g)
- [Nmap](https://nmap.org/)


Help me
- https://www.researchgate.net/post/Cyber_security_and_crime_Thesis_Topics
- https://www.ru.nl/dis/thesis-projects/
- https://essay.utwente.nl/71375/1/Master%20Thesis%20final%20-%20Dennis%20Schroer.pdf
- https://en.wikipedia.org/wiki/Attribute-based_encryption
- man in the middle attack https://www.thesslstore.com/blog/man-in-the-middle-attack-2/
- https://cs.uni-paderborn.de/en/cuk/teaching/student-projects/open-theses/
- https://is.muni.cz/thesis/prace_na_stejne_tema?lang=en;id=307072 
- https://www.researchgate.net/post/Does_anyone_has_any_Cyber_Security_related_project_idea_topic
- 

Vulnerabilities //
- https://latesthackingnews.com/2018/12/12/encrypted-messaging-apps-vulnerable-to-side-channel-attacks-including-whatsapp-telegram-and-signal/
- https://www.helpnetsecurity.com/2020/09/08/android-apps-cryptographic-vulnerabilities/
- https://www.cnbc.com/2019/05/22/whatsapp-messaging-app-cybersecurity-vulnerability.html
- https://threatpost.com/whatsapp-bug-malicious-code-injection-rce/152578/
- https://latesthackingnews.com/2020/09/08/facebook-ups-security-new-vulnerability-disclosure-policy-whatsapp-advisory-page/
- https://thehackernews.com/2020/06/facebook-malware-persistence.html
- https://latesthackingnews.com/2020/06/14/facebook-messenger-app-vulnerability-allowed-persistent-malware-attacks/
- https://www.imperva.com/learn/application-security/apt-advanced-persistent-threat/
- https://www.imperva.com/blog/mapping-communication-between-facebook-accounts-using-a-browser-based-side-channel-attack/
- https://en.wikipedia.org/wiki/Side-channel_attack
- https://www.theverge.com/2019/3/7/18254788/facebook-messenger-vulnerability-attack-imperva-iframe-malicious ./
- https://about.fb.com/news/2018/10/update-on-security-issue/ from the guys themselves
- https://www.deccanherald.com/specials/whatsapp-fixes-six-security-vulnerabilities-in-messenger-app-882314.html
- https://ictframe.com/are-there-any-vulnerabilities-in-facebook/
- https://www.wired.com/story/facebook-merges-instagram-messenger-direct-messages/
- https://nakedsecurity.sophos.com/2020/02/06/update-now-whatsapp-flaw-gave-attackers-access-to-local-files/
- https://www.wired.com/story/facebook-messenger-end-to-end-encryption-default/

E2EE
- https://squareup.com/us/en/townsquare/end-to-end-encryption
What are other methods to keep your data safe? Beyond E2EE, there are other types of data encryption:
- Secure Sockets Layer (SSL) is the more modern version of Transport Layer Security (TLS), and it’s the standard for protecting data on the web. You’ll see URLs that start with https:// instead of http://. The extra “s” stands for “secure.” This layer of security helps protect your business at the very high level on your website, and also signals to customers that you are protecting them.
- Tokenization means you’re substituting a sensitive data element with a non-sensitive equivalent, referred to as a token. The token has no meaning or value; it just helps map you back to the sensitive data. This helps keep your business safe because it is harder for hackers to define the token since it has no meaning or value.
- An elliptic curve integrated encryption scheme (ECIES) is a system that independently derives a bulk encryption key and a MAC (message authentication code) key from a “common secret.” The data is encrypted under a symmetric cipher. Then the cipher is encrypted under a MAC.

- https://jitsi.org/blog/e2ee/
- https://infosec-handbook.eu/blog/limits-e2ee/ //
- https://www.lifesize.com/en/video-conferencing-blog/e2ee //
- https://www.theverge.com/2020/9/24/21453581/ring-end-to-end-encryption-video-neighbors-app-amazon //
- https://tozny.com/blog/end-to-end-encryption-vs-https/ //
- https://www.indiehackers.com/post/my-experiences-implementing-end-to-end-encryption-in-my-ios-and-web-app-390bbd5e1c ------- ///
- https://www.androidheadlines.com/2020/09/end-to-end-encryption-security-ring-cameras.html ///
- https://www.cvedetails.com/browse-by-date.php - facebook messenger vulnerabilities


Tokenization - turn sensitive data into a randombly generated number (token) that will replace the said data 
- https://squareup.com/us/en/townsquare/what-does-tokenization-actually-mean
- https://www.tokenex.com/resource-center/what-is-tokenization


Javascript/ React native messaging app
- https://blog.sendbird.com/tutorial-build-a-messaging-app-using-react-native/
- https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_7.5.0/com.ibm.mm.tc.doc/tc60302_.htm
- https://www.ibm.com/support/knowledgecenter/SSFKSJ_7.5.0/com.ibm.mm.tc.doc/tc60301_.htm

Data harvesting and data mining
- https://theconversation.com/facebook-data-harvesting-what-you-need-to-know-93959
- https://www.researchgate.net/publication/238433441_Data_mining_and_cryptology - text
- https://www.import.io/post/the-difference-between-data-mining-data-harvesting/
- https://www.ijecce.org/Download/conference/NCRTCST-3/11.pdf
- https://link.springer.com/chapter/10.1007/978-3-540-77028-2_29
- 


Social engineering
- https://www.esecurityplanet.com/views/article.php/3908881/9-Best-Defenses-Against-Social-Engineering-Attacks.htm
- https://www.webroot.com/us/en/resources/tips-articles/what-is-social-engineering
- https://en.wikipedia.org/wiki/Social_engineering_%28security%29

Web application security
- https://www.netsparker.com/external-vulnerability-scanner/black-box-scanner/
- https://www.netsparker.com/blog/web-security/getting-started-web-application-security/#web_vulnerability_scanners
- https://www.imperva.com/learn/application-security/application-security/ //

Zero day attack - attack that targets a new and unknown vulnerability in the software
- https://www.safetydetectives.com/blog/what-is-a-zero-day-exploit-and-how-to-defend-yourself/
- https://blog.malwarebytes.com/exploits-and-vulnerabilities/2020/06/a-zero-day-guide-for-2020/

General
- https://www.cryptopp.com/wiki/Main_Page
- https://faculty.nps.edu/dedennin/publications/Denning-CryptographyDataSecurity.pdf
- https://www.mastersportal.com/articles/2722/why-you-should-study-a-cyber-security-degree-in-2020.html 
- https://en.wikipedia.org/wiki/Message_authentication_code - In cryptography, a message authentication code (MAC), sometimes known as a tag, is a short piece of information used to authenticate a message—in other words, to confirm that the message came from the stated sender (its authenticity) and has not been changed. The MAC value protects both a message's data integrity as well as its authenticity, by allowing verifiers (who also possess the secret key) to detect any changes to the message content. 
- https://www.cryptopp.com/wiki/Elliptic_curve_integrated_encryption_scheme
- https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange - COLOR ANALOGY
- https://www.rapidsslonline.com/blog/fundamental-differences-between-symmetric-and-asymmetric-encryption/ - common things
- https://www.ethicalhackingtool.com/cryptography-in-cyber-security/ //
- https://www.securitymagazine.com/articles/93429-the-five-biggest-threat-trends-in-the-first-half-of-2020 //
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security //
- https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy //
- https://en.wikipedia.org/wiki/Arbitrary_code_execution // yes, it is below too but this way I might not forget again :D
- https://owasp.org/www-project-top-ten/ //
- https://www.sec.gov/vulnerability-disclosure-policy //

Networking - again
- https://www.thesslstore.com/blog/subnetting-and-masks/
- https://www.imperva.com/learn/application-security/osi-model/ //

Communication/ Cryptographic security //
- https://nerdland.net/2010/03/understanding-the-five-aspects-of-cryptographic-security/
- https://www.securitymagazine.com/articles/89271-the-importance-of-communication-for-security
- https://www.sciencedirect.com/topics/computer-science/communication-security

XSS //
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP


# IDEAS - for now
- messaging app with e2ee
- sandbox like thing that encrypts the files or some shit - if possible
- something related to social engineering or phishing in general - if possible, again
- web app security - or some sort of web scanner
- web messaging app to test for vulnerabilities
- messaging app with simulation of security flaws



14th Sept
- encryption - general definitions
- What is and how it works
	- Symmetric key encryption
	- Public key encryption
	- E2EE (and more details + irl examples)


## Encryption
- process of encoding information by converting the original message (plaintext) into ciphertext
- an ecryption scheme uses a key generated by an algorithm
- decryption is the process of obtaining the original message from the plaintext using the key (it is possible without a key but a good ecncryption scheme should require considerable computing resources and skills)


## What is and how it works

### Symmetric key cryptography
- a symmetrical key is used for encrypting and decrypting a message
- the symmetric key algorithm uses cryptographic keys to both encrypt and decrypt a message and they represent a shared secret between two or more parties that can be used to maintain a private information link
- it requires that both parties know the secret key

### How it works
- block ciphers - encrypt a block of the message at a time
- stream ciphers - encrypt a message bit by bit

### Examples


**Sources**
- https://en.wikipedia.org/wiki/Symmetric-key_algorithm
- https://www.sciencedirect.com/topics/computer-science/symmetric-key-algorithm
- https://www.cryptomathic.com/news-events/blog/symmetric-key-encryption-why-where-and-how-its-used-in-banking
- https://nordlocker.com/blog/symmetric-encryption/


---

### Public key cryptography
- or asymetric cryptography, uses two pairs of keys: a public one and a private one
- the public key is known and publicly distributed but the private key is private and known only to the owner
- the generation of these keys relies on cryptographic algorithms that produce one way functions (easy to compute f(x) = y but hard to obtain x from y)
- any person can encrypt a message using the public key but it can be decrypted only using the receiver's private key

### How it works
- sender encrypts the message using the public key
- the receiver decrypts the message using the private key

### Examples
- https://en.wikipedia.org/wiki/Public-key_cryptography#Examples

**Sources**
- [](https://en.wikipedia.org/wiki/Public-key_cryptography)
- [](https://www.gatevidyalay.com/public-key-cryptography-rsa-algorithm/)
- https://www.educba.com/public-key-encryption/



---


## Check

- Kerckhoffs' desiderata crypto
- Vigenere cipher and maybe understand it already
- cryptography involutions - compositions of ciphers
- Vernam cipher - again, maybe understand it this time
- Euler phi totient function
- chinese remainder theorem
- legendre and jacobi symbols
- Blum integers



## Articles

- [Block cipher mode of operation](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Cipher_Block_Chaining_(CBC))
- [Exploring an Encrypted Penguin with AES-ECB](https://tonybox.net/posts/ecb-penguin/)
- [Confusion and diffusion](https://en.wikipedia.org/wiki/Confusion_and_diffusion)
- [Cryptovirology](https://en.wikipedia.org/wiki/Cryptovirology)
- [Trapdoor (one way) function](https://en.wikipedia.org/wiki/Trapdoor_function)
- [Wannacry begins](https://en.wikipedia.org/wiki/EternalBlue)


- [](https://blokt.com/guides/most-secure-messaging-apps)
- https://gbhackers.com/secure-messaging-apps/
- https://nordvpn.com/blog/most-secure-messaging-app/
- []()
- []()
- []()
- []()


## Youtube links


- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()

## Resources/ Code/ Courses

- [SEED labs and others](https://seedsecuritylabs.org/index.html)
- [](https://crypto.interactive-maths.com/)
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()


## Exploits

- [Arbitrary code execution/ RCE](https://en.wikipedia.org/wiki/Arbitrary_code_execution)
- [WhatsApp Bug Allows Malicious Code-Injection, One-Click RCE](https://threatpost.com/whatsapp-bug-malicious-code-injection-rce/152578/)
- [Cross-site scripting attacks](https://owasp.org/www-community/attacks/xss/)
	- [Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Tempering messages on wapp](https://research.checkpoint.com/2018/fakesapp-a-vulnerability-in-whatsapp/)
- [Wapp exploits](https://www.perimeterx.com/tech-blog/2020/whatsapp-fs-read-vuln-disclosure/)
- [Wapp exploits](https://www.perimeterx.com/resources/blog/2020/perimeterx-researcher-finds-vulnerability-in-whatsapp/)
- [A Syntax for the Expression of Access Information of Objects on the Network](https://www.w3.org/Addressing/URL/url-spec.txt)
- [](https://www.engadget.com/2019-12-17-whatsapp-exploit-group-chat.html)
- [](https://www.zdnet.com/article/whatsapp-vulnerabilities-puts-words-in-your-mouth-lets-hackers-tamper-with-text/)
- [](https://www.maketecheasier.com/whatsapp-security-exploit-missed-call-hack/)
- [JS injection](https://www.codeproject.com/Articles/134024/HTML-and-JavaScript-Injection)
- []()
- []()
- []()
- []()



