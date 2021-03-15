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

