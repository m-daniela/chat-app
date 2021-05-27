# Chapter 1

## Contents
0. [Back](index.html)
1. [Introduction](#1-introduction)
2. [Information security and cryptography](#2-information-security-and-cryptography)
3. [Background on functions (mathematical aspects)](#3-background-on-functions-mathematical-aspects)
4. [Basic terminology and concepts](#4-basic-terminology-and-concepts)
5. [Symmetric-key encryption](#5-symmetric-key-encryption)
6. [Digital signatures](#6-digital-signatures)
7. [Authentication and identification](#7-authentication-and-identification)
8. [Public key cryptography](#8-public-key-cryptography)
9. [Hash functions](#9-hash-functions)
10. [Protocols and mechanisms](#10-protocols-and-mechanisms)
11. [Key establishment, management, and certification](#11-key-establishment-management-and-certification)
12. [Pseudorandom numbers and sequences](#12-pseudorandom-numbers-and-sequences)
13. [Classes of attacks and security models](#13-classes-of-attacks-and-security-models)
14. [Terms](#terms-to-search-for)


## 1. Introduction
*pg 19*

- **DES** - Data Encryption Standard - most well known and used 
- **RSA** - first practical public key encryption and signature scheme (based on intractability f factoring large integers)

## 2. Information security and cryptography

- table 1.1 - *pg 21*
- signature: means to bind information to an entity
- receipt: acknowledgement the information has been provided
- non-repudiation: preventing the denial of the previous commitments or actions

**Cryptography** - the study of mathematical techniques related to aspects of information security such as confidentiality, data integrity, entity authentication and data origin authetication

### Goals - CIA triangle
*pg 22*

**Confideniality = secrecy, privacy**
- service used to keep the information available only to those authorized ot have it

**Data integrity**
- service which addresses the unauthorized alteration of data

**Authentication**
- service related to indentification, which appleis to both entities and information
- information delivered between 2 entities throwgh a channel should be authenticated as to origin, date of origin, data content, time sent etc.
- subdivided into 2 major classes: 
	- entity authentication
	- data origin authentication (implicitly provides data integrity)

**Non-repudiation**
- service which prevents an entity from denying previous commitments or actions
- (might) need a procedure involving a trusted 3rd party to solve eventual disputes between 2 entities

These for a framework from which the other information security objectives from table 1.1 will be derived. 

### Cryptographic tools (primitives)
*pg 23*

- provide information security
- *examples:* hash functions, digital signature schemes
- figure 1.1 - schematic listing of the primitives considered *pg 23*
- the primitives should be evaluated according to criteria such as:
	- *level of security* (work factor) 
		- usually given in terms of the number of operations required to defeat the intended objective 
		- defined as an upper bound
	- *functionality* - primitives will need to be combined to meet various information security objectives
	- *methods of operation* - primitives applied in different ways and with various inputs, will tipically exhibit differen characteristics
	- *performance* - efficiency in a particular mode of operation
	- *ease of implementation* - difficulty of realizing the primitive in a practical instantiation


## 3. Background on functions (mathematical aspects)
*pg 24*


- **one-to-one (1-1)** - injective function
- **onto** - surjective function
- **one-way function** 
	- f: X -> Y is a one-way function if f(x) is easy to compute for all x in X but for "esentially all" y in Im(f) it is "computationally infeasable" to find x in X st f(x) = y
	- aka: easy to compute f(x), but hard to find the value of f^(-1)(y)
	- *important in cryptography*
- **trapdoor one-way function**
	- f:X -> Y a trapdoor function if f is a one way function with the additional property that given some extra information (trapdoor information) if becomes feasible to find for any given y in Im(f) an x in X st f(x) = y
	- also *important in cryptography*
- **involution**
	- bijective functions with the property that they are their own inverses
	- f:S -> S is an involution if f = f^(-1) or f(f(x)) = x

## 4. Basic terminology and concepts
*pg 29*

### Encryption domains and codomains

- **A (alphabet of definitions)** 
	- finite set
	- A = {0, 1} - binary set
	- each alphabet can be encoded in terms of the binary alphabet
- **M (message space)**
	- consists of strings of symbols from an alphabet of definition
	- an element of M is a **plaintext (message)**
- **C (ciphertext space)**
	- consists of strings of symbols from an alphabet of definition which may differ from the alphabet of definition of M
	- an element in C is a **ciphertext**

### Encryption and decryption transformations

- **K (key space)** - number of encryption/ decryption key pairs available in the cipher system
- **Ee (encryption function)** 
	- each e in K determines a bijection from M to C
	- it must be a bijection if the process is to be reversed and a unique plaintext recovered for each distinct ciphertext
	- in generla: Ee: M -> Im(Ee) bijection where Im(Ee) subset of C
- **Dd (decryption function)**
	- for each d in K, Dd: C -> M bijection is a decryption function
- **encrypting m** - the process of applying Ee to a message m in M
- **decrypting c** - the process of applying Dd to decrypt c
- **encryption scheme (cipher)**
	- {Ee: e in K} and corresponding {Dd: d in K} such that for each e in K, there is a unique key d in K such that Dd = Ee^(-1)
	- Dd(Ee(m)) = m for all m in M
- **key pair** - the keys e and d in K, (e, d)

**More definitions**
- pg 31

### Security
- M, C, K, Ee, Dd are public but when 2 parties want to communicate securely using an encryption scheme, the only secret is the (e, d) key pair (the secrecy of the e - d transformations is also recommended but is difficult - at least back in the day)
- exhaustive search = brute force 
- cryptology - pg 33


## 5. Symmetric-key encryption
*pg 33*
- an encryption scheme consisting of the sets {Ee: e in K}, {Dd: d in K} with K key space, is symmetric key if for each associated encryption/ decryption key pair (e, d), it is computationally easy to determine d knowing e and vice-versa
- 2 classes which are commonly distinguished:
	- block ciphers
	- stream ciphers


### Block ciphers
*pg 34*

>encryption scheme which breaks up the plaintext messages to be transmitted intro strings (blocks) of a fixed lenght t over an alphabet A and encrypts one block at a time

- examples: (*main classes*):
	- substitution ciphers
	- transposition ciphers

**Substitution ciphers**
*pg 35*

>block ciphers which which replace (groups of) symbols by other (groups of) symbols

**Simple substitution ciphers (mono-alphabetic substitution)**
*pg 35*

- easily cryptanalyzed (keeps frequencies)

>A alphabet of q symbols, M set of all strings of length t over A, K set of all permutations on A. Define for each e in K an encryption transformation Ee as:
*Ee(m) = (e(m1)e(m2)...e(mt)) = (c1c2...ct) = c*
where m = (m1...mt) in M.
To decrypt c = (c1...ct), compute d = e^(-1) and
*Dd(c = (d(c1)d(c2)...d(ct))) = (m1...mt) = m*


**Homophonic substitution ciphers**
*pg 35*


>To each symbol a ∈ A, associate a set H(a) of strings of t symbols, with the restriction that the sets H(a), a ∈ A, be pairwise disjoint. 
A homophonic substitution cipher replaces each symbol a in a plaintext message block with a randomly chosen string from H(a). To decrypt a string c of t symbols, one must determine an a ∈ A such that c ∈ H(a). The key for the cipher consists of the sets H(a).


**Polyalphabetic substitution ciphers**
*pg 36*

- easily cryptanalyzed (keeps frequencies on each position)

>A polyalphabetic substitution cipher is a block cipher with block length t over an alphabet A having the following properties:
-the key space K consists of all ordered sets of t permutations (p1, p2, . . . , pt), where
each permutation pi is defined on the set A
-encryption of the message m = (m1m2 · · ·mt) under the key e = (p1, p2, . . . , pt)
is given by Ee(m) = (p1(m1)p2(m2) · · · pt(mt))
-the decryption key associated with e = (p1, p2, ..., pt) is d = (p1^(-1), p2^(-1), ... pt^(-1))

- **ex: Vigenere cipher**


**Transposition ciphers**
*pg 36*


- simply permutes the symbols in a block
- easily cryptanalyzed (keeps frequencies)

>Consider a symmetric-key block encryption scheme with block length t. Let K be the set of all permutations on the set {1, 2,... , t}. For each e in K define the encryption function
*Ee(m) = (me(1)me(2) · · ·me(t))*
where m = (m1m2...mt) in M, the message space. The set of all such transformations is called a simple transposition cipher. 
The decryption key corresponding to e is the inverse permutation d = e^(-1). To decrypt c = (c1c2...ct), compute Dd(c) = (cd(1)cd(2)...cd(t)).

**Compositions of ciphers**
*pg 37*

- based on function composition
- *involutions*: f(f(x)) = x, f composed with f = identity function

**Product ciphers**
*pg 38*

- simple substitution and transposition ciphers individually do not provide a very high level
of security
- by combining these transformations it is possible to obtain strong ciphers.

(round = composition of a substitution and a transposition)
>*Remark: (**confusion and diffusion**)* A substitution in a round is said to add confusion to the encryption process whereas a transposition is said to add diffusion. Confusion is intended to make the relationship between the key and ciphertext as complex as possible. Diffusion
refers to rearranging or spreading out the bits in the message so that any redundancy in the
plaintext is spread out over the ciphertext. A round then can be said to add both confusion
and diffusion to the encryption. Most modern block cipher systems apply a number of
rounds in succession to encrypt plaintext.


### Stream ciphers
*pg 38*

- simple block ciphers the have the block length = 1
- encryption can change for each symbol of the plaintext encrypted
- no error propagation (useful when transmission errors are highly probable)
- **keystream** - a sequence of symbols e1e2...e3 in K, K key space for a set of encryption transformations
- the keystream could be generated at random or by an algorithm which generated the keystream from a seed
- **seed** - initial small keystream

>A alphabet of q sym, Ee simple subs cipher with len = 1, e in K. m1m2... plaintext string, e1e2... keystream from K. A stream cipher take the plaintext string and produces a ciphertext string c1c2..., ci = Eei(mi). di inverse of ei, ten Ddi(ci) = mi decrypts the ciphertext string

**The Vernam cipher** *pg 39*



### The key space
*pg 39*

- the size is the number of e/ d key pairs that are available in the cipher system
> *A necessary, but usually not sufficient, condition for an encryption scheme to be secure
is that the key space be large enough to preclude exhaustive search*

## 6. Digital signatures
*pg 40*
- for public key crypto
- crypto primitive that is fundamental in authentication, auithorization and non-repudiation
- provides means for an entity to bind its identity to a piece of information
- the process of signing = transform the message and some secret info held by the entity into a tag called signature

**Nomenclature**
- M - set of messages that can be signed
- S - signatures (possibly binary strings of a fixed length)
- SA - signing transformation for entity A - transform the message set M to the signature set S, is kept secret by A and will be used to create signatures for messages from M
- VA verification transformation for A's signatures - transform M x S to {true, false}, and is publicly known and used to verify signatures creted by A

*Def* SA, VA provide a digital signature scheme (digital signature mechanism) for A

**Signing procedure** - A (signer) creates a signature for m in M by computing s = SA(m) and transmitting (m, s), where s is the signature for message m

**Verification procedure** - to verify that a signature s for m was created by A, B (verifier) has to obtain the verification function VA of A, compute u = VA(m, s) and accept the signature as having been created by A if u = true, otherwise reject it

**Remark 1.43** - pg 41 - somehow compared to the public key crypto
**Remark** Handwritten signatures can be interpreted as special digital signatures

**Properties requiered for signing and verification functions**
1. s is a valid signature of A on m <=> VA(m, s) = true
2. it is computationally infeasible for any entity other than A to find, for any m in M, an s in S such that VA(m, s) = true

## 7. Authentication and identification
*pg 42*

- **indetification** or **entity authentication** tecnique assures one party (though acquisition of corroborative evidence) of both the identity of a second party involved and that the second was active at the time the evidence was created or acquired
- ex: voice recognition over the phone, pin code at the ATM

- **data origin authentication** (**message authentication**) - techniques that assure the party that receives the message of the identity of the sender party
- useful when one of the parties is not active in the communication
- ex: email


## 8. Public key cryptography
*pg 43*

### Public key encryption
*pg 43*

>Consider the sets of enc/ decr transformations {Ee: e in K}, {Dd: d in K}. The enc method is a public key enc scheme if for each associated enc/ decr pair (e, d), one key e is made publicly available (public key), while the other, d, is kept secret (private key).
>The scheme is secure if it is computationally infeasible to compute d from e and vice-versa
- Ee is viewed as a trapdoor function and d is the trapdoor information

- **Remark:**
	- private key: in public key cryptosystems
	- secret key: in symmetric key cryptosystems

## Symmetric key vs public key cryptography
*pg 49*

- a comparison, advatanges and disadvantages

## 9. Hash functions
*pg 51*
- easily put: map a value to another one

## 10. Protocols and mechanisms
*pg 52*

>**Protocol:** a distributed algorithm defined by a sequence
of steps precisely specifying the actions required of two or more entities to achieve a specific security objective
>**Mechanism:** is a more general term encompassing protocols, algorithms (specifying the steps followed by a single entity), and non-cryptographic techniques (e.g., hardware protection and procedural controls) to achieve specific security objectives.

- primitives utlized to build a protocol:
	- encryption schemes
	- digital signatures
	- hash functions
	- random number generators

**Protocol failure or mechanism failure**
*pg 52*

>occurs when a mechanism fails to meet
the goals for which it was intended -> adversary gains advantage by manipulating the protocol or mechanism itself

**Causes of failure**
- weaknesses in a particular cryptographic primitive which may be amplified by the protocol or mechanism
- claimed or assumed security guarantees which are overstated or not clearly understood
- the oversight of some principle applicable to a broad class of primitives such as encryption

**Protocol design**
- identify all assumptions in the protocol or mechanism design
- for each assumption, determine the effect on the security objective if that assumption
is violated

## 11. Key establishment, manager and certification
*pg 53*

>**Key establishment** is any process whereby a shared secret key becomes available
to two or more parties, for subsequent cryptographic use

>**Key management** is the set of processes and mechanisms which support key
establishment and the maintenance of ongoing keying relationships between parties, including
replacing older keys with new keys as necessary

## Key management through symmetric-key techniques
*pg 54*

### Trusted third parties and public-key certificates
*pg 57*

>A TTP is **unconditionally trusted** if it is trusted on all matters (ex: it may have access to the secret and private keys of users, as well as be charged with the association of public keys to identifiers)

>A TTP is **functionally trusted** if the entity is assumed to be honest and fair but it does not have access to the secret or private keys of users

>A **public-key certificate** consists of a data part and a signature part


## 12. Pseudorandom numbers and sequences
*pg 57*


## 13. Classes of attacks and security models
*pg 59*

>A **passive attack** is one where the adversary only monitors the communication channel. A passive attacker only threatens confidentiality of data

>An **active attack** is one where the adversary attempts to delete, add, or in some other
way alter the transmission on the channel. An active attacker threatens data integrity
and authentication as well as confidentiality.

- a passive attack can be subdivided into more specialized attacks:

**Attacks on encryption schemes**
*pg 59*

- *objective:* systematically recover plaintext form ciphertext or deduce the dec key
- most of these attacks also apply to digital signature schemes and message authentication
codes (the objective of the attacker is to forge messages or MACs)
- **ciphertext-only attack** - adversary tries to deduce the decryption key or plaintext by only observing ciphertext. Enc scheme is completely insecure
- **known-plaintext attack** - adversary has a quantity of plaintext and corresponding ciphertext
- **chosen-plaintext attack** - adversary chooses plaintext and is then given corresponding ciphertext. Subsequently, the adversary uses any information deduced in order to recover plaintext corresponding to previously unseen ciphertext
- **adaptive chosen-plaintext attack** - a chosen-plaintext attack wherein the choice
of plaintext may depend on the ciphertext received from previous requests
- **chosen-ciphertext attack** - where the adversary selects the ciphertext and is
then given the corresponding plaintext
- **adaptive chosen-ciphertext attack** - chosen-ciphertext attack where the choice
of ciphertext may depend on the plaintext received from previous requests

**Attacks on protocols**
*pg 60*

- until a protocol is proven to provide the service intended, the list of possible attacks can never be said to be complete
- **known-key attack** - an adversary obtains some keys used previously and then uses this information to determine new keys
- **replay** - an adversary records a communication session and replays the
entire session, or a portion thereof, at some later point in time
- **mpersonation** - an adversary assumes the identity of one of the legitimate parties
in a network
- **dictionary** - an adversary can take a list of probable passwords, hash all entries in this list,
and then compare this to the list of true encrypted passwords with the hope of finding matches as the password is typically logged as the image of an unkeyed hash function
- **forward search** - similar in spirit to the dictionary attack and is used to decrypt messages
- **interleaving attack** - usually involves some form of impersonation in an authentication protocol


### Models for evaluating security
*pg 60*

1. Unconditional security
2. Complexity-theoretic security
3. Provable security
4. Computational security
5. Ad hoc security

### Perspective for computational security
*pg 62*

>**Work factor Wd** is the minimum amount of work (measured in appropriate units such as elementary operations or clock cycles) required to compute the private key d given the public key e, or, in the case of symmetric-key schemes, to determine the secret key k. More specifically, one may consider the work required under a ciphertext-only attack given n ciphertexts, denoted Wd(n). Corresponds to the true security lvl

>**Historical work factor Wd barred** is the minimum amount of work required to compute the private key d from the public key e using the best known algorithms at a given point in time. Corresponds to computational security and varies with time as algorithms and tech improve



# Chapter 2 Mathematical background

# Contents



## 1. Probability theory 
*pg 68*

### Information theory
*pg 74*

## 2. Complexity theory
*pg 75*

### Asymptotic notation
*pg 76*

- f, g functions that are defined on positive integers and take on real values that are always positive from some point onwards

>Asymptotic upper bound: f(n) = O(g(n)) if there exists const c and n0 > 0 inte st 0 <= f(n) <= c\*g(n), for all n >= n0

>Asymptotic lower bound: f(n) = omega(g(n)) if there exists const c and n0 > 0 inte st 0 <= c\*g(n) <= f(n), for all n >= n0

>Asymptotic tight bound: f(n) = theta(g(n)) if there exists const c1, c2 and n0 > 0 inte st c1\*g(n) <= f(n) <= c2\*g(n), for all n >= n0

>o-notation: f(n) = o(g(n)) if for any const c > 0 there exists a const n0 > 0 st 0 <= f(n) < cg(n), for all n >= n0



# Chapter 3 - Number theoretic reference problems

## Intro
- pg 106

Def A, B computeational problems, A is said to be polytime reduce to B if there is an alg that soves A which uses, a s subroutine, a hypothetical alg for solving B, and which runs in polytime if the alg for B does
(if A polytime reduces to B, then B is at leas as difficult as A)




# Terms to search for

- compute modular cube roots
- integer factorization problem
- key distriburion problem
- pairwise disjoint = somehow disjoint (?)
- Vigenere cipher
- teraflops and floating point operations
- prime number theorem
- Euler phi function